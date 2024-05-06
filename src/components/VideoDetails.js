const VideoDetails = ({video})=>{

    return (
        <div className="collapse  collapse-arrow ">
          <input type="checkbox" />
          <div className="collapse-title dark:bg-gray-800 dark:text-white bg-gray-200 text-xl font-medium">
            {video.snippet.title}
          </div>
          <div className="collapse-content">
            <p className="font-semibold p-1">
              <p className="text-base text-blue-500">
                {video.snippet.tags &&
                  video.snippet.tags.map((item) => " #" + item)}
              </p>
              {video.snippet.description}
            </p>
          </div>
        </div>
    )
}

export default VideoDetails;