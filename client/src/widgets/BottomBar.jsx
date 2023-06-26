import { useNavigate } from "react-router-dom"
import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";

export const BottomBar = () => {

    const navigate = useNavigate();
    const { _id } = useSelector(state => state.user);
    return (
        <>
            <div className="lg:hidden sticky bottom-0 left-0 z-50 w-full h-16 border-t border-gray-200 bg-[#15202b] dark:border-gray-600">
                <div className=" text-gray-400 grid h-full max-w-lg grid-cols-3 mx-auto">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="w-9 h-9 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em">
                            <path d="M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
                        </svg>
                    </button>
                    <button type="button"
                        onClick={() => navigate(`/profile/${_id}`)}
                        className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <FiUser className="w-9 h-9"/>
                    </button>
                    <button type="button" className="inline-flex flex-col items-center justify-center font-medium px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="w-10 h-10 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="1em"
                            width="1em">
                            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}