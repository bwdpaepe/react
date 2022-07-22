import StarRating from "./StarRating"
import React from "react";
export default React.memo(function Place({ places = [], onRate, deleteMe }) {
  const SinglePlace = ({ id, name, rating, onRate, deleteMe }) => {
    return (
      <div className="bg-white px-4 py-5 border-2 border-gray-400 rounded m-2 text-center">
        <h2 className="mt-2 mb-2 font-bold">{name}</h2>
        <StarRating selectedStars={rating} onRate={(newRating) => onRate(id, newRating)} />
        <button
          type="button"
          onClick={() => deleteMe(id)}>DEL</button>
      </div>
    );
  };
  console.log('Render place');
  return (
    <div className="flex flex-wrap">
      {places
        .sort((a, b) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((p) => (
          <SinglePlace key={p.id} {...p} onRate={onRate} deleteMe={deleteMe} />
        ))}
    </div>

  );
}
)