import React from 'react';

const TabMenu = ({ tabs, tabActive, setTabActive, handleUpdateWeather }) => {
  return (
    <div className="text-sm font-medium text-center text-neutral-500 border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px">
        {tabs.length > 0 &&
          tabs.map(({ name, key }) => (
            <li key={key} className="mr-2">
              <a
                href="#"
                className={`inline-block p-4 rounded-t-lg border-b-2 ${
                  tabActive === key
                    ? 'text-primary-300 border-primary-300'
                    : 'border-transparent hover:text-neutral-600 hover:border-neutral-300'
                } `}
                onClick={() => {
                  tabActive !== 'today' && handleUpdateWeather();
                  setTabActive(key);
                }}
              >
                {name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TabMenu;
