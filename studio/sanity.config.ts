import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'
import {documentListWidget} from 'sanity-plugin-dashboard-widget-document-list'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'MM - Portfolio',
  projectId: 'aartfjgc',
  dataset: 'production',
  plugins: [
    dashboardTool({
      widgets: [
        projectInfoWidget({layout: {width: 'medium'}}),
        projectUsersWidget({layout: {width: 'small'}}),
        documentListWidget({
          title: 'Latest projects',
          types: ['sampleProject'],
          order: '_updatedAt desc',
          limit: 5,
          showCreateButton: true,
          createButtonText: 'New project',
          layout: {width: 'medium'}
        }),
        documentListWidget({
          title: 'Recently edited',
          order: '_updatedAt desc',
          limit: 6,
          showCreateButton: false,
          layout: {width: 'medium'}
        })
      ]
    }),
    structureTool({structure})
  ],
  schema: {
    types: schemaTypes
  }
})
