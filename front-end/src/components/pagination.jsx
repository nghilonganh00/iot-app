import { useState } from "react";

const PAGE_INDEXS = [1, 2, 3, 4, 5, 6, 7];

const Pagination = () => {
  const [selectedPageIndex, setSelectPageIndex] = useState(PAGE_INDEXS[0]);

  const handleSelectPage = (pageIndex) => {
    setSelectPageIndex(pageIndex);
  };

  const handlePreviousPage = () => {
    if(selectedPageIndex > 1) 
        setSelectPageIndex((pre) => pre - 1);
  };

  const handleNextPage = () => {
    if(selectedPageIndex < PAGE_INDEXS.length)
        setSelectPageIndex((pre) => pre + 1);
  };

  return (
    <nav className="mt-2 w-full flex justify-center">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li onClick={handlePreviousPage}>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-slate-100 hover:text-gray-700 "
          >
            Previous
          </a>
        </li>

        {PAGE_INDEXS.map((pageIndex, key) => (
          <li key={key} onClick={() => handleSelectPage(pageIndex)}>
            <a
              href="#"
              className={
                "flex items-center justify-center px-4 h-10  border border-e-0 border-gray-300 " +
                (selectedPageIndex === pageIndex
                  ? "bg-[#635bff] text-white"
                  : "bg-white text-gray-500 hover:bg-slate-100 hover:text-gray-700")
              }
            >
              {pageIndex}
            </a>
          </li>
        ))}

        <li onClick={handleNextPage}>
          <a
            href="#"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
