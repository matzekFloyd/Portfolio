import Link from 'next/link'
import Head from 'next/head'

function navItems() {
  return [
    {href: '/', label: 'Home'},
    {href: '/about', label: 'About'},
    {href: '/projects', label: 'Projects'},
    {href: '/contact', label: 'Contact'},
    {href: '/impressum', label: 'Impressum'}
  ]
}

export default function SiteLayout({children, siteTitle, pageTitle, description}) {
  const fullTitle = pageTitle ? `${pageTitle} | ${siteTitle || 'Portfolio'}` : siteTitle || 'Portfolio'
  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        {description ? <meta name="description" content={description} /> : null}
      </Head>
      <div className="shell">
        <header className="header">
          <h1>{siteTitle || 'Portfolio'}</h1>
          <nav>
            {navItems().map((item) => (
              <Link key={item.href} href={item.href} className="navLink">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </>
  )
}
