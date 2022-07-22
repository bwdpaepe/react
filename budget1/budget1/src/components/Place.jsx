import React from "react";
import StarRating from "./StarRating"
const SinglePlace = ({ id, name, rating, onRate, foetsie }) => {
  return (
    <div className="bg-white px-4 py-5 border-2 border-gray-400 rounded m-2 text-center">
      <h2 className="mt-2 mb-2 font-bold">{name}</h2>
      <StarRating
        selectedStars={rating}
        onRate={(newRating) => (onRate(id, newRating))} />
      <button
        className="border-8"
        type="submit"
        value="delete"
        onClick={() => foetsie(id)}>DEL</button>
    </div>
  );
};

export default function Place({ places = [], onRate, foetsie }) {

  return (
    <div>
      {places
        .sort((a, b) => (a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        )
        .map((p) => (<SinglePlace key={p.id} {...p} onRate={onRate} foetsie={foetsie} />)
        )}
    </div>);
}