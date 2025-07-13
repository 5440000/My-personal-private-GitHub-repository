import React from 'react';
import Card from '../Card/Card';

interface CardListProps {
  results: Array<{ name: string; url: string }>;
}

type CardListState = Record<string, never>;

class CardList extends React.Component<CardListProps, CardListState> {
  render() {
    const { results } = this.props;

    if (!results || results.length === 0) {
      return <p className="text-gray-500">No results to display.</p>;
    }

    let displayResults: Array<{ name: string; url: string }>;
    if (Array.isArray(results)) {
      displayResults = results;
    } else if (results && typeof results === 'object' && 'name' in results) {
      displayResults = [results as { name: string; url: string }];
    } else {
      displayResults = [];
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {displayResults.map((item) => (
          <Card key={item.name} name={item.name} />
        ))}
      </div>
    );
  }
}

export default CardList;
