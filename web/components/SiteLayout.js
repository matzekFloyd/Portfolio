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
