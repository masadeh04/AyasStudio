import {defineField, defineType} from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (r) => r.min(1),
    }),

    defineField({name: 'year', title: 'Year', type: 'number'}),
    defineField({name: 'medium', title: 'Medium', type: 'string'}),
    defineField({name: 'dimensions', title: 'Dimensions', type: 'string'}),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: ['Available', 'Sold', 'Commissioned'], layout: 'radio'},
      initialValue: 'Available',
      validation: (r) => r.required(),
    }),

    defineField({name: 'price', title: 'Price (optional)', type: 'number'}),
    defineField({name: 'showPrice', title: 'Show price on site', type: 'boolean', initialValue: false}),

    defineField({name: 'tags', title: 'Tags', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'description', title: 'Description', type: 'text'}),

    defineField({name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false}),
    defineField({name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 100}),
  ],
})