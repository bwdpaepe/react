import React from 'react';
import { useCallback } from 'react/cjs/react.development';
import { usePlaces } from '../context/PlacesProvider';
import StarRating from './StarRating';

const Place = ({ id, name, rating, onRate }) => {
  const handleRate = useCallback(
    (newRating) => onRate({ id, rating: newRating, name }), [id, name, onRate]
  );
  return (
    <div className="bg-white px-4 py-5 border-2 border-gray-400 rounded m-2 text-center">
      <h2 className="mt-2 mb-2 font-bold">{name}</h2>
      <StarRating selectedStars={rating} onRate={handleRate} />
    </div>
  );
};

export default React.memo(function Places() {
  const { places, ratePlace } = usePlaces();
  return (
    <div className="flex flex-wrap">
      {places
        .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((p) => (
          <Place key={p.id} {...p} onRate={ratePlace} />
        ))}
    </div>
  );
})
