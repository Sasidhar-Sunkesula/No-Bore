// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { formatCount } from '../utils/helper';

const VideoCard = ({ items }) => {
  
  const { channelTitle, title, thumbnails, publishedAt } = items.snippet;
  const {viewCount} = items.statistics;
  const { medium } = thumbnails;
  const date = publishedAt.slice(0, 10);
  const formattedViews = formatCount(viewCount);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true }).replace('about ', '');
  return (
    <div className="w-[350px] flex flex-col justify-between font-mukta cursor-pointer hover:shadow-xl rounded-lg h-80 my-4 mx-3 p-3">
      <div>
      <img alt="thumbnail" className="rounded-lg" src={medium.url}></img>
      <div className="p-1 text-lg font-semibold line-clamp-2">{title}</div>
      </div>
      <div className="flex mt-1 items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          <div>
          <div className=" ml-1 font-semibold text-sm">{channelTitle}</div>
          <div className=" ml-1 font-light text-sm">{formattedViews} views</div>
          </div>
         
        </div>
        <div className=" font-semibold text-sm">{formattedDate}</div>
      </div>
    </div>
  );
};
export default VideoCard;
