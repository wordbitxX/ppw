import Link from "next/link";
import { ArrowRight } from "@/components/icons";
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

const headClass = "text-xs font-semibold uppercase tracking-[0.16em] text-ink-900";

/** Directory link with a premium hover: the row lifts onto a soft tint and an
    arrow slides in, so the pointer always gets an answer. Pure CSS. */
function DirLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-[0.45rem] text-[0.83rem] leading-snug text-ink-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-50/90 hover:to-white hover:text-brand-700 hover:shadow-[0_14px_30px_-22px_rgba(5,13,33,0.55)]"
    >
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 -translate-x-1.5 text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </Link>
  );
}

export function ExploreDirectory() {
  return (
    <nav aria-label="Explore WordbitX" className="border-t border-slate-200 bg-white py-12 sm:py-14">
      <div className="container-page">
        <h2 className="text-lg font-semibold text-ink-900">Explore WordbitX</h2>
        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {homeServiceGroups.map((group) => (
            <div key={group.title}>
              <h3 className={headClass}>{group.title}</h3>
              <ul className="mt-3 space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <DirLink href={`/services/${item.slug}`}>{item.label}</DirLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-8 border-t border-slate-100 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className={headClass}>Global markets</h3>
            <ul className="mt-3 space-y-0.5">
              {markets.map((market) => (
                <li key={market.slug}>
                  <DirLink href={`/global/${market.slug}`}>{market.name}</DirLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className={headClass}>Cities in Pakistan</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <DirLink href={`/software-house/${city.slug}`}>{city.h1}</DirLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={headClass}>Company &amp; resources</h3>
            <ul className="mt-3 space-y-0.5">
              {company.map(([href, label]) => (
                <li key={href}>
                  <DirLink href={href}>{label}</DirLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
