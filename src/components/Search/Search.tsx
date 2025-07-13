import React from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('lastSearchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  executeSearch = () => {
    const processedSearchTerm = this.state.searchTerm.trim();
    localStorage.setItem('lastSearchTerm', processedSearchTerm);
    this.props.onSearch(processedSearchTerm);
  };

  handleSearchClick = () => {
    this.executeSearch();
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.executeSearch();
    }
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="flex items-center space-x-2 p-4 bg-white rounded-md shadow-md">
        <input
          type="text"
          placeholder="Enter search term..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          value={searchTerm}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50"
          onClick={this.handleSearchClick}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
