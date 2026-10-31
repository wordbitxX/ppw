import Link from "next/link";
import { CineImage } from "@/components/cinematic";
import { CheckIcon } from "@/components/icons";
import styles from "./mobile-home-hero-v2.module.css";

/** The mobile-only version of the Centered Statement concept on /sample. */
export function MobileHomeHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}><span aria-hidden="true" /> Software · Design · Growth</p>
        <h1>Big ideas.<br /><span>Built to grow.</span></h1>
        <p className={styles.description} style={{ fontSize: "15px" }}>
          From websites and apps to custom software, WordbitX turns your next idea into a powerful, lasting digital advantage.
        </p>
        <ul style={{ display: "grid", gridTemplateColumns: "max-content max-content", justifyContent: "center", columnGap: 10, rowGap: 8, margin: "24px -16px 0", color: "#e2e8f0", fontSize: "clamp(9px, 2.6vw, 10px)", fontWeight: 500, lineHeight: 1.4 }}>
          {["You own the code, repo & hosting", "Written scope before build", "Weekly demos & staging URLs"].map((item, index) => (
            <li key={item} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, whiteSpace: "nowrap", gridColumn: index === 2 ? "1 / -1" : undefined }}><CheckIcon style={{ width: 12, height: 12, flexShrink: 0, color: "#2ec243" }} />{item}</li>
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
        <div className={styles.location}><span>Pakistan based</span><span>Worldwide ↗</span></div>
      </div>
    </div>
  );
}
