import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
class App extends React.Component<
  Record<string, never>,
  Record<string, never>
> {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}
export default App;
