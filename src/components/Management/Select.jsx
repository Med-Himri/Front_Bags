"use client";

import { PlusCircle, Layers } from "lucide-react";

/**
 * @typedef {Object} SelectProps
 * @property {string} [AddBooking]
 * @property {string} [ShowRequests]
 * @property {string} activeTab
 * @property {(value: string) => void} onTabChange
 * @property {Record<string, any>} [key] - Additional props forwarded to the root element.
 */

const Select = ({
  AddBooking = "Create Craft",
  ShowRequests = "Catalog Overview",
  activeTab,
  onTabChange,
  ...props
}) => {
  const tabs = [
    {
      name: AddBooking,
      icon: <PlusCircle size={16} className="mr-2 text-[#D4AF37]" />,
      value: "Add Product",
    },
    {
      name: ShowRequests,
      icon: <Layers size={16} className="mr-2 text-[#D4AF37]" />,
      value: "Show Products",
    },
  ];

  return (
    <div
      {...props}
      className="w-full h-[60px] py-2 mb-6 text-[#111111] flex justify-between bg-[#F9F6F0] antialiased"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <nav className="bg-white rounded-2xl w-full shadow-sm border border-[#D4AF37]/20 backdrop-blur-sm">
          <ul className="flex w-full justify-around list-none m-0 p-0">
            {tabs.map(({ name, icon, value }) => {
              const isActive = activeTab === value;

              return (
                <li key={value} className="relative w-1/2">
                  <div
                    onClick={() => onTabChange(value)}
                    className={`flex items-center justify-center p-4 h-[60px] cursor-pointer text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "text-[#111111]"
                        : "text-[#626060] hover:text-[#111111]"
                    }`}
                  >
                    {icon}
                    <span>{name}</span>
                  </div>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Select;