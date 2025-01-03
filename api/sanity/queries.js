// api/sanity/queries.js
export const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
   ]|order(publishedAt desc)[0...100]{
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
