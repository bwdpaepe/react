import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PLACE_DATA } from "../mock-data";
import config from "../config.json"

const PlacesContext = createContext();
export const usePlaces = () => useContext(PlacesContext);

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshPlaces = useCallback(async () => {
    try {
      setError('');
      setLoading(true);

      const {
        data
      } = await axios.get(`${config.base_url}/places`);
      setPlaces(data.data);
    } catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }, [])

  const ratePlace = useCallback(
    async ({ id, name, rating }) => {
      try {
        setError('');
        setLoading(true);

        const {
          data: changedPlace
        } = await axios.put(`${config.base_url}/places/${id}`, { name, rating });
        await refreshPlaces();
        return changedPlace;
      } catch (error) {
        setError(error);
      }
      finally {
        setLoading(false);
      }
    },
    [refreshPlaces]
  );

  useEffect(() => {
    refreshPlaces();
  }, [refreshPlaces]);


  const value = useMemo(() => ({
    places,
    loading,
    error,
    ratePlace,
  }), [places, loading, error, ratePlace]);

  return (
    <PlacesContext.Provider value={value}>
      {children}
    </PlacesContext.Provider>
  );

};