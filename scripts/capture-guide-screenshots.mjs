import { chromium } from 'playwright-core';
import serverChromium from '@sparticuz/chromium';
import fs from 'node:fs/promises';
const guides=JSON.parse(await fs.readFile('src/lib/guides-2026.json','utf8'));
const browser=await chromium.launch({executablePath:await serverChromium.executablePath(),args:serverChromium.args,headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await fs.mkdir('public/guides',{recursive:true});
const sources=[];
for (const guide of guides){
 if(guide.image.endsWith('.webp')) continue; // Preserve owner-approved editorial AI covers.
 const ai=guide.category==='AI';
 const path=ai?'/services/ai-solutions':'/pk';
 await page.goto('http://127.0.0.1:3000'+path,{waitUntil:'networkidle'});
 const locator=ai?page.getByRole('heading',{name:'Our ai solutions offering',exact:true}).locator('..').locator('..'):page.locator('#packages');
 if(await locator.count()===0) throw new Error('No screenshot target: '+path);
 await locator.first().screenshot({path:'public/guides/'+guide.slug+'.png',animations:'disabled'});
 sources.push({post:guide.slug,file:'/guides/'+guide.slug+'.png',source:path,captured:'2026-11-01',method:'Actual Chromium screenshot of local WordbitX page; text/interface only; no AI or stock image asset.'});
 console.log(guide.slug);
}
await fs.writeFile('docs/guide-image-provenance.json',JSON.stringify(sources,null,2)+'\n');
await browser.close();
