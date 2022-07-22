import { IoStarSharp } from 'react-icons/io5';
import { useCallback } from 'react/cjs/react.development';

const Star = ({ index, selected = false, onSelect = (f) => f }) => {
  const handleSelect = useCallback(
    () => onSelect(index),
    [index, onSelect]
  );
  return (
    <IoStarSharp
      color={selected ? 'yellow' : 'grey'}
      className="inline-block"
      onClick={handleSelect}
    />
  );
};

export default function StarRating({ totalStars = 5, selectedStars = 0, onRate }) {

  return (
    <>
      {[...new Array(totalStars)].map((star, i) => (
        <Star key={i} selected={selectedStars > i} index={i + 1} onSelect={onRate} />
      ))}
      <p className="text-xs text-gray-700">
        {selectedStars} of {totalStars} stars
      </p>
    </>
  );
}