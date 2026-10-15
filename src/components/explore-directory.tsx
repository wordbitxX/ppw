import Link from "next/link";
import { homeServiceGroups } from "@/lib/home-service-links";
import { markets } from "@/lib/markets";
import { cities } from "@/lib/cities";

/**
 * Compact link directory at the foot of the home page.
 *
 * The home page used to carry full-size sections for the service index, the
 * markets and the eleven Pakistani cities. Those moved to their own hubs or
 * were cut to a few highlights; this quiet block keeps every one of those
 * pages one click from the home page (plain text links, no images, no
 * JavaScript) so no internal link — and no crawl path — is lost.
 */
const company: [string, string][] = [
  ["/about", "About WordbitX"],
  ["/process", "Our process"],
  ["/pricing", "Pricing"],
  ["/technologies", "Technologies"],
  ["/industries", "All industries"],
  ["/products", "Products & demos"],
  ["/portfolio", "Portfolio"],
  ["/hire-developers", "Hire developers"],
  ["/topics", "Guides & topics"],
  ["/blog", "Blog"],
  ["/careers", "Careers"],
  ["/contact", "Contact"],
];

const linkClass = "text-[0.83rem] leading-snug text-ink-500 transition-colors hover:text-brand-700";
const headClass = "text-xs font-semibold uppercase tracking-[0.16em] text-ink-900";

export function ExploreDirectory() {
  return (
    <nav aria-label="Explore WordbitX" className="border-t border-slate-200 bg-white py-12 sm:py-14">
      <div className="container-page">
        <h2 className="text-lg font-semibold text-ink-900">Explore WordbitX</h2>
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {homeServiceGroups.map((group) => (
            <div key={group.title}>
              <h3 className={headClass}>{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/services/${item.slug}`} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-8 border-t border-slate-100 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={headClass}>Global markets</h3>
            <ul className="mt-3 space-y-2">
              {markets.map((market) => (
                <li key={market.slug}>
                  <Link href={`/global/${market.slug}`} className={linkClass}>
                    {market.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className={headClass}>Cities in Pakistan</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/software-house/${city.slug}`} className={linkClass}>
                    {city.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={headClass}>Company &amp; resources</h3>
            <ul className="mt-3 space-y-2">
              {company.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
