import axios from "axios";
import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
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

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  let profile = user.picturePath || "fallback.png";
  let banner = user.bannerImage || "BannerFallback.png";

  const [displayedImage, setDisplayedImage] = useState(
    `${BASE_API}/assets/${profile}`
  );
  const [bannerImage, setBannerImage] = useState(
    `${BASE_API}/assets/${banner}`
  );

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
  };

  const handleBannerUpload = async (e) => {
    if (e.target.files) {
      setBackdropImage(e.target.files[0]);
      setBackdropImageURL(URL.createObjectURL(e.target.files[0]));
      setBannerImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormSubmit = () => {
    const formData = new FormData();
    console.log(name, bio, location, userImage, backdropImage);

    if (name) formData.append("user_name", name);
    if (bio) formData.append("bio", bio);
    if (location) formData.append("location", location);

    formData.append("avatar", userImage);
    formData.append("banner", backdropImage);
    console.log("SENDING DATA : ", formData);

    axios({
      method: "post",
      url: API_URL,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const user = res.data;
        dispatch(updateUser(user));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeImage();
        onClose();
      });
  };

  const closeImage = () => {
    setBackdropImage(null);
    setUserImage(null);
    setUserImageURL(null);
    setBackdropImageURL(null);
    setDisplayedImage(`${BASE_API}/assets/${profile}`);
    setBannerImage(`${BASE_API}/assets/${banner}`);
  };

  return (
    <Modal show={visible} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900">
            Edit your profile
          </h3>
          <div>
            <form>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder={user.name}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="bio" value="Your Bio" />
                </div>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="location" value="Your Location" />
                </div>
                <TextInput
                  id="location"
                  placeholder="Location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                />
              </div>
              <div className="w-full mt-4">
                <Button onClick={handleFormSubmit}>Save</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModel;
