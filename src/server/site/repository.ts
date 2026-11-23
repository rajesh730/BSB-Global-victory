import 'server-only';
import {getDatabaseConfig} from '@/server/db/config';
import {getDatabaseClient} from '@/server/db/client';
import {defaultBusinessSettings,defaultGalleryItems,sitePageDefinitions,type GalleryItem,type SitePageDefinition} from './defaults';
import type {BusinessSettingsInput,GalleryItemsInput,SitePageInput} from './schema';
import {business as fallbackBusiness,type ContactEmail,type ContactPhone} from '@/lib/site-config';

type Row=Record<string,unknown>;
const text=(value:unknown)=>typeof value==='string'?value:'';
const number=(value:unknown)=>typeof value==='number'?value:Number(value || 0);

export type PublicBusinessSettings=BusinessSettingsInput & {updatedAt?:string};
export type PublicBusinessProfile=PublicBusinessSettings & {emails:ContactEmail[];phones:ContactPhone[];email:string;enquiryEmail:string;phone:ContactPhone;foundingDate:string;foundedLabel:string};

function fallbackPage(id:string){
  const page=sitePageDefinitions.find(candidate=>candidate.id===id);
  if(!page) throw new Error(`Unknown site page: ${id}`);
  return page;
}

function mapPage(row:Row,definition:SitePageDefinition):SitePageDefinition {
  return {id:definition.id,path:definition.path,label:definition.label,eyebrow:text(row.eyebrow)||definition.eyebrow,title:text(row.title)||definition.title,description:text(row.description)||definition.description,metaTitle:text(row.meta_title)||definition.metaTitle,metaDescription:text(row.meta_description)||definition.metaDescription};
}

export async function listSitePages(){
  if(!getDatabaseConfig()) return sitePageDefinitions;
  try{
    const result=await getDatabaseClient().execute('SELECT * FROM site_pages');
    const rows=new Map(result.rows.map(row=>[text((row as Row).id),row as Row]));
    return sitePageDefinitions.map(definition=>rows.has(definition.id)?mapPage(rows.get(definition.id)!,definition):definition);
  }catch{return sitePageDefinitions;}
}

export async function getSitePage(id:string){
  const definition=fallbackPage(id);
  if(!getDatabaseConfig()) return definition;
  try{const result=await getDatabaseClient().execute({sql:'SELECT * FROM site_pages WHERE id = ?',args:[id]});return result.rows[0]?mapPage(result.rows[0] as Row,definition):definition;}catch{return definition;}
}

export async function saveSitePage(id:string,input:SitePageInput){
  fallbackPage(id);
  const now=new Date().toISOString();
  await getDatabaseClient().execute({sql:`INSERT INTO site_pages (id,eyebrow,title,description,meta_title,meta_description,updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET eyebrow=excluded.eyebrow,title=excluded.title,description=excluded.description,meta_title=excluded.meta_title,meta_description=excluded.meta_description,updated_at=excluded.updated_at`,args:[id,input.eyebrow,input.title,input.description,input.metaTitle,input.metaDescription,now]});
}

function mapBusiness(row:Row):PublicBusinessSettings {
  return {name:text(row.name)||defaultBusinessSettings.name,legalName:text(row.legal_name)||defaultBusinessSettings.legalName,descriptor:text(row.descriptor)||defaultBusinessSettings.descriptor,address:text(row.address)||defaultBusinessSettings.address,location:text(row.location)||defaultBusinessSettings.location,generalEmail:text(row.general_email)||defaultBusinessSettings.generalEmail,enquiryEmail:text(row.enquiry_email)||defaultBusinessSettings.enquiryEmail,officePhone:text(row.office_phone)||defaultBusinessSettings.officePhone,officeTel:text(row.office_tel)||defaultBusinessSettings.officeTel,mobilePhone:text(row.mobile_phone)||defaultBusinessSettings.mobilePhone,mobileTel:text(row.mobile_tel)||defaultBusinessSettings.mobileTel,whatsapp:text(row.whatsapp),directionsUrl:text(row.directions_url),openingHours:text(row.opening_hours),updatedAt:text(row.updated_at)};
}

