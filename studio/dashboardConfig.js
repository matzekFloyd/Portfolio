export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f56559ee700ee9b2d5ea295',
                  title: 'Sanity Studio',
                  name: 'mm-sanity-portfolio-studio',
                  apiId: 'c518f8bc-0e71-407b-ad1e-309b5cfcf9b7'
                },
                {
                  buildHookId: '5f56559e9e0e974c9c4f3b75',
                  title: 'Portfolio Website',
                  name: 'mm-sanity-portfolio',
                  apiId: '810f305e-f570-4dda-bba8-16abaf12654a'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/matzekFloyd/mm-sanity-portfolio',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://mm-sanity-portfolio.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
