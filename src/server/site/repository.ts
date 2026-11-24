import 'server-only';
import {invalidateDocument,isDataStoreConfigured,readCachedDocument,updateDocument} from '@/server/store/documents';
import {defaultBusinessSettings,defaultGalleryItems,sitePageDefinitions,type GalleryItem,type SitePageDefinition} from './defaults';
import type {BusinessSettingsInput,GalleryItemsInput,SitePageInput} from './schema';
import {business as fallbackBusiness,type ContactEmail,type ContactPhone} from '@/lib/site-config';

/**
 * Site content documents. Each is read through the shared cache and invalidated on save, so public
 * pages cost one storage read per document per change. Anything missing or unreadable falls back
 * to the defaults in ./defaults.ts.
 */
export const sitePagesPath='content/site-pages.json';
export const siteSettingsPath='content/site-settings.json';
export const galleryPath='content/gallery.json';

type StoredPage=SitePageInput & {updatedAt:string};
type StoredPages=Record<string,StoredPage>;
type StoredSettings=BusinessSettingsInput & {updatedAt:string};
export type StoredGallery={items:GalleryItem[];updatedAt:string};

export type PublicBusinessSettings=BusinessSettingsInput & {updatedAt?:string};
export type PublicBusinessProfile=PublicBusinessSettings & {emails:ContactEmail[];phones:ContactPhone[];email:string;enquiryEmail:string;phone:ContactPhone;foundingDate:string;foundedLabel:string};

async function readOrDefault<T>(path:string):Promise<T | null> {
  if (!isDataStoreConfigured()) return null;
  try { return await readCachedDocument<T>(path); } catch (error) { console.error(`Unable to read ${path}`,error);return null; }
}

function fallbackPage(id:string){
  const page=sitePageDefinitions.find(candidate=>candidate.id===id);
  if(!page) throw new Error(`Unknown site page: ${id}`);
  return page;
}

function mergePage(definition:SitePageDefinition,saved?:StoredPage):SitePageDefinition {
  if (!saved) return definition;
  return {...definition,eyebrow:saved.eyebrow||definition.eyebrow,title:saved.title||definition.title,description:saved.description||definition.description,metaTitle:saved.metaTitle||definition.metaTitle,metaDescription:saved.metaDescription||definition.metaDescription};
}

export async function listSitePages(){
  const saved=await readOrDefault<StoredPages>(sitePagesPath);
  return sitePageDefinitions.map(definition=>mergePage(definition,saved?.[definition.id]));
}

export async function getSitePage(id:string){
  const definition=fallbackPage(id);
  const saved=await readOrDefault<StoredPages>(sitePagesPath);
  return mergePage(definition,saved?.[id]);
}

export async function saveSitePage(id:string,input:SitePageInput){
  fallbackPage(id);
  const page:StoredPage={eyebrow:input.eyebrow,title:input.title,description:input.description,metaTitle:input.metaTitle,metaDescription:input.metaDescription,updatedAt:new Date().toISOString()};
  await updateDocument<StoredPages>(sitePagesPath,{},pages=>({...pages,[id]:page}));
  invalidateDocument(sitePagesPath);
}

export async function getBusinessSettings():Promise<PublicBusinessSettings>{
  const saved=await readOrDefault<StoredSettings>(siteSettingsPath);
  if (!saved) return defaultBusinessSettings;
  const pick=(key:keyof BusinessSettingsInput)=>saved[key] || defaultBusinessSettings[key];
  return {name:pick('name'),legalName:pick('legalName'),descriptor:pick('descriptor'),address:pick('address'),location:pick('location'),generalEmail:pick('generalEmail'),enquiryEmail:pick('enquiryEmail'),officePhone:pick('officePhone'),officeTel:pick('officeTel'),mobilePhone:pick('mobilePhone'),mobileTel:pick('mobileTel'),whatsapp:saved.whatsapp || '',directionsUrl:saved.directionsUrl || '',openingHours:saved.openingHours || '',updatedAt:saved.updatedAt};
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
  const settings:StoredSettings={...input,updatedAt:new Date().toISOString()};
  await updateDocument<StoredSettings | null>(siteSettingsPath,null,()=>settings);
  invalidateDocument(siteSettingsPath);
}

export async function getGalleryItems():Promise<GalleryItem[]>{
  const saved=await readOrDefault<StoredGallery>(galleryPath);
  return saved?.items.length?[...saved.items].sort((a,b)=>a.sortOrder-b.sortOrder || a.id.localeCompare(b.id)):defaultGalleryItems;
}

export async function saveGalleryItems(input:GalleryItemsInput){
  const gallery:StoredGallery={items:input.items.map(item=>({id:item.id,src:item.src,width:item.width,height:item.height,category:item.category,alt:item.alt,caption:item.caption,featured:item.featured,sortOrder:item.sortOrder})),updatedAt:new Date().toISOString()};
  await updateDocument<StoredGallery | null>(galleryPath,null,()=>gallery);
  invalidateDocument(galleryPath);
}
