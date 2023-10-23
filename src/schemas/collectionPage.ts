import { defineField, defineType } from 'sanity'
// _id:c3e4314a-b1c0-4cd7-bcc7-ba20f56f18bb
export default defineType({
  name: 'collectionPage',
  title: 'Collection Page',
  type: 'document',
  fields: [
    //  select collection name that will from navItems
    defineField({
      name: 'collection',
      title: 'Collection Name',
      type: 'reference',
      to: { type: 'navItems' },
      validation: (Rule: { required: () => any }) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // type : 'reference',
      // to : { type: 'navItems' },
      options: {
        source: 'collection',
        maxLength: 96,
      },

      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => any }) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule: { required: () => any }) => Rule.required(),
    }),
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
    }),
  ],
})
