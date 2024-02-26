import HomeScreen from "./screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <div className="relative h-screen w-full overflow-x-hidden">
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/food.jpg')" }}
        ></div>
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-black opacity-80"></div>
        <div className="relative">
          <HomeScreen />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
