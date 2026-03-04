import {defineField, defineType} from 'sanity'

const contactItem = defineType({
  name: 'contactItem',
  title: 'Contact Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Example: “WhatsApp (Jordan)” or “Assistant”',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Phone', value: 'phone'},
          {title: 'Email', value: 'email'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'Phone number or email address',
      validation: (r) => r.required(),
    }),
  ],
})

export const artistProfile = defineType({
  name: 'artistProfile',
  title: 'Artist Profile',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'portrait', title: 'Portrait', type: 'image', options: {hotspot: true}}),

    defineField({name: 'shortBio', title: 'Short Bio', type: 'text'}),
    defineField({name: 'statement', title: 'Artist Statement', type: 'array', of: [{type: 'block'}]}),

    // Contact page “corporate statement” text (optional but recommended)
    defineField({
      name: 'contactStatement',
      title: 'Contact Page Statement',
      type: 'text',
      description: 'Example: “All artworks are original…”',
    }),

    // Dropdown lists for Contact page
    defineField({
      name: 'commissionsContacts',
      title: 'Commissions Contacts',
      type: 'array',
      of: [{type: 'contactItem'}],
    }),
    defineField({
      name: 'buyingContacts',
      title: 'Buying Contacts',
      type: 'array',
      of: [{type: 'contactItem'}],
    }),

    defineField({name: 'email', title: 'Public Email (optional)', type: 'string'}),
    defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
  ],
})

// IMPORTANT: export contactItem too so it can be registered in schemaTypes
export {contactItem}