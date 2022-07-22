import Place from './Place';

export default function PlacesList({ places }) {
	return (
		<div className="flex flex-wrap">
			{places
				.sort((a, b) =>
					a.name.toUpperCase().localeCompare(b.name.toUpperCase())
				)
				.map((p) => (
					<Place key={p.id} {...p} />
				))}
		</div>
	);
}
