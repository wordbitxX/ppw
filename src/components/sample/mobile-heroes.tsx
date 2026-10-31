import styles from "./mobile-heroes.module.css";

const options = [
  { id: "mobile-01", number: "01", name: "The Clear Intro", note: "Left aligned, direct and easy to scan." },
  { id: "mobile-02", number: "02", name: "The Centered Statement", note: "A bold, balanced headline with a cinematic finish." },
  { id: "mobile-03", number: "03", name: "The Editorial", note: "A quieter, more spacious agency-style introduction." },
  { id: "mobile-04", number: "04", name: "The Growth Partner", note: "A confident statement with services at a glance." },
];

function Brand() {
  return <span className={styles.brand}>Wordbit<span>X</span></span>;
}

function PhoneHeader() {
  return (
    <div className={styles.phoneHeader} aria-hidden="true">
      <Brand />
      <span className={styles.menu}><i /><i /></span>
    </div>
  );
}

function Action({ secondary = false, children }: { secondary?: boolean; children: React.ReactNode }) {
  return (
    <a className={`${styles.action} ${secondary ? styles.secondary : ""}`} href={secondary ? "/services" : "/contact"}>
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

function Promises() {
  return <div className={styles.promises}><span>✓ &nbsp;You own the code</span><span>✓ &nbsp;Weekly demos</span></div>;
}

export function MobileHeroes() {
  return (
    <section className={styles.section} aria-labelledby="mobile-concepts-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            <p className={styles.kicker}>WORD BIT X / DESIGN EXPLORATIONS</p>
            <h1 id="mobile-concepts-title">A better first impression,<br /><span>made for mobile.</span></h1>
          </div>
          <p>Four ways to make the hero clearer, more confident and easier to read on a phone. Pick a direction, or mix the details you like.</p>
        </div>
        <nav className={styles.jump} aria-label="Jump to a mobile hero concept">
          {options.map((option) => <a key={option.id} href={`#${option.id}`}><span>{option.number}</span> {option.name} <span aria-hidden="true">↗</span></a>)}
        </nav>
        <div className={styles.grid}>
          {options.map((option, index) => (
            <article className={styles.option} id={option.id} key={option.id}>
              <div className={styles.optionHeading}>
                <span className={styles.optionNumber}>{option.number}</span>
                <div><h2>{option.name}</h2><p>{option.note}</p></div>
              </div>
              <div className={`${styles.phone} ${styles[`phone${index + 1}`]}`}>
                <PhoneHeader />
                {index === 0 && <div className={styles.content1}>
                  <p className={styles.eyebrow}><span /> PAKISTAN-BASED · WORLDWIDE</p>
                  <h3>Websites, apps &amp;<br /><em>software that<br />win clients.</em></h3>
                  <p className={styles.description}>WordbitX builds digital solutions that help ambitious businesses grow, from Pakistan to the world.</p>
                  <div className={styles.actions}><Action>Discuss your project</Action><Action secondary>Explore services</Action></div>
                  <Promises />
                  <div className={styles.planet} aria-hidden="true" />
                </div>}
                {index === 1 && <div className={styles.content2}>
                  <p className={styles.eyebrow}><span /> SOFTWARE · DESIGN · GROWTH</p>
                  <h3>Big ideas.<br /><em>Built to grow.</em></h3>
                  <p className={styles.description}>From websites and apps to custom software, we turn your next idea into a digital advantage.</p>
                  <div className={styles.arc} aria-hidden="true" />
                  <div className={styles.actions}><Action>Let’s build together</Action></div>
                  <div className={styles.bottomline}><span>PAKISTAN BASED</span><span>WORLDWIDE ↗</span></div>
                </div>}
                {index === 2 && <div className={styles.content3}>
                  <p className={styles.editorialLabel}>THE DIGITAL EDIT <span>BY WORDBITX ↗</span></p>
                  <h3>Made for<br /><em>what’s next.</em></h3>
                  <p className={styles.description}>Thoughtful websites, apps and software for businesses ready to move forward.</p>
                  <div className={styles.facets} aria-hidden="true" />
                  <div className={styles.serviceLine}>STRATEGY <span>/</span> DESIGN <span>/</span> DEVELOPMENT</div>
                  <div className={styles.actions}><Action>Discuss your project</Action></div>
                </div>}
                {index === 3 && <div className={styles.content4}>
                  <p className={styles.eyebrow}><span /> YOUR DIGITAL GROWTH PARTNER</p>
                  <h3>Build smarter.<br /><em>Grow further.</em></h3>
                  <p className={styles.description}>We build websites, mobile apps and custom software that help your business grow.</p>
                  <div className={styles.tags}><span>WEB &amp; APPS</span><span>SOFTWARE</span><span>SEO &amp; MARKETING</span></div>
                  <div className={styles.actions}><Action>Start a project</Action><Action secondary>Explore services</Action></div>
                  <div className={styles.proof}><span className={styles.proofDot}>✳</span><p>Built in Pakistan.<br /><strong>Made for businesses worldwide.</strong></p></div>
                </div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
