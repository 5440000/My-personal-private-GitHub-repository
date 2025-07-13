import React from 'react';

interface CardProps {
  name: string;
  imageUrl?: string;
}

type CardState = Record<string, never>;

class Card extends React.Component<CardProps, CardState> {
  render() {
    const { name, imageUrl } = this.props;

    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-24 h-24 object-contain mb-2"
          />
        )}
        <h3 className="text-lg font-semibold capitalize text-gray-800">
          {name}
        </h3>
      </div>
    );
  }
}

export default Card;
