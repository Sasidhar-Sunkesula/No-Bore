export const YOUTUBE_API_URL: string =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  process.env.REACT_APP_API_KEY;

export const YOUTUBE_SEARCH_API: string =
  "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const LIVE_CHAT_COUNT: number = 25;
