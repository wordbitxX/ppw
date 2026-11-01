import Link from "next/link";
import { CineImage } from "@/components/cinematic";
import { CheckIcon } from "@/components/icons";
import { BookingButton } from "@/components/booking-button";
import styles from "./mobile-home-hero-v2.module.css";

/** The mobile-only version of the Centered Statement concept on /sample. */
export function MobileHomeHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.description}>
          <strong className="text-gradient-arc">WordbitX</strong> builds websites, apps, Shopify stores &amp; custom software.
        </p>
        <ul className={styles.promises}>
          {["You own the code, repo & hosting", "Written scope before build", "Weekly demos & staging URLs"].map((item) => (
            <li key={item}><CheckIcon style={{ width: 12, height: 12, flexShrink: 0, color: "#2ec243" }} />{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.art} aria-hidden="true">
        <div className={styles.artImage}><CineImage variant="calm" /></div>
        <div className={styles.glow} />
      </div>
      <div className={styles.bottom}>
        <Link href="/contact" className={styles.action}>
          Let’s build together <span aria-hidden="true">↗</span>
        </Link>
        {/* One secondary action only. The green "Let's build together" carries
            the conversion; the booking link sits under it as a centered outline
            pill — auto width, same 48px height as the primary, so the two read
            as a pair instead of two competing full-width blocks. */}
        <div className="mt-3 flex justify-center">
          <BookingButton className="!h-12 !rounded-full !px-6" />
        </div>
        <div className={styles.location}><span>Pakistan based</span><span>Worldwide ↗</span></div>
      </div>
    </div>
  );
}
