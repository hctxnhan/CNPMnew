import { useState } from "react";
import { TabsType } from "../utils/types/Tabs";

type NewTabsProps = {
  tabs: {
    name: string;
    data: JSX.Element;
  }[];
};

function NewTabs({ tabs }: NewTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const allTabNames = tabs.map((tab) => tab.name);
  const allTabData = tabs.map((tab) => tab.data);

  return (
    <div className="grid grid-cols-[300px_1fr] gap-6">
      <div className="flex flex-col gap-2 bg-white rounded-md px-4 py-6 shadow-md">
        {allTabNames.map((tab, index) => (
          <div
            onClick={() => setActiveTab(index)}
            key={tab}
            className={`py-2 px-3 rounded-lg cursor-pointer uppercase ${
              activeTab === index
                ? "bg-emerald-600 text-white hover:bg-emerald-600 shadow-sm"
                : "text-gray-500 hover:bg-gray-300"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div>
        {allTabData.map((tab, index) => (
          <div
            key={index}
            className={`${activeTab === index ? "block" : "hidden"}`}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewTabs;
