/**
 * City pages under /pk — Lahore first, then Karachi, Islamabad, Rawalpindi and
 * Faisalabad.
 *
 * The brief is explicit: each page has to carry content that could only be
 * written about THAT city — its real commercial areas, its industries and the
 * way local buyers search. A page that is the Lahore copy with the name swapped
 * is worse than no page, so nothing here is shared between cities except the
 * offer, the packages and the process.
 *
 * No office is implied outside Lahore. No price, client or result is invented.
 */
import type { PkFaq } from "@/lib/pk";

export type PkCityArea = { label: string };

export type PkCityPage = {
  slug: string;
  name: string;
  province: string;
  h1: string;
  /** One line under the H1, city-specific. */
  lead: string;
  /** Meta description — city name and the offer, 120–165 characters. */
  metaDescription: string;
  quick: { label: string; value: string }[];
  /** 3–4 paragraphs about this city only. */
  intro: string[];
  areas: string[];
  /** The phrases local buyers actually type, and what they need on the page. */
  searches: { phrase: string; note: string }[];
  local: { title: string; body: string }[];
  industries: { label: string; href?: string }[];
  localSeo: string[];
  faqs: PkFaq[];
  /** Slugs of the other city pages to link. */
  nearby: string[];
  related: { label: string; href: string }[];
};

