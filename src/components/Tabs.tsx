import { useState } from 'react';

type TabsProps = {
  tabs: string[];
  data: JSX.Element[];
};

function Tabs({ tabs, data }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className='grid grid-cols-[250px_1fr] gap-6'>
      <div className='flex flex-col gap-2'>
        {tabs.map((tab, index) => (
          <div
            onClick={() => setActiveTab(index)}
            key={tab}
            className={`py-2 px-3 rounded-lg cursor-pointer ${
              activeTab === index
                ? 'bg-emerald-600 text-white hover:bg-emerald-600 shadow-sm'
                : 'text-gray-500 hover:bg-gray-300'
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div>
        {data.map((tab, index) => (
          <div
            key={index}
            className={`${activeTab === index ? 'block' : 'hidden'}`}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
