// api/sanity/posts.js
import { POSTS_QUERY } from "./queries";

export const fetchPosts = () => {
  // Return the query result directly, don't destructure
  return useSanityQuery(POSTS_QUERY);
};
