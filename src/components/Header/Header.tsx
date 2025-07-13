import React from 'react';
import Search from '../Search/Search';

class Header extends React.Component<
  Record<string, never>,
  Record<string, never>
> {
  render() {
    return (
      <header className="bg-blue-600 text-white p-4 rounded-md shadow-md mb-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Application Header</h1>
        <Search />
      </header>
    );
  }
}

export default Header;
