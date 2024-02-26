import { useState, useRef, useEffect } from "react";
import {
  useGetModelResponseMutation,
  useUploadFoodImageMutation,
} from "../features/apiSlice.js";
import SideBar from "../components/SideBar.jsx";
import ai_bot from "../assets/floating-robot_78370-3669.avif";
import WebCam from "../components/WebCam.jsx";
import { toast } from "react-toastify";

const HomeScreen = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [image, setImage] = useState();
  const [humanMsg, setHumanMsg] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [dietary_restrictions, setDietaryRestrictions] = useState("");
  const scrollAreaRef = useRef(null);
  const [takePhoto, setTakePhoto] = useState(false);

  // API CALLS
  const [sendQuery, { isLoading }] = useGetModelResponseMutation();
  const [uploadFoodImage] = useUploadFoodImageMutation();

  // Handlers
  const imageHandler = async (event) => {
    const uploadedFile = event.target.files[0];
    // Set image url for diaplaying in frontend
    setImageSrc(URL.createObjectURL(uploadedFile));
    const formData = new FormData();
    formData.append("image", uploadedFile);
    try {
      const res = await uploadFoodImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.error(error?.data?.message || error.error);
    }
  };

  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (humanMsg.trim() !== "" && dietary_restrictions !== "") {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: humanMsg, sender: "human" },
      ]);
      setHumanMsg("");

      try {
        const res = await sendQuery({
          input: humanMsg,
          restrictions: dietary_restrictions,
          image,
        }).unwrap();
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { text: res["response"], sender: "ai" },
        ]);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast("Please ensure to set your dietary preferences from the sidebar");
    }
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    scrollAreaRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <>
      <div className="flex">
        <div className="fixed z-50">
          <SideBar
            imageHandler={imageHandler}
            setDietaryRestrictions={setDietaryRestrictions}
            takePhoto={setTakePhoto}
          />
        </div>

        <div className="flex flex-col items-center flex-auto w-full">
          <div className="flex flex-col items-center">
            <h1 className="font-bold font-blackops bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 text-transparent text-4xl mt-3 md:text-7xl">
              Diet Detective
            </h1>
          </div>

          <div className="mt-5 mb-20 relative">
            {imageSrc ? (
              <img
                className="h-96 w-96 rounded-full object-cover object-center"
                src={imageSrc}
                alt={"food image"}
              />
            ) : (
              takePhoto && (
                <>
                  <WebCam
                    setImageSrc={setImageSrc}
                    setImage={setImage}
                    uploadFoodImage={uploadFoodImage}
                    setTakePhoto={setTakePhoto}
                  />
                </>
              )
            )}

            {/* <div className="absolute bottom-0 left-0 right-0 z-10 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50 text-white text-center py-2">
              Food Image
            </div> */}
          </div>

          <div className="relative mx-2">
            <div className="absolute -top-10 rounded-lg inset-x-0 bg-gray-500 p-3">
              <span className="text-white text-lg font-blackops font-light">
                Chat with DD Bot
              </span>
            </div>
            <div
              ref={scrollAreaRef}
              className="rounded-lg overflow-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 mb-20 p-3 min-w-[300px]  md:max-w-[700px] md:min-w-[700px] md:h-[600px]"
            >
              {chatMessages.map((message, index) => (
                <div
                  className={`chat ${
                    message.sender === "human" ? "chat-end " : "chat-start"
                  }`}
                  key={index}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      {message.sender === "ai" ? (
                        <img alt="avatar" src={ai_bot} />
                      ) : (
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      )}
                    </div>
                  </div>
                  {isLoading &&
                  message.sender === "ai" &&
                  index + 1 === chatMessages.length - 1 ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : (
                    <div
                      className={`chat-bubble text-white ${
                        message.sender === "ai"
                          ? "bg-stone-500"
                          : "bg-orange-500"
                      } `}
                    >
                      {message.text}
                    </div>
                  )}

                  <div className="chat-footer opacity-50">
                    Sent at {getCurrentTime()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleMessageSend}
            className="flex justify-center text-white w-full"
          >
            <input
              type="text"
              value={humanMsg}
              onChange={(e) => setHumanMsg(e.target.value)}
              placeholder="Send a Message..."
              className="input input-bordered fixed bottom-3 rounded-xl md:w-[700px] bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