export async function getBusinessSettings():Promise<PublicBusinessSettings>{
  if(!getDatabaseConfig()) return defaultBusinessSettings;
  try{const result=await getDatabaseClient().execute('SELECT * FROM site_settings WHERE id = 1');return result.rows[0]?mapBusiness(result.rows[0] as Row):defaultBusinessSettings;}catch{return defaultBusinessSettings;}
}

export async function getBusinessProfile():Promise<PublicBusinessProfile>{
  const settings=await getBusinessSettings();
  const phones:ContactPhone[]=[
    {label:'Office',display:settings.officePhone,tel:settings.officeTel},
    {label:'Mobile',display:settings.mobilePhone,tel:settings.mobileTel}
  ].filter(phone=>phone.display && phone.tel);
  const emails:ContactEmail[]=[{label:'General information',address:settings.generalEmail},{label:'Counselling enquiries',address:settings.enquiryEmail}].filter((email,index,items)=>email.address && items.findIndex(candidate=>candidate.address===email.address)===index);
  return {...settings,emails,phones,email:settings.generalEmail,enquiryEmail:settings.enquiryEmail,phone:phones[0] || fallbackBusiness.phone,foundingDate:fallbackBusiness.foundingDate,foundedLabel:fallbackBusiness.foundedLabel};
}

export async function saveBusinessSettings(input:BusinessSettingsInput){
  const now=new Date().toISOString();
  await getDatabaseClient().execute({sql:`INSERT INTO site_settings (id,name,legal_name,descriptor,address,location,general_email,enquiry_email,office_phone,office_tel,mobile_phone,mobile_tel,whatsapp,directions_url,opening_hours,updated_at)
    VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET name=excluded.name,legal_name=excluded.legal_name,descriptor=excluded.descriptor,address=excluded.address,location=excluded.location,general_email=excluded.general_email,enquiry_email=excluded.enquiry_email,office_phone=excluded.office_phone,office_tel=excluded.office_tel,mobile_phone=excluded.mobile_phone,mobile_tel=excluded.mobile_tel,whatsapp=excluded.whatsapp,directions_url=excluded.directions_url,opening_hours=excluded.opening_hours,updated_at=excluded.updated_at`,args:[input.name,input.legalName,input.descriptor,input.address,input.location,input.generalEmail,input.enquiryEmail,input.officePhone,input.officeTel,input.mobilePhone,input.mobileTel,input.whatsapp,input.directionsUrl,input.openingHours,now]});
}

function mapGalleryItem(row:Row):GalleryItem {
  const category=text(row.category);
  return {id:text(row.id),src:text(row.image_url),width:number(row.width),height:number(row.height),category:category==='classes'||category==='departures'?category:'office',alt:text(row.alt),caption:text(row.caption),featured:Boolean(number(row.featured)),sortOrder:number(row.sort_order)};
}

export async function getGalleryItems():Promise<GalleryItem[]>{
  if(!getDatabaseConfig()) return defaultGalleryItems;
  try{const result=await getDatabaseClient().execute('SELECT * FROM gallery_items ORDER BY sort_order, id');return result.rows.length?result.rows.map(row=>mapGalleryItem(row as Row)):defaultGalleryItems;}catch{return defaultGalleryItems;}
}

export async function saveGalleryItems(input:GalleryItemsInput){
  const client=getDatabaseClient();const now=new Date().toISOString();
  await client.batch([{sql:'DELETE FROM gallery_items',args:[]},...input.items.map(item=>({sql:'INSERT INTO gallery_items (id,image_url,width,height,category,alt,caption,featured,sort_order,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',args:[item.id,item.src,item.width,item.height,item.category,item.alt,item.caption,item.featured?1:0,item.sortOrder,now]}))],'write');
}
