import React from 'react';
import '../../index.css';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

interface MainProps {
  searchTerm: string;
}

interface MainState {
  data: PokemonApiResponse | null;
  isLoading: boolean;
  error: string | null;
}

class Main extends React.Component<MainProps, MainState> {
  private loadingTimer: number | undefined;

  constructor(props: MainProps) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: MainProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.fetchData(this.props.searchTerm);
    }
  }

  componentWillUnmount() {
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer);
    }
  }

  fetchData = async (searchTerm: string) => {
    this.setState({ isLoading: true, error: null });

    let apiUrl = '';
    if (searchTerm === '' || searchTerm === null) {
      apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
    } else {
      apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    }

    const startTime = Date.now();

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `Pokemon "${searchTerm}" not found. Please try another name.`
          );
        }
        throw new Error(`Error: ${response.status} (${response.statusText})`);
      }

      const jsonData: PokemonApiResponse = await response.json();

      const elapsedTime = Date.now() - startTime;
      const minLoadingDuration = 1500;
      const timeToWait = minLoadingDuration - elapsedTime;

      if (timeToWait > 0) {
        this.loadingTimer = setTimeout(() => {
          this.setState({ data: jsonData, isLoading: false });
        }, timeToWait) as unknown as number;
      } else {
        this.setState({ data: jsonData, isLoading: false });
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = `Fetch Error: ${error.message}`;
      } else if (typeof error === 'string') {
        errorMessage = `Fetch Error: ${error}`;
      }

      const elapsedTime = Date.now() - startTime;
      const minLoadingDuration = 1500;
      const timeToWait = minLoadingDuration - elapsedTime;

      if (timeToWait > 0) {
        this.loadingTimer = setTimeout(() => {
          this.setState({
            data: null,
            isLoading: false,
            error: errorMessage,
          });
        }, timeToWait) as unknown as number;
      } else {
        this.setState({
          data: null,
          isLoading: false,
          error: errorMessage,
        });
      }
    }
  };

  render() {
    const { data, isLoading, error } = this.state;

    return (
      <main className="bg-gray-100 p-4 rounded-md shadow-md flex-grow">
        <h2 className="text-xl font-semibold mb-2">Main Content Area</h2>
        {isLoading && (
          <p className="text-blue-600 font-medium">Loading results...</p>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!isLoading && !error && data && (
          <div>
            <h3 className="text-lg font-medium mb-2">Fetched Data:</h3>
            <pre className="bg-gray-200 p-2 rounded-md overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {!isLoading && !error && !data && (
          <p className="text-gray-500">
            No data fetched yet. (This may happen if the initial fetch fails or
            if a search yields no results)
          </p>
        )}
      </main>
    );
  }
}

export default Main;
