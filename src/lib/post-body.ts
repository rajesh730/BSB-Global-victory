/**
 * Lightweight formatting for dashboard-written blog posts.
 *
 * Supported, one block per blank-line-separated chunk:
 *   ## Heading            (section heading, listed in the article sidebar)
 *   ### Subheading
 *   - item / * item       (bulleted list, one item per line)
 *   1. item               (numbered list)
 *   > quoted text         (callout)
 *   ![Alt text](url)      (image on its own line; only site or Blob-store images)
 *   anything else         (paragraph)
 * Inline: **bold** and [link text](https://… or /path).
 *
 * It deliberately produces data, never HTML strings, so posts cannot inject markup.
 */
export type InlineNode={type:'text';value:string}|{type:'strong';value:string}|{type:'link';value:string;href:string};
export type PostBlock=
  |{type:'heading';level:2|3;text:string;id:string}
  |{type:'paragraph';content:InlineNode[]}
  |{type:'list';ordered:boolean;items:InlineNode[][]}
  |{type:'quote';content:InlineNode[]}
  |{type:'image';src:string;alt:string};

const imageLine=/^!\[([^\]]*)\]\(([^)\s]+)\)$/;
const inlinePattern=/\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Links may point to the site itself, https pages, email or phone. */
export function isSafeLink(href:string) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(href) || (/^\/(?!\/)/.test(href) && !href.includes('..'));
}

export function parseInline(source:string):InlineNode[] {
  const nodes:InlineNode[]=[];let last=0;
  for (const match of source.matchAll(inlinePattern)) {
    const index=match.index ?? 0;
    if (index>last) nodes.push({type:'text',value:source.slice(last,index)});
    if (match[1]!==undefined) nodes.push({type:'strong',value:match[1]});
    else if (isSafeLink(match[3])) nodes.push({type:'link',value:match[2],href:match[3]});
    else nodes.push({type:'text',value:match[2]});
    last=index+match[0].length;
  }
  if (last<source.length) nodes.push({type:'text',value:source.slice(last)});
  return nodes;
}

const slugify=(value:string)=>value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'') || 'section';

/** Image URLs written in the body (on their own line), in order. */
export function bodyImageUrls(body:string) {
  return body.split(/\r?\n/).map(line=>imageLine.exec(line.trim())?.[2]).filter((url):url is string=>Boolean(url));
}

export function parsePostBody(body:string,isAllowedImage:(src:string)=>boolean=()=>true):PostBlock[] {
  const blocks:PostBlock[]=[];const usedIds=new Map<string,number>();
  const headingId=(text:string)=>{const base=slugify(text);const count=usedIds.get(base) ?? 0;usedIds.set(base,count+1);return count?`${base}-${count+1}`:base;};
  for (const chunk of body.replace(/\r\n/g,'\n').split(/\n\s*\n/)) {
    const lines=chunk.split('\n').map(line=>line.trim()).filter(Boolean);
    if (!lines.length) continue;
    let paragraph:string[]=[];
    const flush=()=>{if (paragraph.length) blocks.push({type:'paragraph',content:parseInline(paragraph.join(' '))});paragraph=[];};
    for (let position=0;position<lines.length;position++) {
      const line=lines[position];
      const heading=/^(#{2,3})\s+(.+)$/.exec(line);
      const image=imageLine.exec(line);
      if (heading) {flush();const text=heading[2].replace(/#+$/,'').trim();blocks.push({type:'heading',level:heading[1].length===2?2:3,text,id:headingId(text)});continue;}
      if (image) {flush();if (isAllowedImage(image[2])) blocks.push({type:'image',alt:image[1].trim(),src:image[2]});continue;}
      const bullet=/^[-*]\s+/;const numbered=/^\d+[.)]\s+/;
      if (bullet.test(line) || numbered.test(line)) {
        flush();const ordered=numbered.test(line);const marker=ordered?numbered:bullet;const items:InlineNode[][]=[];
        while (position<lines.length && marker.test(lines[position])) {items.push(parseInline(lines[position].replace(marker,'')));position++;}
        position--;blocks.push({type:'list',ordered,items});continue;
      }
      if (line.startsWith('>')) {
        flush();const quote:string[]=[];
        while (position<lines.length && lines[position].startsWith('>')) {quote.push(lines[position].replace(/^>\s?/,''));position++;}
        position--;blocks.push({type:'quote',content:parseInline(quote.join(' '))});continue;
      }
      paragraph.push(line);
    }
    flush();
  }
  return blocks;
}

/** Plain-text word count, ignoring formatting marks and image lines. */
export function bodyWordCount(body:string) {
  const plain=body.replace(/^!\[[^\]]*\]\([^)]*\)$/gm,' ').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[#>*_-]+/g,' ').trim();
  return plain?plain.split(/\s+/).length:0;
}
