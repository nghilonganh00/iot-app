import React, { useEffect, useState } from "react";

import OnWarning from "../assets/alert_on.png";
import OffWarning from "../assets/alert_off.png";
import UserActionAPI from "../API/useactionAPI";

const WarningRemoteBox = ({ deviceStatus, isWarning, setWarning }) => {
  const [isOnLight, setOnLigh] = useState(false);
  const [isWarningLight, setWarningLight] = useState(null);
  const [isLoading, setLoading] = useState();

  const handleToggle = async () => {
    setLoading(true);

    const status = isOnLight ? "OFF" : "ON";

    try {
      const response = await UserActionAPI.toggle({
        device: "wind",
        status: status,
      });

      if (response.ok) {
        setOnLigh(!isOnLight);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOnLigh(deviceStatus["wind"] === "ON");
  }, [deviceStatus]);

  useEffect(() => {
    let blinkInterval;

    const blinkLight = async () => {
      for (let i = 0; i < 4; i++) {
        setWarningLight(false);
        await new Promise((resolve) => setTimeout(resolve, 250));
        setWarningLight(true);
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    };

    const handleBlinking = async () => {
      if (isWarning) {
        await blinkLight();
      }
      setWarning(null);
    };

    handleBlinking();

    console.log("isWarning", isWarning);

    return () => {
      if (blinkInterval) clearInterval(blinkInterval);
    };
  }, [isWarning]);

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
        <img
          src={
            isWarning
              ? isWarningLight
                ? OnWarning
                : OffWarning
              : isOnLight
              ? OnWarning
              : OffWarning
          }
          alt="on-light"
          className="size-14"
        />
      </div>

      <div>
        <div className="font-semibold text-gray-700 ">Wind</div>

        <label className="inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isOnLight}
            onChange={handleToggle}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer da peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};

export default WarningRemoteBox;
