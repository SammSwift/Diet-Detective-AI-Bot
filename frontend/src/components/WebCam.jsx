import Webcam from "react-webcam";
import { useRef, useCallback } from "react";

const WebCam = ({ setImageSrc, setTakePhoto, setImage, uploadFoodImage }) => {
  const webcamRef = useRef(null);

  // create a capture function
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setTakePhoto(false);

    const base64Image = imageSrc.split(",")[1]; // Remove data:image/png;base64,
    // Convert base64 to Blob
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    // Construct File object
    const file = new File([blob], "captured-image.png", {
      type: "image/png",
      lastModified: Date.now(),
    });

    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadFoodImage(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.error(error?.data?.message || error.error);
    }
  }, [webcamRef]);

  return (
    <>
      <Webcam height={500} width={500} ref={webcamRef} className="relative" />

      <button
        onClick={capture}
        className="absolute -bottom-5 inset-x-0 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 text-white"
      >
        Capture Food Image
      </button>
    </>
  );
};

export default WebCam;
