import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import FilterDropdown from "../components/filterDropdown";
import DatasensorAPI from "../API/datasensorAPI";
import formatDate from "../utils/datetime";

const options = [
  { label: "All", value: "all" },
  { label: "Temperture", value: "temperature" },
  { label: "Light", value: "light" },
  { label: "Humidity", value: "humidity" },
];

const DataSensors = () => {
  const [datasensor, setDatasensor] = useState([]);

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchKey, setSearchKey] = useState(null);
  const [searchType, setSearchType] = useState(options[0]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("DESC");

  const fetchDatasensorData = async () => {
    const response = await DatasensorAPI.getAll({
      limit,
      page: currentPage,
      sortBy: sortBy,
      sortDirection: sortDirection,
      searchKey,
      searchType: searchType.value,
    });

    if (!response.ok) return;

    const responseObj = await response.json();
    const data = responseObj.data;
    setTotalPages(data.totalPages);
    setTotalRecords(data.totalRecords);
    setDatasensor(data.datasensor);
  };

  const handleChangeSort = async (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortDirection(() => (sortDirection === "DESC" ? "ASC" : "DESC"));
    } else {
      setSortBy(newSortBy);
      setSortDirection("DESC");
    }

    await fetchDatasensorData();
  };

  useEffect(() => {
    fetchDatasensorData();
  }, [currentPage, sortBy, sortDirection]);

  return (
    <div className="px-6 py-4">
      <div className="mb-4 text-2xl font-medium text-gray-800">
        Data Sensors
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
            onClick={fetchDatasensorData}
            className="bg-[#635bff] text-white font-semibold rounded-md hover:cursor-pointer px-2.5 shadow py-1.5"
          >
            Go
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FilterDropdown
            options={options}
            value={searchType}
            setValue={setSearchType}
          />
          <div className="relative w-[300px]">
            <input
              type="text"
              className="w-full rounded-md border px-2 py-1.5 border-slate-300 text-sm"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchDatasensorData();
                }
              }}
              placeholder={"Tìm kiếm "}
            />
            <Search
              className="absolute right-2 top-2 size-4 text-slate-600 hover:cursor-pointer"
              strokeWidth={1.5}
              onClick={fetchDatasensorData}
            />
          </div>
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
                className="px-6 py-3 hover:cursor-pointer"
                onClick={() => handleChangeSort("temperature")}
              >
                <div className="flex items-center justify-center">
                  Temperature
                  {sortBy === "temperature" ? (
                    sortDirection === "ASC" ? (
                      <ChevronUp className="size-5" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="size-5" strokeWidth={2.5} />
                    )
                  ) : (
                    <div className="w-5"></div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 hover:cursor-pointer"
                onClick={() => handleChangeSort("light")}
              >
                <div className="flex items-center justify-center">
                  Light
                  {sortBy === "light" ? (
                    sortDirection === "ASC" ? (
                      <ChevronUp className="size-5" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="size-5" strokeWidth={2.5} />
                    )
                  ) : (
                    <div className="w-5"></div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 hover:cursor-pointer"
                onClick={() => handleChangeSort("humidity")}
              >
                <div className="flex items-center justify-center">
                  Humidity
                  {sortBy === "humidity" ? (
                    sortDirection === "ASC" ? (
                      <ChevronUp className="size-5" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="size-5" strokeWidth={2.5} />
                    )
                  ) : (
                    <div className="w-5"></div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 hover:cursor-pointer"
                onClick={() => handleChangeSort("createdAt")}
              >
                <div className="flex items-center justify-start">
                  Time
                  {sortBy === "createdAt" ? (
                    sortDirection === "ASC" ? (
                      <ChevronUp className="size-5" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="size-5" strokeWidth={2.5} />
                    )
                  ) : (
                    <div className="w-5"></div>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {datasensor.map((data, index) => (
              <tr key={index} className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <td className="pl-6 pr-10 py-4 text-center">
                  {data.temperature}
                </td>
                <td className="pl-6 pr-10 py-4 text-center">{data.light}</td>
                <td className="pl-6 pr-10 py-4 text-center">{data.humidity}</td>
                <td className="pl-6 pr-10 py-4 ">
                  {formatDate(data.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRecords={totalRecords}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DataSensors;
