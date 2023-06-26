/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai"

const BASE_API = import.meta.env.VITE_API_URL;

const PostTweetModel = ({ visible, onClose }) => {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
    >
      <div className="bg-[#15202b] p-2 rounded-xl flex flex-col">
        <div className="">
          <button
            onClick={onClose}
            className='hover:bg-gray-800 mt-1 py-2 px-4 rounded-full m-auto'>
            <AiOutlineClose />
          </button>
        </div>

        <div className="flex flex-col bg-[#15202b]">
          <div className="flex">
            <div className="m-2 w-10 py-1">
              <img className="inline-block h-10 w-10 rounded-full"
                src={`${BASE_API}/assets/fallback.png`}
                alt="" />
            </div>
            <div className="flex-1 px-2 pt-2 mt-2">
              <textarea className="bg-transparent text-gray-400 font-medium text-lg w-full"
                rows="2"
                cols="50"
                maxLength={280}
                placeholder="What's happening?"
              />
            </div>
          </div>
          <hr className="border-gray-800 border-1"></hr>
          <div className="flex mt-1">

            <div className="text-center px-1 py-1 m-1">
              <input type="file" accept="image/*" className="hidden" id="attachment" />
              <button
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
              </button>
            </div>

            <div className="flex px-1 py-1 m-1">
              <input type="file" accept="image/*" className="hidden" id="attachment" />
              <button
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z">
                  </path>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>

            <button 
            className="bg-blue-400 hover:bg-blue-500 mt-5 active:bg-[#1d9bf0] text-white font-bold rounded-full float-right mr-8 py-2 px-4 m-auto">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostTweetModel