export const artistProfileQuery = `*[_type=="artistProfile"][0]{
  name,
  tagline,
  shortBio,
  statement,
  portrait,
  email,
  instagram
}`

export const artworksQuery = `*[_type=="artwork"] | order(sortOrder asc, year desc) {
  _id,
  title,
  slug,
  images[0],
  year,
  medium,
  dimensions,
  status,
  price,
  showPrice,
  tags
}`

export const artworkBySlugQuery = `*[_type=="artwork" && slug.current==$slug][0]{
  _id,
  title,
  slug,
  images,
  year,
  medium,
  dimensions,
  status,
  price,
  showPrice,
  tags,
  description
}`