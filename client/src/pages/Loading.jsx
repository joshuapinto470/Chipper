import React from "react";
import { Link } from "react-router-dom";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col gap-2 justify-center items-center">
      <h1 className="font-bold text-3xl">Loading!</h1>

      <div className="p-2 bg-blue-700 rounded-md">
        <Link to={"/home"}><span className="text-white p-1 mx-1">Go Back</span></Link>
      </div>
    </div>
  );
};

export default Loading;
