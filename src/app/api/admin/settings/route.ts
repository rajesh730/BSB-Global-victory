import {NextResponse} from 'next/server';
import {isSameOrigin,requireAdminApiSession} from '@/server/auth/request';
import {getBusinessSettings,saveBusinessSettings} from '@/server/site/repository';
import {businessSettingsSchema} from '@/server/site/schema';

export const runtime='nodejs';
export async function GET(){const auth=await requireAdminApiSession();if(auth.response)return auth.response;try{return NextResponse.json({settings:await getBusinessSettings()});}catch{return NextResponse.json({message:'Database setup is needed before business settings can be managed.'},{status:503});}}
export async function PUT(request:Request){
  if(!isSameOrigin(request))return NextResponse.json({message:'Invalid request origin.'},{status:403});
  const auth=await requireAdminApiSession();if(auth.response)return auth.response;
  let body:unknown;try{body=await request.json();}catch{return NextResponse.json({message:'Invalid settings.'},{status:400});}
  const parsed=businessSettingsSchema.safeParse(body);if(!parsed.success)return NextResponse.json({message:parsed.error.issues[0]?.message || 'Check the settings and try again.'},{status:400});
  try{await saveBusinessSettings(parsed.data);return NextResponse.json({ok:true});}catch(error){console.error('Unable to save business settings',error);return NextResponse.json({message:'Database setup is needed before settings can be saved.'},{status:503});}
}
