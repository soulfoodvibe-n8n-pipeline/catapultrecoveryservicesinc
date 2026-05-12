import { type SchemaTypeDefinition } from 'sanity'
import fundraisingEvent from './fundraisingEvent'
import sponsor from './sponsor'
import officer from './officer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [fundraisingEvent, sponsor, officer],
}
