import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Pagination from "../components/pagination";
import FilterDropdown from "../components/filterDropdown";
import { useEffect, useState } from "react";
import UserActionAPI from "../API/useactionAPI";
import formatDate from "../utils/datetime";

const deviceOptions = [
  { label: "All", value: "all" },
  { label: "Fan", value: "fan" },
  { label: "Light", value: "light" },
  { label: "Air Conditioner", value: "air-conditioner" },
];

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Turn On", value: 1 },
  { label: "Turn Off", value: 0 },
];

const ActionHistory = () => {
  const [actionHistory, setActionHistory] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState(statusOptions[0]);
  const [searchType, setSearchType] = useState(deviceOptions[0]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("DESC");

  const fetchActionHistoryData = async () => {
    const response = await UserActionAPI.getAll({
      limit: parseInt(limit),
      page: currentPage,
      sortBy: sortBy,
      sortDirection: sortDirection,
      searchKey: searchKey.value,
      searchType: searchType.value,
    });

    if (!response.ok) return;

    const responseObj = await response.json();
    const data = responseObj.data;
    setActionHistory(data.actionHistory);
    setTotalPages(data.totalPages);
    setTotalRecords(data.totalRecords);
  };

  const handleChangeSort = async (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortDirection(() => (sortDirection === "DESC" ? "ASC" : "DESC"));
    } else {
      setSortBy(newSortBy);
      setSortDirection("DESC");
    }

    await fetchActionHistoryData();
  };

  useEffect(() => {
    fetchActionHistoryData();
  }, [currentPage]);
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
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
          <div>Entries</div>
          <div
            className="bg-[#635bff] text-white font-semibold rounded-md hover:cursor-pointer px-2.5 shadow py-1.5"
            onClick={fetchActionHistoryData}
          >
            Go
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-800">Device: </div>
          <FilterDropdown
            options={deviceOptions}
            value={searchType}
            setValue={setSearchType}
          />

          <div className="text-sm text-gray-800">Status: </div>
          <FilterDropdown
            options={statusOptions}
            value={searchKey}
            setValue={setSearchKey}
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-white border-b">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleChangeSort("device")}
              >
                <div className="flex items-center justify-center">
                  Device
                  {sortBy === "device" &&
                    (sortDirection === "ASC" ? (
                      <ChevronUp className="size-5" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="size-5" strokeWidth={2.5} />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleChangeSort("status")}
              >
                <div className="flex items-center justify-center">
                  Status
                  {sortBy === "status" &&
                    (sortDirection === "ASC" ? (
                      <ChevronUp className="size-5" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="size-5" strokeWidth={2.5} />
                    ))}
                </div>
              </th>

              <th
                scope="col"
                className="px-6 py-3"
                onClick={() => handleChangeSort("createdAt")}
              >
                <div className="flex items-center justify-start">
                  Time
                  {sortBy === "createdAt" &&
                    (sortDirection === "ASC" ? (
                      <ChevronUp className="size-5" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="size-5" strokeWidth={2.5} />
                    ))}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {actionHistory.map((data, index) => (
              <tr key={index} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4 text-center w-40">
                  {
                    deviceOptions.find((option) => option.value === data.device)
                      .label
                  }
                </td>
                <td className="px-6 py-4 text-center">
                  {data.status ? "Turn On" : "Turn Off"}
                </td>
                <td className="px-6 py-4 ">{formatDate(data.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
      />
    </div>
  );
};

export default ActionHistory;
