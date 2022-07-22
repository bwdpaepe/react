import { IoTrash } from 'react-icons/io5';
import StarRating from './StarRating';

const Place = ({ id, name, rating, onRate, onDelete }) => {
  return (
    <div className="bg-white px-4 py-5 border-2 border-gray-400 rounded m-2 text-center">
      <h2 className="mt-2 mb-2 font-bold">{name}</h2>
      <StarRating
        selectedStars={rating}
        onRate={(newRating) => onRate(id, newRating)} />
      onDelete={() => onDelete(id)}
      <button
        type="button"
        className="mt-2 flex items-center"
        onClick={() => onDelete(id)}>
        <IoTrash className="mr-2" /> Delete
      </button>
    </div>
  );
};

export default function Places({ places = [], onRate, onDelete }) {
  return (
    <div className="flex flex-wrap">
      {places
        .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((p, i) => (
          <Place key={p.id} {...p} onRate={onRate} onDelete={onDelete} />
        ))}
    </div>
  );
}
