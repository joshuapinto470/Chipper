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

const BASE_API = import.meta.env.VITE_API_URL;

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [showTweetModel, setTweetModel] = useState(false);

  const onCloseModel = () => {
    setTweetModel(false);
  };

  const user_picture = user.picturePath || "fallback.png";

  return (
    <header className="py-4 h-auto">
      <div className="w-[275px]">
        <div className="overflow-y-auto fixed h-screen pr-3 w-[275px]">
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-slate-900 ml-3"
            fill="currentColor">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>

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
              Icon={<FiLogOut className="mr-4 h-6 w-6 " />}
              Heading="Logout"
              to={`/signin`}
            />
            <div className="flex-shrink-0 flex hover:shadow-lg rounded-lg px-4 py-3 mt-4 mr-2">
              <div
                onClick={() => console.log("Hello")}
                className="flex-shrink-0 group block">
                <div className="flex items-center">
                  <Dropdown
                    label={
                      <Avatar img="" rounded>
                        <div className="space-y-1 font-medium dark:text-white text-start">
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
                    <Dropdown.Item>Sign out</Dropdown.Item>
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