export const pkCityPages: PkCityPage[] = [
  {
    slug: "web-design-lahore",
    name: "Lahore",
    province: "Punjab",
    h1: "Website design in Lahore",
    lead: "Our own city. A studio in DHA Phase 2, a short drive from your office, and the same fixed written quote we give every client.",
    metaDescription:
      "Website design in Lahore from a studio in DHA Phase 2. PKR packages, mobile-first builds, local SEO and a fixed written quote before work starts.",
    quick: [
      { label: "Base", value: "DHA Phase 2, Lahore" },
      { label: "We build", value: "Websites, stores, portals, apps and POS" },
      { label: "Experience", value: "Since 2021" },
      { label: "Reply", value: "From this phone, Lahore hours (PKT)" },
    ],
    intro: [
      "Lahore is where WordbitX is based, so this is the one city where a scoping meeting is a drive rather than a video call. You can sit in a room, go through the pages line by line, and see the work on a screen before anything is signed.",
      "The city's business mix shapes what we build. Fashion and lawn brands in Gulberg and along MM Alam Road often outgrow a Facebook page and need a real catalogue with checkout behind it. Restaurants and cafés across DHA and Johar Town want direct orders instead of paying aggregator commission on every plate. Private schools and academies need admissions, fee challans and a way to message parents. Clinics and dentists live on being found by area. And the property market around DHA, Bahria Town and Lake City runs on society, phase and plot-file detail that a generic listings template cannot hold.",
      "Lahore buyers search the way they talk: area plus service, often in English, almost always on a phone. \"Dentist in DHA Lahore\", \"school in Johar Town\", \"bakery in Gulberg\", \"gym in DHA Phase 5\". A site with one page for the whole city and no area content loses those searches to the business that wrote for the area.",
      "We work across DHA, Gulberg, Johar Town, Model Town, Garden Town, Faisal Town, Bahria Town, Lake City, Cantt and the industrial belt along Ferozepur Road and Raiwind Road. If you would rather not travel, WhatsApp and screen sharing work just as well.",
    ],
    areas: [
      "DHA Lahore (Phases 1–8)",
      "Gulberg and MM Alam Road",
      "Johar Town and Faisal Town",
      "Model Town and Garden Town",
      "Bahria Town and Lake City",
      "Cantt and Walton",
      "Shahalam and Azam Cloth Market",
      "Ferozepur Road and Raiwind Road",
    ],
    searches: [
      { phrase: "dentist in DHA Lahore", note: "Clinic page per area, timings, doctor profiles and one obvious booking path." },
      { phrase: "school in Johar Town", note: "Admissions page, fee structure, campus photos and a location that matches Google Maps." },
      { phrase: "bakery in Gulberg", note: "Menu as real content, order on WhatsApp, address and opening hours visible in the first screen." },
      { phrase: "property dealer in Bahria Town", note: "Society, phase and plot-file listings instead of one long unfilterable list." },
      { phrase: "lawn brand in Gulberg", note: "Collection pages, size guidance and a checkout that takes cash on delivery." },
      { phrase: "gym in DHA Phase 5", note: "Membership prices, class times and a trial booking rather than a contact form alone." },
    ],
    local: [
      {
        title: "Fashion and lawn brands",
        body: "Lookbook-style collection pages, a catalogue that survives a drop day, size guidance and COD checkout, with stock that matches the outlet counter.",
      },
      {
        title: "Restaurants and cafés",
        body: "The menu as data rather than a PDF, direct ordering that avoids aggregator commission, reservations and WhatsApp confirmations.",
      },
      {
        title: "Schools and academies",
        body: "Admissions, fee challans, attendance and a parent portal — the sector that most often asks us for a portal rather than a brochure.",
      },
      {
        title: "Clinics, dentists and salons",
        body: "Doctor or stylist profiles, area pages, timings and an appointment request that reaches reception, not a forgotten inbox.",
      },
      {
        title: "Real estate",
        body: "Society and phase inventory, map search, dealer dashboards and enquiries routed to the right agent with a record of every lead.",
      },
      {
        title: "Professional services",
        body: "Law, accounting and consultancies: a credible site with clear services, credentials and an enquiry path that respects confidentiality.",
      },
    ],
    industries: [
      { label: "Retail and fashion", href: "/industries/retail" },
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Restaurants and cafés", href: "/industries/hospitality" },
      { label: "Education", href: "/industries/education" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Legal and professional", href: "/industries/legal" },
    ],
    localSeo: [
      "Local search in Lahore is won page by page: a page for the service, a page for the area it serves, and a Google Business Profile whose address, hours and phone number match the site exactly.",
      "We write the area pages, structure the headings so the service and area are obvious, and keep the map listing consistent. Where a business has several branches, each one gets its own address and its own page rather than a single confused listing.",
      "SEO runs month to month with a short monthly report of what was changed and what is next. If it is not working, you can stop — there is no annual lock-in.",
    ],
    faqs: [
      {
        q: "How much does a website cost in Lahore?",
        a: "The packages are the same across Pakistan and are listed on our Pakistan prices page. The rupee figure depends on page count, content and extras, and is fixed in writing before work starts.",
        links: [
          { label: "Pakistan prices (PKR)", href: "/pk" },
          { label: "Website cost guide", href: "/blog/website-development-cost-pakistan" },
        ],
      },
      {
        q: "Do you work with businesses in Lahore?",
        a: "Yes — Lahore is our base. We build for Lahore businesses across DHA, Gulberg, Johar Town, Model Town, Bahria Town and the industrial belt, and we run our own product, Properties Pak, from here.",
        links: [{ label: "About WordbitX", href: "/about" }],
      },
      {
        q: "Can we meet in person in Lahore?",
        a: "Yes. The studio is in DHA Phase 2, so scoping meetings, content sessions and the launch walkthrough can happen in the room. We can also come to your office if that is easier.",
        links: [{ label: "Book a free call", href: "/contact" }],
      },
      {
        q: "Do you handle local SEO for Lahore areas?",
        a: "We build area-level pages, keep your Google Business Profile consistent with your address and hours, and report monthly on what changed. It is month to month, and we do not promise a ranking position.",
        links: [
          { label: "Local SEO", href: "/services/local-seo" },
          { label: "SEO services", href: "/services/seo-services" },
        ],
      },
      {
        q: "Can you take over a site another Lahore agency built?",
        a: "Usually yes. The first step is a short audit: what it is built on, who owns the hosting and domain, and whether fixing it or replacing it is the smaller job. We will say which, even when replacing it is better for us.",
        links: [{ label: "Website maintenance", href: "/services/website-maintenance" }],
      },
      {
        q: "Can you redesign our Lahore website without losing Google rankings?",
        a: "Usually yes, and the audit comes first: which Lahore pages and area searches bring enquiries now, and what has to keep its URL. We redirect the rest rather than dropping them, and we will say when patching the current site is cheaper than a rebuild.",
        links: [
          { label: "SEO services", href: "/services/seo-services" },
          { label: "Technical SEO", href: "/services/technical-seo" },
        ],
      },
      {
        q: "Can you add JazzCash or Easypaisa to a Lahore store?",
        a: "Where the provider's API supports your business type, yes — we wire the checkout, confirm each payment on your side and test it end to end before launch. Cash on delivery and card payments can sit beside them.",
        links: [{ label: "E-commerce development", href: "/services/ecommerce-development" }],
      },
    ],
    nearby: ["web-design-karachi", "web-design-islamabad", "web-design-faisalabad"],
    related: [
      { label: "Pakistan prices (PKR)", href: "/pk" },
      { label: "Web development in Lahore", href: "/web-development-lahore" },
      { label: "Software house in Lahore", href: "/software-house/lahore" },
      { label: "Website cost in Pakistan", href: "/blog/website-development-cost-pakistan" },
    ],
  },

  {
    slug: "web-design-karachi",
    name: "Karachi",
    province: "Sindh",
    h1: "Website design in Karachi",
    lead: "Pakistan's largest commercial market. Trade, logistics, pharma and services — built from Lahore, delivered over calls, chat and shared screens.",
    metaDescription:
      "Web design for Karachi businesses: stores with COD, exporter catalogues, portals and clinic sites. PKR packages and a fixed written quote before work starts.",
    quick: [
      { label: "Base", value: "Lahore — working across Sindh" },
      { label: "We build", value: "Websites, exporter catalogues, stores, portals" },
      { label: "Experience", value: "Since 2021" },
      { label: "Reply", value: "From this phone, Lahore hours (PKT)" },
    ],
    intro: [
      "Karachi buys software to fix an operational problem more often than a marketing one. The brief here is usually \"our dispatch is a mess\", \"our dealer portal is WhatsApp\" or \"our export buyer keeps emailing for status\" — not \"we need a nicer homepage\". We build for that, while still giving the business a site that looks worth calling.",
      "The city's geography decides the work. SITE and Korangi are manufacturing and packaging. The Port Qasim and KPT corridor is freight, clearing and forwarding. I.I. Chundrigar Road is banking, insurance and corporate services. Clifton, DHA, Gulshan-e-Iqbal and North Nazimabad are where consumer brands, clinics, salons and restaurants sit. Saddar and Tariq Road are retail. Each of those needs something different from a website.",
      "Karachi buyers search by area first: \"gym in Clifton\", \"dentist in DHA Karachi\", \"clinic in Gulshan\", \"wholesaler in Jodia Bazar\", \"boutique in Tariq Road\". If the area is not on the page, the business does not appear for the search. For B2B buyers the questions are different again — MOQ, specs, delivery terms, a downloadable catalogue — so an exporter site has to answer those before a buyer will email.",
      "Our team is in Lahore and most Karachi work runs over WhatsApp, calls and screen sharing. If you would rather meet in person, say so in your first message and we will tell you what can be arranged for the scope and timing.",
    ],
    areas: [
      "Clifton and DHA Karachi",
      "Gulshan-e-Iqbal and North Nazimabad",
      "PECHS and Tariq Road",
      "Saddar and I.I. Chundrigar Road",
      "Shahrah-e-Faisal corridor",
      "SITE and Korangi industrial areas",
      "Port Qasim and the KPT corridor",
      "Jodia Bazar and Bolton Market",
    ],
    searches: [
      { phrase: "gym in Clifton", note: "Membership prices, class timetable and a trial booking, not just a photo gallery." },
      { phrase: "dentist in DHA Karachi", note: "Area page, doctor profiles, timings and appointment requests that reach reception." },
      { phrase: "clinic in Gulshan", note: "Services, fees, location and a WhatsApp path for a city where people call before they visit." },
      { phrase: "wholesaler in Jodia Bazar", note: "A B2B catalogue with units, MOQ and rates — the page a shopkeeper can actually order from." },
      { phrase: "boutique in Tariq Road", note: "Collection pages with size guidance and COD checkout that survives a seasonal drop." },
      { phrase: "clearing agent in Karachi", note: "Service pages per port, documentation list and a quote request that collects the shipment details first." },
    ],
    local: [
      {
        title: "Importers, exporters and clearing agents",
        body: "Service pages per port and per commodity, a documentation checklist, and enquiry forms that ask for the shipment details up front.",
      },
      {
        title: "Textile and garment exporters",
        body: "Buyer-facing catalogues with specs, MOQ and certifications, plus a status page so foreign buyers stop emailing for updates.",
      },
      {
        title: "Pharma and medical distribution",
        body: "Batch and expiry tracking, distributor hierarchies and tax invoices — the compliance detail generic inventory software gets wrong.",
      },
      {
        title: "Retail chains and FMCG",
        body: "Outlet pages, stock visibility across locations and a dealer order flow that replaces the WhatsApp list.",
      },
      {
        title: "Restaurants, cafés and salons",
        body: "Area-first landing pages, menus and price lists as real content, direct ordering and bookings.",
      },
      {
        title: "Clinics and diagnostic labs",
        body: "Reports, test menus, timings and appointment requests, with privacy taken seriously on forms.",
      },
    ],
    industries: [
      { label: "Logistics", href: "/industries/logistics" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Finance", href: "/industries/finance" },
      { label: "E-commerce", href: "/industries/ecommerce" },
    ],
    localSeo: [
      "In Karachi, local search splits by area, not by city. A business in Clifton competes with Clifton, not with the whole of Karachi, so the pages have to name the area the customer is standing in.",
      "We build area pages for the districts a business actually serves, align the Google Business Profile with the real address and hours, and fix the basics that decide local rankings: speed on mobile data, consistent name and phone number, and crawlable pages rather than a single-page site.",
      "Monthly SEO runs with a short written report and no annual lock-in. For B2B exporters we work on the product and spec pages that buyers search in English.",
    ],
    faqs: [
      {
        q: "How much does a website cost in Karachi?",
        a: "The packages are the same as everywhere else in Pakistan and are listed on our Pakistan prices page. The final figure depends on pages, content and integrations, and is fixed in writing before work starts.",
        links: [
          { label: "Pakistan prices (PKR)", href: "/pk" },
          { label: "Website cost guide", href: "/blog/website-development-cost-pakistan" },
        ],
      },
      {
        q: "Do you work with businesses in Karachi?",
        a: "Yes. We work with clients across Pakistan, including Karachi. Delivery runs over WhatsApp, calls and screen sharing, with weekly demos on a staging link.",
        links: [
          { label: "About WordbitX", href: "/about" },
          { label: "Our process", href: "/process" },
        ],
      },
      {
        q: "Can we meet in person in Karachi?",
        a: "The team is based in Lahore, so meetings are normally video calls. If a project genuinely needs an in-person session, tell us the scope and timing in your first message and we will tell you honestly what can be arranged.",
        links: [{ label: "Book a free call", href: "/contact" }],
      },
      {
        q: "Do you understand COD and courier problems in Karachi?",
        a: "Yes — COD checkout, order confirmation, packing lists and courier handoff are built in, because that is how Karachi retail actually sells. We test the flow end to end before launch rather than leaving it to the first customer.",
        links: [{ label: "E-commerce development", href: "/services/ecommerce-development" }],
      },
      {
        q: "Do you offer local SEO for Karachi areas?",
        a: "Yes: area-level pages for the districts you serve, a consistent Google Business Profile, and a monthly report on what changed. It is month to month, and no ranking position is promised.",
        links: [{ label: "Local SEO", href: "/services/local-seo" }],
      },
      {
        q: "Can you redesign our Karachi website without losing rankings?",
        a: "The audit comes first: which category, area and product pages earn traffic in Karachi now, which URLs buyers link to, and what has to be redirected. We keep the pages that rank and rebuild the rest, rather than starting from a blank domain.",
        links: [
          { label: "SEO services", href: "/services/seo-services" },
          { label: "Website speed", href: "/services/website-speed-optimization" },
        ],
      },
      {
        q: "Can you take JazzCash, Easypaisa and COD in one checkout?",
        a: "Yes, where the provider's API supports your business type. The checkout carries COD, bank transfer and wallet payments side by side, and we test each route end to end before launch — including what the customer sees when a wallet payment fails.",
        links: [{ label: "Shopify and store builds", href: "/services/ecommerce-shopify" }],
      },
    ],
    nearby: ["web-design-lahore", "web-design-islamabad", "web-design-rawalpindi"],
    related: [
      { label: "Pakistan prices (PKR)", href: "/pk" },
      { label: "Web development in Karachi", href: "/web-development-karachi" },
      { label: "Software house in Karachi", href: "/software-house/karachi" },
      { label: "Custom software in Karachi", href: "/custom-software-development-karachi" },
    ],
  },

  {
    slug: "web-design-islamabad",
    name: "Islamabad",
    province: "Islamabad Capital Territory",
    h1: "Website design in Islamabad",
    lead: "A capital market that compares three sites before it calls. Clean structure, English-first with Urdu where it helps, and no invented credentials.",
    metaDescription:
      "Website design in Islamabad for consultancies, schools, clinics, real estate and NGOs. PKR packages and a fixed written quote before work starts.",
    quick: [
      { label: "Base", value: "Lahore — working across the capital" },
      { label: "We build", value: "Corporate sites, portals, booking, stores" },
      { label: "Experience", value: "Since 2021" },
      { label: "Reply", value: "From this phone, Lahore hours (PKT)" },
    ],
    intro: [
      "Islamabad is a smaller market than Lahore or Karachi, but the expectation is higher. Buyers here often compare three or four websites before they call, and they notice a broken form, a stock photo of a foreign office, or a claim with nothing behind it. The site has to look like the organisation is real.",
      "The business mix is distinctive: consultancies and professional services around Blue Area and Jinnah Avenue, schools, academies and universities, private healthcare, IT and software companies, real estate in DHA and Bahria Town, cafés and hospitality, and a large development and NGO sector that needs to publish reports and explain programmes clearly.",
      "That changes what a website has to do. A consultancy needs service pages, team credentials and a contact route that does not leak confidential information. A school needs admissions, fee structures and a parent communication path. An NGO needs programme pages, downloadable reports and accessibility that does not lock out a screen reader. A clinic in F-8 needs timings, doctors and a booking request that reaches reception.",
      "Islamabad buyers search with the sector or the sector name: \"salon in F-7\", \"school in F-8\", \"clinic in Blue Area\", \"consultant in Islamabad\". Many businesses also serve Rawalpindi, so a site that only names Islamabad quietly loses half its catchment.",
    ],
    areas: [
      "Blue Area and Jinnah Avenue",
      "F-6, F-7, F-8, F-10 and F-11",
      "G-8, G-9 and G-11",
      "I-8 and E-11",
      "DHA Islamabad",
      "Bahria Town and Gulberg Greens",
      "Rawalpindi border — Faizabad and Chaklala",
    ],
    searches: [
      { phrase: "salon in F-7", note: "Sector-level page, service menu with prices and online booking rather than a phone number alone." },
      { phrase: "school in F-8", note: "Admissions, fee structure, campus and a parent portal that answers routine questions." },
      { phrase: "clinic in Blue Area", note: "Doctor profiles, timings, fees and an appointment request that reaches the front desk." },
      { phrase: "consultant in Islamabad", note: "Service pages, named team and proof of work — the three things this market checks." },
      { phrase: "property in DHA Islamabad", note: "Sector and phase listings with plot files, not a single gallery of houses." },
      { phrase: "NGO in Islamabad", note: "Programme pages, downloadable reports and an accessible structure that survives an audit." },
    ],
    local: [
      {
        title: "Consultancies and professional services",
        body: "Clear service pages, named team members, credentials and a confidential enquiry route — the basics a corporate buyer checks first.",
      },
      {
        title: "Schools, academies and universities",
        body: "Admissions, fee structures, programme pages and a parent communication path that does not depend on a phone call.",
      },
      {
        title: "Clinics and healthcare",
        body: "Sector-level landing pages, doctor profiles, timings and booking requests handled by reception.",
      },
      {
        title: "Real estate",
        body: "Sector and phase inventory, plot/file detail, map search and dealer or agent dashboards.",
      },
      {
        title: "NGOs and development programmes",
        body: "Programme pages, reports, donor-friendly structure and accessible markup as a default rather than an afterthought.",
      },
      {
        title: "Cafés, restaurants and hospitality",
        body: "Menus and price lists as content, reservations, and area pages for the sectors you actually serve.",
      },
    ],
    industries: [
      { label: "Education", href: "/industries/education" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Finance", href: "/industries/finance" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Legal and professional", href: "/industries/legal" },
    ],
    localSeo: [
      "Islamabad is searched sector by sector. \"F-7\", \"F-8\" and \"Blue Area\" behave like separate local markets, and a business that serves more than one needs a page for each rather than one generic city page.",
      "We keep the Google Business Profile consistent with the real address and hours, build sector-level service pages, and make sure the phone number and name are identical everywhere they appear.",
      "For organisations that also serve Rawalpindi, we write the twin-city links into the structure instead of pretending the catchment stops at the expressway. SEO is month to month with a written report.",
    ],
    faqs: [
      {
        q: "How much does a website cost in Islamabad?",
        a: "The packages are national and are listed on our Pakistan prices page. The figure depends on pages, content and integrations, and is fixed in writing before work starts — no city surcharge.",
        links: [
          { label: "Pakistan prices (PKR)", href: "/pk" },
          { label: "Website cost guide", href: "/blog/website-development-cost-pakistan" },
        ],
      },
      {
        q: "Do you work with businesses and organisations in Islamabad?",
        a: "Yes. We build for consultancies, schools, clinics, real estate businesses and NGOs in the capital, delivered over calls and shared screens with weekly demos.",
        links: [
          { label: "About WordbitX", href: "/about" },
          { label: "Our process", href: "/process" },
        ],
      },
      {
        q: "Can we meet in person in Islamabad?",
        a: "The team is based in Lahore, so meetings are usually video calls. If the project needs an in-person session, tell us the scope and timing and we will tell you honestly what is possible.",
        links: [{ label: "Book a free call", href: "/contact" }],
      },
      {
        q: "Can you serve clients in both Islamabad and Rawalpindi?",
        a: "Yes. Many businesses here serve the twin cities, so we plan the pages for both markets rather than treating Rawalpindi as an afterthought.",
        links: [{ label: "Web design in Rawalpindi", href: "/pk/web-design-rawalpindi" }],
      },
      {
        q: "Do you offer local SEO for Islamabad sectors?",
        a: "We build sector-level pages for F-7, F-8, Blue Area and the rest of your catchment, align the Google Business Profile and report monthly. It is month to month, with no promised rankings.",
        links: [
          { label: "Local SEO", href: "/services/local-seo" },
          { label: "SEO services", href: "/services/seo-services" },
        ],
      },
      {
        q: "Can you redesign our Islamabad site without losing rankings?",
        a: "Yes, with an audit first: which sector and service pages bring enquiries, which URLs are indexed, and which redirects are needed. We keep the structure that already works and rebuild the design and code underneath it.",
        links: [{ label: "Technical SEO", href: "/services/technical-seo" }],
      },
    ],
    nearby: ["web-design-lahore", "web-design-rawalpindi", "web-design-karachi"],
    related: [
      { label: "Pakistan prices (PKR)", href: "/pk" },
      { label: "Web development in Islamabad", href: "/web-development-islamabad" },
      { label: "Software house in Islamabad", href: "/software-house/islamabad" },
      { label: "CRM and ERP in Islamabad", href: "/crm-erp-islamabad" },
    ],
  },

  {
    slug: "web-design-rawalpindi",
    name: "Rawalpindi",
    province: "Punjab",
    h1: "Website design in Rawalpindi",
    lead: "A trading city where the deal starts on WhatsApp. Practical sites, Urdu where it counts, and a price agreed in writing before the build.",
    metaDescription:
      "Web design in Rawalpindi: dealer catalogues, Bahria Town and DHA property sites, academies and clinics. PKR packages and a written quote up front.",
    quick: [
      { label: "Base", value: "Lahore — working across the twin cities" },
      { label: "We build", value: "Dealer sites, catalogues, property, academies" },
      { label: "Experience", value: "Since 2021" },
      { label: "Reply", value: "From this phone, Lahore hours (PKT)" },
    ],
    intro: [
      "Rawalpindi is a trading city, and the way business is done here shows on the website. Deals start on WhatsApp, prices are negotiated, and a customer will call before reading a page. A site that ignores that — a contact form nobody answers, a catalogue with no rates, a page that takes ten seconds on mobile data — is worse than no site.",
      "The commercial geography is specific. Raja Bazaar and Saddar are wholesale and retail trade. Murree Road and Committee Chowk are the busy commercial spine. Pirwadhai is auto parts and workshops. Satellite Town and Chaklala Scheme III hold schools, clinics and family businesses. Bahria Town and DHA Rawalpindi are the property market, with buyers who search by phase name rather than by city.",
      "That last detail matters. Someone looking in Bahria Town Phase 7 types \"Bahria Town Phase 7\" — not \"Rawalpindi\". A site with one page for the whole city never appears for those searches, while a dealer with phase-level pages does.",
      "Many businesses here also serve Islamabad, and the catchment crosses the Faizabad interchange in both directions. We plan for the twin cities rather than pretending there is a wall between them.",
    ],
    areas: [
      "Saddar and Raja Bazaar",
      "Murree Road and Committee Chowk",
      "Satellite Town and Chaklala Scheme III",
      "Bahria Town (Phases 1–8)",
      "DHA Rawalpindi",
      "Pirwadhai and Adiala Road",
      "Gulraiz and Airport Road",
      "Faizabad and the Islamabad border",
    ],
    searches: [
      { phrase: "property dealer in Bahria Town Rawalpindi", note: "Phase-level pages with plot files and prices, not a single gallery of houses." },
      { phrase: "academy in Satellite Town", note: "Courses, timings, fee structure and a form that reaches a person." },
      { phrase: "auto parts in Pirwadhai", note: "A searchable parts catalogue with part numbers — the detail a workshop actually looks up." },
      { phrase: "restaurant on Murree Road", note: "Menu with prices, timings and a direct order path rather than a third-party listing." },
      { phrase: "clinic in Chaklala", note: "Doctors, timings, fees and a WhatsApp appointment route." },
      { phrase: "wholesaler in Raja Bazaar", note: "A dealer catalogue with units and rates, plus an order sheet that can be printed or sent on WhatsApp." },
    ],
    local: [
      {
        title: "Wholesale and dealers",
        body: "A catalogue with rates, units and stock, plus an order flow that suits a shopkeeper who will still confirm on WhatsApp.",
      },
      {
        title: "Real estate",
        body: "Phase-level listings for Bahria Town and DHA, plot files, map search and dealer enquiries with a record.",
      },
      {
        title: "Academies and schools",
        body: "Courses, timings, fee structures and admissions — the sector that gets most of its enquiries from a phone search.",
      },
      {
        title: "Auto parts and workshops",
        body: "Searchable parts catalogues with part numbers, fitment notes and a quote request that asks the right questions.",
      },
      {
        title: "Transport and logistics",
        body: "Fleet and route information, booking forms and delivery tracking that replaces phone-based status checks.",
      },
      {
        title: "Clinics and family businesses",
        body: "Straightforward sites with timings, location, services and a WhatsApp button that works on a cheap phone.",
      },
    ],
    industries: [
      { label: "Retail", href: "/industries/retail" },
      { label: "Real estate", href: "/industries/real-estate" },
      { label: "Education", href: "/industries/education" },
      { label: "Construction", href: "/industries/construction" },
      { label: "Logistics", href: "/industries/logistics" },
      { label: "Healthcare", href: "/industries/healthcare" },
    ],
    localSeo: [
      "Local search in Rawalpindi runs on phase and neighbourhood names. Bahria Town phases, DHA sectors and Satellite Town are treated by buyers as separate places, and Google reads the page the same way.",
      "We build pages for those areas, keep the Google Business Profile accurate, and make sure the Urdu and English names of the business match what people actually type.",
      "SEO is month to month with a written monthly report. Where the catchment crosses into Islamabad, the plan covers both cities instead of one.",
    ],
    faqs: [
      {
        q: "How much does a website cost in Rawalpindi?",
        a: "The packages are the same across Pakistan and are listed on our Pakistan prices page. The final figure depends on pages, content and integrations, and is fixed in writing before work starts.",
        links: [
          { label: "Pakistan prices (PKR)", href: "/pk" },
          { label: "Website cost guide", href: "/blog/website-development-cost-pakistan" },
        ],
      },
      {
        q: "Do you work with businesses in Rawalpindi?",
        a: "Yes. We build dealer catalogues, property sites, academy websites and clinic sites for the twin cities, delivered over WhatsApp, calls and shared screens.",
        links: [
          { label: "About WordbitX", href: "/about" },
          { label: "Our process", href: "/process" },
        ],
      },
      {
        q: "Can we meet in person in Rawalpindi?",
        a: "The team is based in Lahore, so the default is a video call. If the work needs an in-person session, tell us the scope and timing and we will tell you honestly what can be arranged.",
        links: [{ label: "Book a free call", href: "/contact" }],
      },
      {
        q: "Can you build an Urdu-first website?",
        a: "Yes. Urdu-first or bilingual, with right-to-left layout where it helps and Urdu checked by someone who reads it. English-first with an Urdu section is also common for dealers who serve both.",
        links: [{ label: "Website development", href: "/services/web-development" }],
      },
      {
        q: "Do you offer local SEO for Bahria Town and DHA phases?",
        a: "Yes. Phase-level pages are how buyers search here, so that is how we structure the site, alongside a Google Business Profile that matches the real address and hours.",
        links: [{ label: "Local SEO", href: "/services/local-seo" }],
      },
      {
        q: "Can you rebuild our Rawalpindi site without losing the phase pages?",
        a: "The phase and area pages that already rank are the ones worth protecting, so the audit maps them first and the rebuild keeps or redirects every URL. We do not launch a new domain for a redesign unless there is a real reason to.",
        links: [{ label: "SEO services", href: "/services/seo-services" }],
      },
    ],
    nearby: ["web-design-islamabad", "web-design-lahore", "web-design-faisalabad"],
    related: [
      { label: "Pakistan prices (PKR)", href: "/pk" },
      { label: "Software house in Rawalpindi", href: "/software-house/rawalpindi" },
      { label: "Web design in Islamabad", href: "/pk/web-design-islamabad" },
      { label: "Real estate portals", href: "/services/real-estate-portals" },
    ],
  },

  {
    slug: "web-design-faisalabad",
    name: "Faisalabad",
    province: "Punjab",
    h1: "Website design in Faisalabad",
    lead: "Textile country. One site often has to convince a foreign buyer in English and a local retailer in Urdu — without inventing certifications.",
    metaDescription:
      "Website design in Faisalabad for textile exporters, wholesalers and retail. Spec-led catalogues in English and Urdu, PKR packages, written quote first.",
    quick: [
      { label: "Base", value: "Lahore — working across Faisalabad" },
      { label: "We build", value: "Exporter catalogues, stores, dealer portals" },
      { label: "Experience", value: "Since 2021" },
      { label: "Reply", value: "From this phone, Lahore hours (PKT)" },
    ],
    intro: [
      "Faisalabad sells to two audiences at once. A mill or exporter needs a foreign buyer to find the product, read the specification and send an enquiry in English. The same company often needs a local retailer or dealer to see rates and stock in Urdu. A single thin brochure page serves neither.",
      "The industrial base is textiles and everything around it: spinning, weaving, processing, home textiles and hosiery, plus garments, agri-processing and the wholesale cloth trade. Retail runs along D Ground and Susan Road, with the older wholesale markets around Ghanta Ghar. Millat Road and Sargodha Road hold industrial units, and the residential and commercial spread runs through Peoples Colony, Jinnah Colony, Madina Town and Ghulam Muhammad Abad.",
      "What buyers check before they email is specific: product specifications (composition, GSM, width, finish), certifications the business actually holds, capacity, minimum order quantity and lead time. A website that lists \"quality products\" and no numbers gets skipped. We write the specification tables and enquiry forms around what the buyer needs to decide.",
      "Locally, buyers search in English and Urdu by area and category: \"cloth wholesaler in Ghanta Ghar\", \"academy in Susan Road\", \"hospital in D Ground\", \"boutique in D Ground\". Both kinds of search need a real page — not a PDF catalogue and a phone number.",
    ],
    areas: [
      "D Ground and Susan Road",
      "Peoples Colony and Jinnah Colony",
      "Madina Town and Ghulam Muhammad Abad",
      "Ghanta Ghar and the cloth wholesale markets",
      "Millat Road and Sargodha Road industrial areas",
      "Canal Road and Abdullahpur",
      "Jaranwala Road and Samundri Road",
    ],
    searches: [
      { phrase: "textile exporter in Faisalabad", note: "Product and spec pages, certifications actually held, capacity and an enquiry form built for foreign buyers." },
      { phrase: "cloth wholesaler in Ghanta Ghar", note: "Rate lists, units and a dealer order sheet — the information a retailer asks for on the phone." },
      { phrase: "hospital in D Ground", note: "Departments, doctors, timings and an appointment route that reaches reception." },
      { phrase: "academy in Susan Road", note: "Courses, timings and fee structure, plus a form that reaches a person the same day." },
      { phrase: "boutique in D Ground", note: "Collection pages with size guidance and a COD checkout." },
      { phrase: "hosiery manufacturer Faisalabad", note: "Product specifications, MOQ and lead time, in English, for the buyer searching from abroad." },
    ],
    local: [
      {
        title: "Textile exporters",
        body: "Product and specification pages in English, certification pages that only list what is actually held, and an enquiry form built for an overseas buyer.",
      },
      {
        title: "Home textiles and hosiery",
        body: "Catalogue structure by product, composition and size, with sample requests and MOQ handled properly.",
      },
      {
        title: "Wholesale cloth and dealers",
        body: "Rate lists, units and a dealer order flow that can still be confirmed on WhatsApp the way the market works.",
      },
      {
        title: "Retail and boutiques",
        body: "Collection pages, size guidance and COD checkout, on a site that loads on a phone in a shop.",
      },
      {
        title: "Schools and academies",
        body: "Admissions, timings, fee structures and a parent communication path.",
      },
      {
        title: "Hospitals and clinics",
        body: "Departments, doctors, timings and appointment requests, with privacy taken seriously on forms.",
      },
    ],
    industries: [
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Retail", href: "/industries/retail" },
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "Education", href: "/industries/education" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Logistics", href: "/industries/logistics" },
    ],
    localSeo: [
      "Faisalabad search splits in two. Local buyers search by area and category in English or Urdu; foreign buyers search product names and specifications in English. One page cannot rank for both, so we build both.",
      "For the local side we write area pages and keep the Google Business Profile consistent. For the export side we build product and spec pages, a proper sitemap and enquiry tracking, so an enquiry does not die in an inbox nobody checks.",
      "SEO is month to month with a written report. Where a business already ranks for product terms, the first job is protecting those URLs through any redesign.",
    ],
    faqs: [
      {
        q: "How much does a website cost in Faisalabad?",
        a: "The packages are national and are listed on our Pakistan prices page. The rupee figure depends on pages, product data and integrations, and is fixed in writing before work starts.",
        links: [
          { label: "Pakistan prices (PKR)", href: "/pk" },
          { label: "Website cost guide", href: "/blog/website-development-cost-pakistan" },
        ],
      },
      {
        q: "Do you work with exporters and manufacturers in Faisalabad?",
        a: "Yes. We build exporter catalogues with specification tables, MOQ and enquiry forms, plus the local dealer and retail side of the same business.",
        links: [
          { label: "Manufacturing", href: "/industries/manufacturing" },
          { label: "Custom web applications", href: "/services/custom-web-application-development" },
        ],
      },
      {
        q: "Can we meet in person in Faisalabad?",
        a: "The team is based in Lahore, so meetings are normally video calls. If the scope needs an in-person session, say so in your first message and we will tell you what can be arranged.",
        links: [{ label: "Book a free call", href: "/contact" }],
      },
      {
        q: "Can you build an export catalogue with specifications and MOQ?",
        a: "Yes. Product pages carry composition, GSM, width, finish, MOQ and lead time — the fields a buyer checks before emailing — with an enquiry form that collects them.",
        links: [{ label: "E-commerce development", href: "/services/ecommerce-development" }],
      },
      {
        q: "Do you offer local SEO for Faisalabad areas?",
        a: "Yes — area pages for D Ground, Susan Road, Peoples Colony and the rest of your catchment, a consistent Google Business Profile, and a monthly written report. No ranking position is promised.",
        links: [{ label: "Local SEO", href: "/services/local-seo" }],
      },
      {
        q: "Can you rebuild our site without losing the product pages buyers find?",
        a: "An exporter's product and specification pages are the ones that earn enquiries, so they are mapped before anything is rebuilt and kept or redirected URL by URL. The new build keeps the content, not just the look.",
        links: [
          { label: "SEO services", href: "/services/seo-services" },
          { label: "Custom web applications", href: "/services/custom-web-application-development" },
        ],
      },
    ],
    nearby: ["web-design-lahore", "web-design-rawalpindi", "web-design-karachi"],
    related: [
      { label: "Pakistan prices (PKR)", href: "/pk" },
      { label: "Software house in Faisalabad", href: "/software-house/faisalabad" },
      { label: "Website cost in Pakistan", href: "/blog/website-development-cost-pakistan" },
      { label: "E-commerce cost guide", href: "/blog/ecommerce-website-cost-pakistan" },
    ],
  },
];

export function getPkCityPage(slug: string): PkCityPage | undefined {
  return pkCityPages.find((page) => page.slug === slug);
}
