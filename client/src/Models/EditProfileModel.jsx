import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../state";

const BASE_API = import.meta.env.VITE_API_URL;
const API_URL = BASE_API + "/user/edit";

const EditProfileModel = ({ visible, onClose }) => {
    const [userImage, setUserImage] = useState(null);
    const [userImageURL, setUserImageURL] = useState(null);

    const [backdropImage, setBackdropImage] = useState(null);
    const [backdropImageURL, setBackdropImageURL] = useState(null);

    const [name, setName] = useState(null);
    const [bio, setBio] = useState(null);
    const [location, setLocation] = useState(null);

    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);

    const dispatch = useDispatch();

    let profile = user.picturePath || "fallback.png";
    let banner = user.bannerImage || "BannerFallback.png"

    const [displayedImage, setDisplayedImage] = useState(`${BASE_API}/assets/${profile}`);
    const [bannerImage, setBannerImage] = useState(`${BASE_API}/assets/${banner}`);

    if (!visible) return;

    const handleOnClose = (e) => {
        closeImage();
        if (e.target.id === "container") onClose();
    };

    const handleProfileUpload = async (e) => {
        if (e.target.files) {
            setUserImage(e.target.files[0]);
            setUserImageURL(URL.createObjectURL(e.target.files[0]));
            setDisplayedImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleBannerUpload = async (e) => {
        if (e.target.files) {
            setBackdropImage(e.target.files[0]);
            setBackdropImageURL(URL.createObjectURL(e.target.files[0]));
            setBannerImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleFormSubmit = () => {
        const formData = new FormData();
        console.log(name, bio, location, userImage, backdropImage);

        if (name)
            formData.append("user_name", name);
        if (bio)
            formData.append("bio", bio);
        if (location)
            formData.append("location", location);

        formData.append("avatar", userImage);
        formData.append("banner", backdropImage);
        console.log("SENDING DATA : ", formData);

        axios({
            method: "post",
            url: API_URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            },
        }).then(res => {
            const user = res.data;
            dispatch(
                updateUser(user)
            )
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            closeImage();
            onClose();
        })
    }

    const closeImage = () => {
        setBackdropImage(null);
        setUserImage(null);
        setUserImageURL(null);
        setBackdropImageURL(null);
        setDisplayedImage(`${BASE_API}/assets/${profile}`);
        setBannerImage(`${BASE_API}/assets/${banner}`)
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
                    <input type="file" accept="image/*" className="hidden" id="attachment-banner" onChange={handleBannerUpload} />
                    <img
                        onClick={() => { document.getElementById("attachment-banner").click() }}
                        className="w-full h-full rounded-md"
                        src={bannerImage} alt="" />
                </div>

                <div className="flex flex-1">
                    <div className="mt-[-6rem]">
                        <div className="md rounded-full relative avatar h-[9rem] w-[9rem]">
                            <input type="file" accept="image/*" className="hidden" id="attachment" onChange={handleProfileUpload} />
                            <img
                                onClick={() => { document.getElementById("attachment").click() }}
                                className="md rounded-full relative border-4 border-gray-900 h-[9rem] w-[9rem]"
                                src={displayedImage}
                                alt="" />
                        </div>
                    </div>
                </div>

                <form className="mt-4" action="#">

                    <input type="text" name="name" id="name" placeholder="Name"
                        onChange={event => setName(event.target.value)}
                        className="block w-full px-4 py-3 mb-2 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                    <input type="text" name="bio" id="bio" placeholder="Bio"
                        onChange={event => setBio(event.target.value)}
                        className="block w-full px-4 py-3 mb-2 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />

                    <input type="text" name="location" id="location" placeholder="Location"
                        onChange={event => setLocation(event.target.value)}
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