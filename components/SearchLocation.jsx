import React from 'react';

const SearchLocation = ({ currentLocation, setCurrentLocation, handleSearchLocation }) => {
  return (
    <div className="w-full flex item-center justify-center">
      <input
        id="location"
        type="search"
        value={currentLocation}
        placeholder="Search city"
        onChange={(e) => setCurrentLocation(e.target.value)}
        className="w-full py-1 px-3 text-neutral-600 tracking-wider border border-neutral-400 rounded-l-md"
      />
      <button
        onClick={() => handleSearchLocation()}
        className="w-14 flex items-center justify-center text-white bg-primary-300 rounded-r-md hover:bg-primary-400 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchLocation;
