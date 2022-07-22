import { IoStarSharp } from 'react-icons/io5';

const Star = ({ selected = false, onSelectStar = (f) => f }) => (
  <IoStarSharp
    color={selected ? "yellow" : "grey"}
    className="d-inline-block"
    onClick={onSelectStar}
  />
);

export default function StarRating({ totalStars = 5, selectedStars = 0, onRate }) {
  return (
    <>
      {[...new Array(totalStars)].map((star, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelectStar={() => onRate(i + 1)}
        />
      ))}
      <p className='display-6 secondary'>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}