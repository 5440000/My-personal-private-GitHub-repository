import React from 'react';
import Search from '../Search/Search';

interface HeaderProps {
  onSearch: (term: string) => void;
}

type HeaderState = Record<string, never>;

class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    const { onSearch } = this.props;

    return (
      <header className="bg-blue-600 text-white p-4 rounded-md shadow-md mb-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Header</h1>
        <Search onSearch={onSearch} />
      </header>
    );
  }
}

export default Header;
