import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, type ReactNode } from "react";

type SiteLayoutProps = {
  children: ReactNode;
  siteTitle?: string | null;
  pageTitle?: string | null;
  description?: string | null;
  keywords?: string[] | string | null;
  ogImage?: string | null;
  ogType?: string;
};

function navItems() {
  return [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
}

export default function SiteLayout({
  children,
  siteTitle,
  pageTitle,
  description,
  keywords,
  ogImage,
  ogType = "website",
}: SiteLayoutProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const effectiveSiteTitle = siteTitle || "Portfolio";
  const fullTitle = pageTitle
    ? pageTitle === effectiveSiteTitle
      ? pageTitle
      : `${pageTitle} | ${effectiveSiteTitle}`
    : effectiveSiteTitle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mathiasmayrhofer.at";
  const canonicalUrl = `${siteUrl}${router.asPath === "/" ? "" : router.asPath}`;
  const keywordsContent = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        {description ? <meta name="description" content={description} /> : null}
        {keywordsContent ? <meta name="keywords" content={keywordsContent} /> : null}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={fullTitle} />
        {description ? <meta property="og:description" content={description} /> : null}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={canonicalUrl} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        {description ? <meta name="twitter:description" content={description} /> : null}
        {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      </Head>
      <div className="shell">
        <header className={`header${isMenuOpen ? " menuOpen" : ""}`}>
          <div className="branding">
            <Link
              href="/"
              aria-label="Mathias Mayrhofer – Home"
              className={`brandLink${router.pathname === "/" ? " homeBrandLink" : ""}`}
            >
              MM
            </Link>
          </div>
          {!isMenuOpen ? (
            <button
              type="button"
              className="menuToggle"
              aria-label="Open navigation menu"
              aria-expanded={false}
              aria-controls="main-navigation"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="menuLine" />
              <span className="menuLine" />
              <span className="menuLine" />
            </button>
          ) : null}
          {isMenuOpen ? (
            <button
              type="button"
              className="navBackdrop"
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : null}
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={`nav${isMenuOpen ? " navOpen" : ""}`}
          >
            <ul>
              {navItems().map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`navLink${router.pathname === item.href ? " activeNavLink" : ""}`}
                    aria-current={router.pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="content">{children}</main>
        <footer className="siteFooter">
          <span className="footerMeta">© {currentYear} Mathias Mayrhofer</span>
          <Link href="/impressum" className="footerLink">
            Impressum
          </Link>
        </footer>
      </div>
    </>
  );
}
