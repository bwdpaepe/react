import StarRating from "./StarRating";

const Place = ({ id, name, rating, onRate }) => {
  return (
    <div className="col-4 p-5">
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            {name}
          </div>
          <div className="card-text">
            <StarRating totalStars={5} selectedStars={rating} onRate={(newRating) => onRate(id, newRating)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Places({ places = [], onRate }) {
  console.log('Render places');
  return (
    <div className="row gy-5">
      {
        places.sort((a, b) =>
          a.name.toUpperCase().localeCompare(b.name.toUpperCase())
        )
          .map((p) => (
            <Place key={p.id} {...p} onRate={onRate} />
          )
          )
      }
    </div>
  );
}