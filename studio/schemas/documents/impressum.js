export default {
  name: 'impressum',
  type: 'document',
  title: 'Impressum',
  // eslint-disable-next-line standard/array-bracket-even-spacing
  __experimental_actions: [ /* 'create' , */ 'update', /* 'delete', */ 'publish'],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Shown as the main heading on the Impressum page (e.g. “Impressum”).'
    },
    {
      title: 'Legal disclosure',
      name: 'legalDisclosure',
      type: 'string',
      description: 'Optional line under the title (e.g. a short legal or imprint notice).'
    },
    {
      title: 'Full name',
      name: 'owner',
      type: 'string',
      description: 'Name of the person responsible (Medieninhaber/in).'
    },
    {
      title: 'Street address',
      name: 'addressLineOne',
      type: 'string',
      description: 'Street and house number.'
    },
    {
      title: 'ZIP, city, country',
      name: 'addressLineTwo',
      type: 'string',
      description: 'e.g. 1010 Vienna, Austria'
    },
    {
      title: 'Contact email',
      name: 'email',
      type: 'string',
      description: 'Shown as the contact email (mailto link).',
      validation: (Rule) =>
        Rule.custom((value) => {
          const v = (value || '').trim()
          if (!v) return true
          // Loose RFC-style check; enough for CMS validation
          const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          return ok || 'Enter a valid email address'
        })
    },
    {
      name: 'body',
      title: 'Disclaimer & legal text',
      type: 'impressumPortableText',
      description: 'Disclaimer, copyright notice, and any further legal copy (portable text).'
    }
  ]
}
