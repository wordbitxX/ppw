import assert from 'node:assert/strict';
import fs from 'node:fs';
const guides=JSON.parse(fs.readFileSync('src/lib/guides-2026.json'));
const faqData=JSON.parse(fs.readFileSync('src/lib/guide-faqs.json'));
assert.equal(guides.length,16);
assert.equal(new Set(guides.map(x=>x.slug)).size,16);
for(const post of guides){
 const faqs=faqData.find(x=>x.slug===post.slug).faqs;
 assert(faqs.length>=4 && faqs.length<=6);
 const text=post.blocks.map(b=>b.text || (b.items || []).join(' ')).join(' ');
 const words=(text+' '+faqs.map(f=>f.question+' '+f.answer).join(' ')).split(/\s+/).length;
 assert(words>=1200 && words<=1800,`${post.slug}: ${words} words`);
 assert.equal(post.relatedPosts.length,3);
 assert(post.relatedPosts.every(slug=>slug!==post.slug));
 assert(text.includes('/pk') && text.includes('/pricing'));
 assert((text.match(/\]\(\/blog\//g)||[]).length>=2);
 assert(text.includes('/services/'+post.relatedServices[0]));
 assert(fs.existsSync('public'+post.image));
 assert(faqs.every(q=>q.href.startsWith('/')));
 console.log(`${post.slug}: ${words} words; ${faqs.length} FAQs; image and links OK`);
}
console.log('All 16 guide checks passed.');
