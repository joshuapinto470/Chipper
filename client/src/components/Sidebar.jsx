import { useSelector } from "react-redux";
import Nav from "../widgets/Nav";
import {
  FiSearch,
  FiHome,
  FiBell,
  FiMessageSquare,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useState } from "react";
import PostTweetModel from "../Models/PostTweetModel";
import { Avatar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

const BASE_API = import.meta.env.VITE_API_URL;

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  const [showTweetModel, setTweetModel] = useState(false);

  const onCloseModel = () => {
    setTweetModel(false);
  };

  const user_picture = user.picturePath || "fallback.png";

  return (
    <header className="py-4 h-auto">
      <div className="w-[275px]">
        <div className="overflow-y-auto fixed h-screen pr-3 w-[275px]">
          <nav className="mt-5 px-2">
            <Nav
              Icon={<FiHome className="mr-4 h-6 w-6 " />}
              Heading="Home"
              to="/home"
            />
            <Nav
              Icon={<FiSearch className="mr-4 h-6 w-6 " />}
              Heading="Explore"
              to="/home"
            />
            <Nav
              Icon={<FiBell className="mr-4 h-6 w-6 " />}
              Heading="Notifications"
              to="#"
            />
            <Nav
              Icon={<FiMessageSquare className="mr-4 h-6 w-6 " />}
              Heading="Messages"
              to="#"
            />
            <Nav
              Icon={<FiUser className="mr-4 h-6 w-6 " />}
              Heading="Profile"
              to={`/profile/${user._id}`}
            />

            <button
              onClick={() => setTweetModel(true)}
              className="bg-blue-500 hover:bg-blue-600 w-full mt-5 text-white font-bold py-2 px-4 rounded-lg">
              Tweet
            </button>
          </nav>

          <div className="absolute bottom-[2rem]">
            <Nav
              Icon={<FiLogOut className="mr-4 h-6 w-6 text-red-800 " />}
              Heading="Logout"
              to={`/signin`}
            />
            <div className="flex-shrink-0 flex shadow-custom rounded-lg px-4 py-3 mt-4 mr-2">
              <div
                onClick={() => console.log("Hello")}
                className="flex-shrink-0 group block">
                <div className="flex items-center">
                  <Dropdown
                    label={
                      <Avatar img="" rounded>
                        <div className="space-y-1 font-medium text-start">
                          <div>{user.Name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            @{user.user_handle}
                          </div>
                        </div>
                      </Avatar>
                    }
                    arrowIcon={false}
                    inline>
                    <Dropdown.Header>
                      <span className="block text-sm">{user.Name}</span>
                      <span className="block truncate text-sm font-medium">
                        {user.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><Link to='/signin'>Sign Out</Link></Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostTweetModel visible={showTweetModel} onClose={onCloseModel} />
    </header>
  );
};

export default Sidebar;
