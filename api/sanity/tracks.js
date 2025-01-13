// api/sanity/tracks.js
import { TRACKS_QUERY } from "./queries";

export const fetchTracks = () => {
  return useSanity().fetch(TRACKS_QUERY);
};
