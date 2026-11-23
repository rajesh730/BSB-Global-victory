import Image from 'next/image';
import Link from 'next/link';
import {Fragment} from 'react';
import type {InlineNode,PostBlock} from '@/lib/post-body';

function Inline({nodes}:{nodes:InlineNode[]}) {
  return <>{nodes.map((node,index)=>{
    if (node.type==='strong') return <strong key={index}>{node.value}</strong>;
    if (node.type==='link') return node.href.startsWith('/')
      ?<Link key={index} href={node.href}>{node.value}</Link>
      :<a key={index} href={node.href} {...(/^https?:/i.test(node.href)?{target:'_blank',rel:'noopener noreferrer'}:{})}>{node.value}</a>;
    return <Fragment key={index}>{node.value}</Fragment>;
  })}</>;
}

/** Renders a parsed dashboard post. Blocks come from `parsePostBody`, never raw HTML. */
export function PostBody({blocks}:{blocks:PostBlock[]}) {
  return <div className="article-managed-body">{blocks.map((block,index)=>{
    switch (block.type) {
      case 'heading': return block.level===2?<h2 key={index} id={block.id}>{block.text}</h2>:<h3 key={index} id={block.id}>{block.text}</h3>;
      case 'list': {const items=block.items.map((item,position)=><li key={position}><Inline nodes={item}/></li>);return block.ordered?<ol key={index}>{items}</ol>:<ul key={index}>{items}</ul>;}
      case 'quote': return <blockquote key={index}><p><Inline nodes={block.content}/></p></blockquote>;
      case 'image': return <figure key={index} className="article-inline-image"><div><Image src={block.src} alt={block.alt} fill sizes="(max-width:880px) 100vw, 740px"/></div>{block.alt&&<figcaption>{block.alt}</figcaption>}</figure>;
      default: return <p key={index}><Inline nodes={block.content}/></p>;
    }
  })}</div>;
}
