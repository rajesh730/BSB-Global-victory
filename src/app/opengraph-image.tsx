import {ImageResponse} from 'next/og';
export const alt='BSB Global — study abroad guidance from Nepal';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function OpenGraphImage(){return new ImageResponse(<div style={{height:'100%',width:'100%',background:'#eff1f8',display:'flex',alignItems:'center',padding:'78px',fontFamily:'sans-serif',position:'relative'}}><div style={{display:'flex',flexDirection:'column',gap:'28px'}}><div style={{fontSize:28,letterSpacing:4,fontWeight:800,color:'#293991'}}>BSB GLOBAL / NEPAL</div><div style={{display:'flex',flexDirection:'column',fontSize:84,lineHeight:1.06,fontWeight:800,color:'#182257'}}><span>Big ambitions.</span><span>A clearer way forward.</span></div><div style={{fontSize:24,color:'#566179'}}>Japan · United Kingdom · South Korea</div></div><div style={{position:'absolute',right:-180,top:-120,border:'95px solid #c11630',width:500,height:500,borderRadius:500,opacity:.92}}/></div>);
}
