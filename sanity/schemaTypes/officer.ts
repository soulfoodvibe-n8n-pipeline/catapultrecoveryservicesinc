import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'officer',
  title: 'Leadership Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Headshot Image',
      type: 'image',
      options: {
        hotspot: true, // Enables UI for cropping
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers show up first (e.g., 1 for Executive Director)',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
