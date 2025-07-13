import React from 'react';

type SearchProps = Record<string, never>;
type SearchState = Record<string, never>;

class Search extends React.Component<SearchProps, SearchState> {
  render() {
    return (
      <div className="flex items-center space-x-2 p-4 bg-white rounded-md shadow-md">
        <input
          type="text"
          placeholder="Enter search term..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" // Добавили text-gray-900 для черного текста
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50" // bg-blue-800 для темной кнопки, hover:bg-blue-900 для еще темнее при наведении
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
