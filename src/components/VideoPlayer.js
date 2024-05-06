const VideoPlayer = ({ reqId }) => {
  return (
    <iframe
      className="w-2/3 rounded-lg"
      height="500"
      src={"https://www.youtube.com/embed/" + reqId}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
