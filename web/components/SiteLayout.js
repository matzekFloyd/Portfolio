import Link from 'next/link'
import Head from 'next/head'
import {useRouter} from 'next/router'

function navItems() {
  return [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/projects', label: 'Projects'},
    {href: '/contact', label: 'Contact'},
    {href: '/impressum', label: 'Impressum'}
  ]
}

export default function SiteLayout({children, siteTitle, pageTitle, description, keywords, ogImage, ogType = 'website'}) {
  const router = useRouter()
  const effectiveSiteTitle = siteTitle || 'Portfolio'
  const fullTitle = pageTitle
    ? pageTitle === effectiveSiteTitle
      ? pageTitle
      : `${pageTitle} | ${effectiveSiteTitle}`
    : effectiveSiteTitle
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mm-sanity-portfolio.netlify.app'
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`
  const keywordsContent = Array.isArray(keywords) ? keywords.join(', ') : keywords
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
        <header className="header">
          <div className="branding">
            <Link href="/">{siteTitle || 'Portfolio'}</Link>
          </div>
          <nav className="nav">
            <ul>
              {navItems().map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="navLink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="content">{children}</main>
      </div>
    </>
  )
}
