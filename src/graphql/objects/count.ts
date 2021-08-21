import { objectType } from 'nexus'

export const countType = objectType({
  name: 'Count',
  definition(t) {
    t.nonNull.int('count')
  },
})
