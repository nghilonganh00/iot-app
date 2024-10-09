import { useEffect, useState } from "react";
import { PiFanLight } from "react-icons/pi";
import UserActionAPI from "../API/useactionAPI";

const FanRemoteBox = ({ deviceStatus }) => {
  const [isOnFan, setOnFan] = useState(false);

  const [isLoading, setLoading] = useState();

  const handleToggle = async () => {
    setLoading(true);

    const status = isOnFan ? "OFF" : "ON";

    try {
      const response = await UserActionAPI.toggle({
        device: "fan",
        status: status,
      });

      if (response.ok) {
        setOnFan(!isOnFan);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOnFan(() => deviceStatus["fan"] === "ON");
  }, [deviceStatus]);

  return (
    <div className="relative flex items-center h-24 bg-white rounded-lg shadow-sm gap-1">
      {isLoading && (
        <div className="z-50 absolute top-0 size-full bg-black/40 flex items-center justify-center">
          <svg
            className="animate-spin size-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      <div className="w-24 h-full flex items-center justify-center">
        <PiFanLight
          className={"size-14 " + (isOnFan ? "animate-spin-slow" : "")}
        />
      </div>

      <div>
        <div className="font-semibold text-gray-700 ">Fan</div>

        <label className="inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={isOnFan}
            onChange={handleToggle}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer da peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default FanRemoteBox;
