
const BASE_API = import.meta.env.VITE_API_URL;
const EditProfileModel = ({ visible, onClose }) => {
    if (!visible) return;

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    const handleFormSubmit = () => {
        
    }

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm 
            flex justify-center items-center">

            <div className="bg-[#15202b] p-2 rounded-xl flex flex-col">
                <div className="flex text-white m-2 p-1 justify-start align-middle">
                    <h1 className="font-bold text-2xl">Edit Profile</h1>
                </div>

                <div className="w-full bg-cover bg-no-repeat bg-center h-[200px]">
                    <img className="w-full h-full rounded-md"
                        src={`${BASE_API}/assets/BannerFallback.png`} alt="" />
                </div>

                <div className="flex flex-1">
                    <div className="mt-[-6rem]">
                        <div className="md rounded-full relative avatar h-[9rem] w-[9rem]">
                            <img className="md rounded-full relative border-4 border-gray-900 h-[9rem] w-[9rem]"
                                src={`${BASE_API}/assets/fallback.png`}
                                alt="" />
                        </div>
                    </div>
                </div>

                <form className="mt-4" action="#">

                    <input type="text" name="name" id="name" placeholder="Name"
                        className="block w-full px-4 py-3 mb-2 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                    <input type="text" name="bio" id="bio" placeholder="Bio"
                        className="block w-full px-4 py-3 mb-2 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                    <input type="text" name="location" id="location" placeholder="Location"
                        className="block w-full px-4 py-3 mb-2 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                    <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                        <button 
                            onClick={onClose}
                            type="button"
                            className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                            Cancel
                        </button>

                        <button
                            onClick={handleFormSubmit}
                            type="button"
                            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                            Save
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EditProfileModel