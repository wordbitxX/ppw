import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.TEST_ORIGIN || 'http://127.0.0.1:3000';
const guides=JSON.parse(fs.readFileSync('src/lib/guides-2026.json'));
const paths=['/','/blog','/faqs','/pk','/pricing',...new Set(guides.flatMap(p=>p.relatedServices.map(s=>'/services/'+s))),...guides.map(p=>'/blog/'+p.slug)];
for(const path of paths){
 const response=await fetch(base+path);
 assert.equal(response.status,200,path);
 const html=await response.text();
 assert(html.includes('href="/faqs"'),`${path}: missing FAQ hub link`);
 const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 const schemas=scripts.filter(s=>s['@type']==='FAQPage');
 if(path!=='/blog') assert.equal(schemas.length,1,`${path}: expected exactly one FAQPage`);
 if(path.startsWith('/blog/')){
  assert.equal(schemas[0].mainEntity.length,4,path);
  assert(html.includes(guides.find(p=>'/blog/'+p.slug===path).image),`${path}: editorial image`);
 }
 if(path==='/faqs') {
  const names=schemas[0].mainEntity.map(q=>q.name);
  assert.equal(new Set(names).size,names.length,'duplicate FAQ names');
  for(const city of ['Lahore','Karachi','Islamabad','near me']) assert(names.some(n=>n.includes('— '+city)));
  console.log(`FAQ hub: ${names.length} visible/schema-matched questions`);
 }
 console.log(`200 + valid FAQPage: ${path}`);
}
for(const p of guides) for(const slug of p.relatedPosts) assert.equal((await fetch(base+'/blog/'+slug)).status,200,slug);
for(const path of ['/sitemaps/core.xml','/sitemaps/blog.xml','/sitemaps/services.xml']) {
 const res=await fetch(base+path);assert.equal(res.status,200); const xml=(await res.text()).replace(/>\s+</g,'><');
 if(path.includes('core')) assert(xml.includes('/faqs</loc>'));
 if(path.includes('blog')) for(const p of guides) assert(xml.includes('/blog/'+p.slug+'</loc><lastmod>2026-11-01</lastmod>'));
 console.log('Sitemap OK: '+path);
}
console.log('Production smoke checks passed.');
