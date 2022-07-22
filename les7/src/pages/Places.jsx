import PlacesList from '../components/PlacesList';
import { usePlaces } from '../contexts/PlacesProvider';

export default function Places() {
  const { places } = usePlaces();
  return (
    <>
      <h1>Places</h1>

      <PlacesList places={places} />
    </>
  )
}
