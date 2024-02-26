import { GiHamburgerMenu } from "react-icons/gi";
// eslint-disable-next-line react/prop-types
const SideBar = ({ imageHandler, setDietaryRestrictions, takePhoto }) => {
  return (
    <div className="drawer lg:drawer-open relative">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}

        <label
          htmlFor="my-drawer-2"
          className="btn bg-orange-500 drawer-button lg:hidden"
        >
          <GiHamburgerMenu className="h-5 w-5" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          {/* Sidebar content here */}
          <h3 className="text-white  text-3xl">Set Your Preferences</h3>
          <div className="label mt-3">
            <span className="label-text text-white tracking-tight font-light">
              Upload or Capture Food Image
            </span>
          </div>
          <button
            className="btn bg-transparent border-orange-800 text-white mb-3"
            onClick={() => takePhoto(true)}
          >
            Snap Food Image
          </button>
          <input
            type="file"
            className="file-input file-input-bordered border-orange-800 w-full max-w-xs bg-transparent"
            onChange={imageHandler}
          />
          <div className="label mt-3">
            <span className="label-text text-white tracking-tight font-light">
              Select Your Dietary Restriction
            </span>
          </div>
          <select
            className="select select-bordered w-full max-w-xs border-orange-800 bg-transparent"
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          >
            <option value={""}>Select restriction</option>
            <option value={"Lactose Intolerant"}>Lactose Intolerant</option>
            <option value={"Gluten Intolerant"}>Gluten Intolerant</option>
            <option value={"Vegetarianism"}>Vegetarianism</option>
            <option value={"Veganism"}>Veganism</option>
            <option value={"Kosher"}>Kosher</option>
            <option value={"Keto"}>Keto</option>
            <option value={"Diabetes"}>Diabetes</option>
            <option value={"Dairy-free"}>Dairy-free</option>
            <option value={"Low carb"}>Low carb</option>
            <option value={"Food allergies"}>Food allergies</option>
          </select>
        </ul>
        <div className="absolute inset-x-0 bottom-0 h-[100px] text-white flex flex-col justify-end gap-4  pb-3">
          {/* About */}
          <div
            className="tooltip text-justify"
            data-tip="Diet Detective is your
      personal nutrition companion, leveraging advanced AI technology to
      analyze food images and provide tailored dietary recommendations
      based on your unique preferences and restrictions. Whether you're
      managing allergies, dietary restrictions, or simply striving for a
      healthier lifestyle, DietDetective helps you navigate the culinary
      landscape with confidence."
          >
            <span className="font-light">About Diet Detective</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <span className="">Some User</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
