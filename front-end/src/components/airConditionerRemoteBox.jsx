import { useState } from "react";

import OffAirConditioner from "../assets/off-air-conditioner.png";

const AirConditionerRemoteBox = () => {
  const [isOnAirConditioner, setOnAirConditioner] = useState(false);
  const [isLoading, setLoading] = useState();

  const handleToggle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOnAirConditioner(!isOnAirConditioner);
    }, 3000);
  };

  return (
    <div className="relative flex items-center h-24 bg-white rounded-lg shadow-sm gap-1">
      {isLoading && (
        <div className="z-50 absolute top-0 size-full bg-black/40 flex items-center justify-center">
          <svg
            class="animate-spin size-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      <div className="w-24 h-full flex items-center justify-center ">
        {isOnAirConditioner ? (
          <video
            width="80"
            height="80"
            preload="none"
            style={{
              background:
                "transparent url('https://cdn-icons-png.flaticon.com/512/6172/6172529.png') 50% 50% / contain no-repeat",
            }}
            autoplay="autoplay"
            loop="true"
            muted="muted"
            playsinline=""
          >
            <source
              src="https://cdn-icons-mp4.flaticon.com/512/6172/6172529.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <img src={OffAirConditioner} alt="" className="w-[63px]" />
        )}
      </div>

      <div>
        <div className="font-semibold text-gray-700 ">Air Conditioner</div>

        <label class="inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={isOnAirConditioner}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer da peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default AirConditionerRemoteBox;
