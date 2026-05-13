import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'aartfjgc',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  }
})
