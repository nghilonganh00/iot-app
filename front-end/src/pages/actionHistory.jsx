import { Filter, Search } from "lucide-react";
import FilterTimeDropdown from "../components/filterDropdown";
import { useState } from "react";
import Pagination from "../components/pagination";
import FilterDropdown from "../components/filterDropdown";

const DATA_SENSORS = [
  {
    device: "Fan",
    action: "Turn On",
    time: "10:01:00 20/08/2024",
  },
  {
    device: "Air Conditioner",
    action: "Turn Off",
    time: "10:05:00 20/08/2024",
  },
  {
    device: "Light",
    action: "Turn On",
    time: "10:05:00 20/08/2024",
  },
  {
    device: "Fan",
    action: "Turn On",
    time: "10:01:00 20/08/2024",
  },
  {
    device: "Air Conditioner",
    action: "Turn Off",
    time: "10:05:00 20/08/2024",
  },
  {
    device: "Light",
    action: "Turn On",
    time: "10:05:00 20/08/2024",
  },
  {
    device: "Fan",
    action: "Turn On",
    time: "10:01:00 20/08/2024",
  },
  {
    device: "Air Conditioner",
    action: "Turn Off",
    time: "10:05:00 20/08/2024",
  },
  {
    device: "Light",
    action: "Turn On",
    time: "10:05:00 20/08/2024",
  },
  {
    device: "Light",
    action: "Turn On",
    time: "10:05:00 20/08/2024",
  },
];

const options = [
  { label: "All" },
  { label: "Fan" },
  { label: "Light" },
  { label: "Air Conditioner" },
];

const ActionHistory = () => {
  return (
    <div className="px-6 py-4">
      <div className="mb-4 text-2xl font-medium text-gray-800">
        Action History
      </div>

      <div className="w-full bg-white h-14 rounded-md shadow-sm flex items-center justify-between px-4 gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <div>Show</div>
          <input
            type="text"
            className=" w-[60px] font-semibold rounded-md border border-gray-600 px-2 py-1.5 text-sm"
            defaultValue={10}
          />
          <div>Entries</div>
        </div>

        <div className="flex items-center gap-2">
          <FilterDropdown options={options} />
          <div className="relative w-[300px]">
            <input
              type="text"
              className="w-full rounded-md border px-2 py-1.5 border-slate-300 text-sm"
              placeholder={"Tìm kiếm "}
            />
            <Search
              className="absolute right-2 top-2 size-4 text-slate-600"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-white border-b">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center justify-center">
                  Device
                  <a href="#">
                    <svg
                      class="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center justify-center">
                  Action
                  <a href="#">
                    <svg
                      class="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>

              <th scope="col" class="px-6 py-3">
                <div>Time</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {DATA_SENSORS.map((data, index) => (
              <tr key={index} class="bg-white border-b ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <td class="px-6 py-4 text-center">{data.device}</td>
                <td class="px-6 py-4 text-center">{data.action}</td>
                <td class="px-6 py-4 ">{data.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
};

export default ActionHistory;