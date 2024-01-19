import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RiQuillPenFill } from "react-icons/ri";
import { MdHomeFilled } from "react-icons/md";
import { Button } from "flowbite-react";
import { useState } from "react";
import PostTweetModel from "../Models/PostTweetModel";

export const BottomBar = () => {
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const [showModel, setShowModel] = useState(false);

  const onCloseModel = () => {
    setShowModel(false);
  };
  return (
    <>
      <div className="lg:hidden fixed overflow-hidden bottom-0 left-0 z-50 w-full h-16 border-t border-gray-200 bg-white">
        <div className=" text-gray-400 grid h-full max-w-lg grid-cols-3 mx-auto">
          <Button
            color="gray"
            className="border-none rounded-none"
            onClick={() => {
              navigate("/");
            }}>
            <MdHomeFilled className="h-8 w-8" />
          </Button>
          <Button
            color="gray"
            className="border-none rounded-none"
            onClick={() => {
              navigate(`/profile/${_id}`);
            }}>
            <FiUser className="h-8 w-8" />
          </Button>
          <Button
            color="gray"
            className="border-none rounded-none"
            onClick={() => setShowModel(true)}>
            <RiQuillPenFill className="h-8 w-8" />
          </Button>
        </div>
      </div>
      <PostTweetModel visible={showModel} onClose={onCloseModel} />
    </>
  );
};
