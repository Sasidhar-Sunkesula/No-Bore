import React from "react";

const Shimmer: React.FC = () => {
  return (
    <div className="flex  flex-wrap justify-center ">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="Shimmer h-60 w-72 m-4 rounded-md border-2 border-slate-400 animate-pulse"
        >
          <div className="h-32 mx-auto mt-3 w-64 border-2 rounded-md animate-pulse border-slate-400 "></div>
          <div className="h-6 mx-auto mt-3 rounded-lg w-56  border-2 border-slate-300"></div>
          <div className="h-5 mx-auto mt-3 rounded-lg w-60 animate-pulse border-2 border-slate-300"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
