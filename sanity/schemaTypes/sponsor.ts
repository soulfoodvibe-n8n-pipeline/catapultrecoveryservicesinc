import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sponsor',
  title: 'Corporate Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company / Sponsor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Sponsorship Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Platinum ($5,000+)', value: 'platinum' },
          { title: 'Gold ($2,500+)', value: 'gold' },
          { title: 'Silver ($1,000+)', value: 'silver' },
          { title: 'Community Supporter', value: 'supporter' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tier',
      media: 'logo',
    },
  },
})
