import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

interface AppState {
  currentSearchTerm: string;
}

type AppProps = Record<string, never>;

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const initialSearchTerm = localStorage.getItem('lastSearchTerm') || '';
    this.state = {
      currentSearchTerm: initialSearchTerm,
    };
  }

  handleSearch = (term: string) => {
    this.setState({ currentSearchTerm: term });
  };

  render() {
    const { currentSearchTerm } = this.state;

    return (
      <div className="min-h-screen flex flex-col p-4 bg-gray-50 font-sans">
        <Header onSearch={this.handleSearch} />
        <Main searchTerm={currentSearchTerm} />
      </div>
    );
  }
}

export default App;
