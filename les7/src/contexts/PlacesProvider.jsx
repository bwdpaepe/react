import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';
import axios from 'axios';
import config from '../config.json';
import { useSession } from './AuthProvider';

export const PlacesContext = createContext();
export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvider = ({
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentPlace, setCurrentPlace] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const { ready: authReady } = useSession();

  const refreshPlaces = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const {
        data
      } = await axios.get(`${config.base_url}places`);
      setPlaces(data.data);
      return data.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }

  }, []);

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshPlaces();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshPlaces]);

  const createOrUpdatePlace = useCallback(async ({
    id,
    name,
    rating
  }) => {
    setError();
    setLoading(true);
    let data = {
      name,
      rating
    };
    let method = id ? 'put' : 'post';
    let url = `${config.base_url}places/${id ?? ''}`;
    try {
      const {
        changedPlace
      } = await axios({
        method,
        url,
        data,
      });
      await refreshPlaces();
      return changedPlace;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false)
    }
  }, [refreshPlaces]);

  const ratePlace = useCallback(async (id, rating) => {
    const place = places.find((p) => p.id === id);
    return await createOrUpdatePlace({ ...place, rating });
  }, [places, createOrUpdatePlace]);

  const deletePlace = useCallback(async (id) => {
    setLoading(true);
    setError();
    try {
      const {
        data
      } = await axios({
        method: 'delete',
        url: `${config.base_url}places/${id}`,
      });
      refreshPlaces();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false)
    }
  }, [refreshPlaces]);

  const value = useMemo(() => ({
    currentPlace,
    setCurrentPlace,
    places,
    error,
    loading,
    ratePlace,
    deletePlace,
    createOrUpdatePlace,
  }), [places, error, loading, setCurrentPlace, ratePlace, deletePlace, currentPlace, createOrUpdatePlace])

  return (
    <PlacesContext.Provider value={value}>
      {children}
    </PlacesContext.Provider>
  );
};
