import { React } from 'react';
import { IoStarSharp } from "react-icons/io5";

const Star = ({ selected = false, onToto = (f) => f }) => (
  <IoStarSharp
    color={selected ? "yellow" : "grey"}
    className="inline-block"
    onClick={onToto}
  />)
export default function StarRating({ totalStars = 5, selectedStars = 0, onRate }) {
  return (
    <>
      {
        [...new Array(totalStars)].map((star, i) => (
          <Star
            key={i}
            selected={selectedStars > i}
            onToto={() => onRate(i + 1)} />))

      }
      <p className="text-xs text-gray-700">{selectedStars} of {totalStars} stars</p>
    </>
  )
}