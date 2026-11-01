import guideFaqs from './guide-faqs.json';
export type Question = { question: string; answer: string; href: string };
const guide = (slug: string) => `/blog/${slug}`;
export const questionGroups: Record<string, Question[]> = {
  Prices: [
    ...guideFaqs.filter(x => ['website-development-cost-pakistan','mobile-app-development-cost-pakistan','shopify-store-cost-pakistan','ecommerce-website-cost-pakistan','seo-cost-pakistan','custom-software-development-cost-pakistan'].includes(x.slug)).map(x => x.faqs[0]),
    { question: 'How much does it cost to maintain a website per month in Pakistan?', answer: 'Maintenance is quoted after reviewing update frequency, backups, security and response needs. WordbitX has no verified fixed monthly care price here. Three months of website support is included; agree ongoing care separately.', href: '/services/website-maintenance' },
    { question: 'What is included in website development cost?', answer: 'The published starter scope covers 5–10 pages, CMS editing, basic SEO and three months of support. Websites start at Rs. 20,000 using your domain and hosting; Rs. 25,000 adds a domain and one year of hosting. Confirm the exact scope in writing.', href: '/pk' },
    { question: 'How much does a website renewal cost per year in Pakistan?', answer: 'WordbitX renewal starts from Rs. 10,000/year for the domain-and-hosting package. Confirm the exact renewal services and invoice; this is not an unlimited maintenance or development plan.', href: guide('domain-hosting-cost-pakistan') },
  ],
  Timelines: [
    { question: 'How long does it take to build a website?', answer: 'Allow 1–3 weeks for a starter site, 3–6 weeks for a custom business website and 4–10 weeks for e-commerce. WordbitX’s live starter page says 2–3 weeks. Approved content and prompt reviews matter.', href: guide('how-long-to-build-website-app') },
    { question: 'How long does it take to build a mobile app?', answer: 'A simple app commonly takes 1–3 months and a medium app 3–6 months. Integrations, device testing and store review affect the final schedule; agree milestones for your actual scope.', href: guide('mobile-app-development-cost-pakistan') },
    { question: 'How long does it take to build a Shopify store?', answer: 'Use the e-commerce planning range of 4–10 weeks, then request a store-specific schedule. Catalogue readiness, payments, delivery rules and theme changes determine whether your scope can launch sooner.', href: guide('shopify-store-cost-pakistan') },
    { question: 'How long does SEO take to show results?', answer: 'Noticeable improvements usually take 3–4 months, sometimes longer for new or competitive sites. Rankings and leads are not guaranteed; agree useful measurements and a review schedule.', href: guide('seo-cost-pakistan') },
    { question: 'How long does it take to build a POS software?', answer: 'There is no verified universal POS timeline. Devices, branches, offline behaviour, migration and FBR requirements change the work. Request a phased estimate after sharing sample workflows.', href: guide('custom-software-development-cost-pakistan') },
  ],
  Platforms: [
    { question: 'Which is the best software company in Pakistan?', answer: 'There is no honest universal winner. Compare relevant live work, a written quote, code ownership, account handover and support. WordbitX is one option to assess, not a self-awarded number-one ranking.', href: guide('hire-web-developer-pakistan') },
    { question: 'Which is better, WordPress or a custom website?', answer: 'WordPress often suits editable business content. Custom development can suit unusual permissions, workflows or integrations. Compare maintenance and ownership as well as launch cost.', href: guide('wordpress-vs-custom-website') },
    { question: 'Shopify or WooCommerce — which is better for Pakistan?', answer: 'Shopify reduces platform administration but has subscriptions and possible app costs. WooCommerce gives more hosting control with more update responsibility. Check payment eligibility, delivery needs and annual costs.', href: guide('ecommerce-website-cost-pakistan') },
    { question: 'Should I hire a freelancer or an agency?', answer: 'A freelancer may fit a small, clear brief; an agency may provide continuity and multiple roles. Check availability, actual live work, review practices and support rather than choosing by label alone.', href: guide('hire-web-developer-pakistan') },
    { question: 'Android or iOS — which app should I build first?', answer: 'Start with the devices your customers actually use. Cross-platform development may fit both, while specific hardware or platform needs can justify native work. Validate demand before funding two separate apps.', href: guide('mobile-app-development-cost-pakistan') },
    { question: 'Do I need a website for my small business?', answer: 'A website helps when customers need reliable service information and a contact route outside social platforms. Start small if those are the main needs; do not buy an app or custom platform without a clear use case.', href: '/services/web-development' },
    { question: 'WordPress vs Shopify for an online store?', answer: 'WordPress with WooCommerce offers content and hosting control but needs ongoing updates. Shopify bundles more platform operations into a subscription. Compare checkout requirements, exports, support and recurring fees.', href: guide('ecommerce-website-cost-pakistan') },
  ],
  Hiring: [
    guideFaqs.find(x => x.slug === 'hire-web-developer-pakistan')!.faqs[0],
    { question: 'How to start an online store in Pakistan?', answer: 'Choose a manageable catalogue, verify payment options, set delivery and return rules, then test orders on mobile. Select the platform after mapping your daily order and stock workflow.', href: guide('ecommerce-website-cost-pakistan') },
    { question: 'How to start a Shopify store from Pakistan?', answer: 'Create an owner-controlled account, prepare products, configure PKR pricing and delivery, and verify payment-provider eligibility. Test checkout, refunds and notifications before promoting the store.', href: guide('shopify-store-cost-pakistan') },
    { question: 'How to choose a software house in Pakistan?', answer: 'Review relevant live work and ask who will build, test and support your project. Get scope, milestones, ownership, licences and exit terms in writing. A registration or a city address alone is not a quality guarantee.', href: guide('hire-web-developer-pakistan') },
    { question: 'What should I check before hiring a developer?', answer: 'Check live work, references where permission exists, a written scope, repository ownership, third-party fees, backups, handover and support. Test communication with a practical question about your project.', href: guide('hire-web-developer-pakistan') },
  ],
  'SEO & Growth': [guideFaqs.find(x => x.slug === 'local-seo-pakistan')!.faqs[0]],
  'Hosting & Domains': [
    guideFaqs.find(x => x.slug === 'web-hosting-cost-pakistan')!.faqs[0],
    guideFaqs.find(x => x.slug === 'domain-hosting-cost-pakistan')!.faqs[0],
    { question: 'Shared vs VPS hosting — which is right for my website?', answer: 'Shared hosting can suit a modest content site. VPS gives more control but requires server administration unless managed help is included. Choose using workload, backups and operational support, not only storage.', href: guide('web-hosting-cost-pakistan') },
    { question: 'What is the cheapest hosting in Pakistan?', answer: 'Shared hosting market estimates start around PKR 1,500/year, but no single cheapest provider is verified here. Check limits, backups, taxes and renewal cost; a low signup price may double or triple later.', href: guide('web-hosting-cost-pakistan') },
    { question: 'Do I need hosting if I buy a website from WordbitX?', answer: 'The Rs. 25,000 package includes hosting for one year and a domain, with renewal from Rs. 10,000/year. The Rs. 20,000 package uses your existing domain and hosting. No standalone WordbitX hosting plans are published here.', href: '/pk' },
    { question: 'Can I pay for hosting with JazzCash or Easypaisa?', answer: 'Ask WordbitX to confirm accepted payment methods on your invoice before sending money. JazzCash and Easypaisa availability is not confirmed here; do not assume a market provider’s payment options apply to WordbitX.', href: '/contact' },
    { question: 'What happens when my hosting renews — does the price go up?', answer: 'Many hosts renew at double or triple their introductory rate. Check the renewal amount before signup. WordbitX’s published package renewal starts at Rs. 10,000/year; confirm the exact scope and current invoice.', href: guide('domain-hosting-cost-pakistan') },
  ],
  'Discounts & Offers': [
    { question: 'Is there a Shopify discount code?', answer: 'The supplied official offer is three days free, then $1/month for three months on Basic/Grow/Advanced, applied automatically without a code. Check current official terms and eligibility; normal subscription billing follows.', href: guide('shopify-store-cost-pakistan') },
    { question: 'Does WordbitX offer discounts?', answer: 'No owner-confirmed coupon or promotional discount is published here. Compare the standard Rs. 20,000 website and Rs. 25,000 domain-and-hosting package. Only a code the owner creates and honours should be published.', href: guide('website-development-discount-pakistan') },
    guideFaqs.find(x => x.slug === 'website-development-discount-pakistan')!.faqs[0],
    { question: 'Are coupon code websites real?', answer: 'Some list genuine offers, but many repackage public no-code offers or stale codes. Verify the offer at the official checkout. Never share account passwords or pay a stranger to unlock an unverified code.', href: guide('website-development-discount-pakistan') },
    { question: 'What is the cheapest honest way to get a website in Pakistan?', answer: 'Keep essential pages, prepare your content and compare written quotes. Competitors advertise from PKR 5,000; under PKR 10,000–15,000 usually means a copied template with weak security and no support. WordbitX starts at Rs. 20,000, or Rs. 25,000 with domain and one year hosting, including CMS, basic SEO and three months support.', href: guide('website-development-discount-pakistan') },
  ],
  AI: [
    { question: 'How can AI help my small business?', answer: 'Start with a repeated task such as document extraction, support answers from approved content or enquiry routing. WordbitX offers assistants, document intelligence, forecasting and workflow automation, with human review where needed.', href: guide('ai-automation-small-business-pakistan') },
    guideFaqs.find(x => x.slug === 'ai-automation-small-business-pakistan')!.faqs[0],
    guideFaqs.find(x => x.slug === 'ai-chatbot-cost-pakistan')!.faqs[0],
    { question: 'Best AI tools for small business in Pakistan?', answer: 'Choose by task, privacy, language quality, integration and total cost, not a universal ranking. Use the existing small-business tools guide and test candidates with real, non-sensitive examples before committing.', href: '/blog/best-ai-tools-small-business' },
    guideFaqs.find(x => x.slug === 'can-ai-build-my-website')!.faqs[0],
    { question: 'AI tools for salon / clinic / real estate business?', answer: 'A salon could draft approved service replies; a clinic could route administrative requests, not medical advice; a real estate team could summarise approved listings. These are potential uses, not claimed results. Keep staff approval and privacy controls.', href: '/services/ai-solutions' },
  ],
};
const affordable = [
  'cheapest website development in Pakistan', 'affordable website design Pakistan', 'best website development company in Pakistan', 'best software house in Lahore', 'low cost website Pakistan', 'website development packages Pakistan price', 'website development price list Pakistan',
];
questionGroups.Prices.push(...affordable.map(question => ({ question, answer: question.startsWith('best') ? 'Choose using relevant live work, a written quote, code ownership and support. There is no verified universal best supplier, and this page does not rank WordbitX first.' : 'Competitors advertise from PKR 5,000. Under PKR 10,000–15,000 usually means a copied template with weak security and no support. WordbitX starts at Rs. 20,000, or Rs. 25,000 with a domain and one year hosting, CMS, basic SEO and three months support. Compare scope; we do not claim to be cheapest.', href: guide('website-development-cost-pakistan') })));
questionGroups.Hiring.push(...[
  ['get a website quote Pakistan','Send the pages, content, deadline and integrations needed for your first release. Ask for a written quote with recurring costs and ownership terms.','/contact'],
  ['hire Shopify developer Pakistan','Share your catalogue size, payment and courier requirements, theme needs and migration scope. Ask for separate setup and subscription costs.','/services/ecommerce-shopify'],
  ['hire dedicated developer Pakistan','Describe skills, availability and who will manage delivery. Dedicated developer pricing is Get a quote; no confirmed rate is published here.','/hire-developers'],
  ['website for small business Pakistan price','WordbitX websites start at Rs. 20,000 using existing domain and hosting, or Rs. 25,000 including domain and one year hosting. Confirm the scope and renewal.','/pk'],
  ['custom software quote Pakistan','Share users, workflows, sample reports, integrations and migration requirements. WordbitX custom software starts from Rs. 2,50,000; the final scope needs a quote.','/services/pos-software'],
].map(([question,answer,href]) => ({question,answer,href})));
// Explicit city variants use the same factual answer, not invented local prices/offices.
const localBase = ['Prices','Timelines','Platforms','Hiring','SEO & Growth'].flatMap(k => questionGroups[k]).filter(q => !affordable.includes(q.question));
export const cityQuestions = ['Lahore','Karachi','Islamabad','near me'].map(city => ({city, questions: localBase.map(q => ({ ...q, question: `${q.question.replace(/\?$/, '')} — ${city}?`, answer: `${q.answer} ${city === 'near me' ? 'Confirm the supplier’s real location and remote support; nearby search results are not a quality guarantee.' : `For ${city}, request the same scoped quote; this is not a separate city price or a claim of a local office.`}` }))}));
const industries: Record<string,string> = {salon:'appointments, staff availability and service information',clinic:'booking requests, staff permissions and patient-data privacy',pharmacy:'batch and expiry tracking, stock and restricted access',restaurant:'menus, tables, kitchen routing and refunds','real estate':'approved listings, search, enquiry routing and accurate availability',school:'admissions, fee records and student-data permissions',retail:'stock, barcode scanning, sales and returns',fitness:'class schedules, memberships and booking rules',travel:'itineraries, enquiry routing and booking terms',construction:'project enquiries, documents and approval roles',finance:'sensitive records, audit trails and approval controls',logistics:'shipment records, status updates and role-based access'};
export const industryQuestions = Object.entries(industries).map(([industry,needs]) => ({industry, questions: [
  {question:`Website for ${industry} in Pakistan — what does it cost?`, answer:`A starter website can begin with WordbitX’s Rs. 20,000 scope, or Rs. 25,000 with domain and one year hosting. For ${industry}, scope ${needs} separately; specialised features are not automatically included.`,href:'/services/web-development'},
  {question:`POS / custom software for ${industry} — cost and timeline?`,answer:`Custom software starts from Rs. 2,50,000, with scope and schedule quoted after review. Discuss ${needs}, devices, migration and testing; no fixed industry package or POS timeline is promised.`,href:'/services/pos-software'},
  {question:`Booking system or app for ${industry} — what should I choose?`,answer:`Map ${needs} first. A website may be enough for enquiries; a booking workflow or app needs a separate scope. Simple apps commonly take 1–3 months, with market budgets PKR 180,000–600,000, not a fixed WordbitX offer.`,href:'/services/mobile-app-development'},
  {question:`SEO and AI services for ${industry} — where should I start?`,answer:`Start with accurate service information and a repeated task linked to ${needs}. SEO commonly needs 3–4 months for noticeable progress. AI must use approved data and human review, with no guaranteed result.`,href:'/services/ai-solutions'},
]}));
export const pkQuestions = [...questionGroups.Prices,...questionGroups['Hosting & Domains'],...questionGroups['Discounts & Offers']];
export function serviceQuestions(slug: string): Question[] {
  const mapped = guideFaqs.filter(g => ({'web-development':['website-development-cost-pakistan','wordpress-vs-custom-website','how-long-to-build-website-app'],'ai-solutions':['ai-chatbot-cost-pakistan','ai-automation-small-business-pakistan','can-ai-build-my-website'],'ecommerce-development':['ecommerce-website-cost-pakistan'],'ecommerce-shopify':['shopify-store-cost-pakistan'],'mobile-app-development':['mobile-app-development-cost-pakistan'],'seo-services':['seo-cost-pakistan','local-seo-pakistan'],'digital-marketing':['local-seo-pakistan'],'pos-software':['custom-software-development-cost-pakistan']}[slug] || []).includes(g.slug));
  const specific = mapped.map(g => g.faqs[0]);
  if(slug.includes('hosting')) specific.push(...questionGroups['Hosting & Domains'].slice(0,3));
  if(slug.includes('maintenance')) specific.push(questionGroups.Prices[6]);
  if(slug.includes('mobile') || slug.includes('android') || slug.includes('ios') || slug.includes('flutter')) specific.push(questionGroups.Timelines[1],questionGroups.Platforms[4]);
  else if(slug.includes('ecommerce') || slug.includes('shopify') || slug.includes('woocommerce')) specific.push(questionGroups.Timelines[2],questionGroups.Platforms[2]);
  else if(slug.includes('seo') || slug==='digital-marketing') specific.push(questionGroups.Timelines[3],questionGroups['SEO & Growth'][0]);
  else if(slug.includes('pos') || slug.includes('software')) specific.push(questionGroups.Timelines[4]);
  else if(slug==='web-development' || slug.includes('wordpress')) specific.push(questionGroups.Timelines[0],questionGroups.Platforms[1]);
  if(slug==='ai-solutions') specific.push(questionGroups.AI[0],questionGroups.AI[5]);
  const fallback: Question[] = [
    {question:'What should I include when requesting this service?',answer:'Share the business goal, existing system, required deliverables, integrations and deadline. Ask for a written scope, exclusions and recurring costs. Service-specific work needs a scoped quote, not an unrelated website package.',href:`/services/${slug}`},
    {question:'How are delivery dates and support agreed?',answer:'Agree milestones, review responsibilities, external approvals and support boundaries in writing. There is no universal delivery date or ongoing support price for every service.',href:`/services/${slug}`},
    ...questionGroups.Hiring.filter(q=>['What should I check before hiring a developer?','How to choose a software house in Pakistan?'].includes(q.question)),
  ];
  return [...new Map([...specific,...fallback].map(q=>[q.question,q])).values()].slice(0,6);
}
