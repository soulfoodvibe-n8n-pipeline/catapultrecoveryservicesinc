import { type SchemaTypeDefinition } from 'sanity'
import fundraisingEvent from './fundraisingEvent'
import sponsor from './sponsor'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [fundraisingEvent, sponsor],
}
