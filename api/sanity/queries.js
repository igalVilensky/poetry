// api/sanity/queries.js
export const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
   ]|order(publishedAt desc)[0...1000]{
    _id,
    title,
    slug,
    publishedAt,
    image,
    category,
    readtime,
    author,
    body
   }`;

export const TRACKS_QUERY = `*[_type == "track"]{
    _id,
    title,
    description,
    "fileId": fileId, 
    "coverImage": coverImage.asset->url
  }`;
