import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

const FilterDropdown = ({options}) => {
  console.log("options: ", options);
  const [selectedOption, setSelectOption] = useState(options[0]);
  const [isOpen, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectOption(option);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setOpen(!isOpen)}
        className="flex items-center justify-between gap-4 border border-slate-300 rounded-md py-1.5 px-2 hover:cursor-pointer hover:border-slate-800"
      >
        <div className="text-gray-800 font-medium text-sm min-w-16">
          {selectedOption.label}
        </div>
        <ChevronDown strokeWidth={1.5} className="size-5" />
      </div>

      {isOpen && (
        <div className="absolute top-10 shadow-2xl pt-2 bg-white z-50">
          {options.map((option, key) => (
            <div
              key={key}
              onClick={() => handleSelect(option)}
              className="flex items-center justify-between gap-5 px-3 py-3 hover:bg-slate-100 hover:cursor-pointer"
            >
              <div className="text-sm text-gray-800 min-w-24">
                {option.label}
              </div>
              {selectedOption.label === option.label && (
                <Check strokeWidth={1.5} className="text-[#635bff]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
