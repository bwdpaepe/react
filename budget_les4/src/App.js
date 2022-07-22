import './App.css';
import { TransactionsProvider } from './context/TransactionsProvider';
import { useState, useMemo, useCallback, createContext } from 'react';
import { PLACE_DATA } from './mock-data';
import Transactions from './components/Transaction';
import Places from './components/Places';
import AddTransactionForm from './components/AddTransactionForm';
import axios from 'axios';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const newTransaction = {
    name: 'test',
    placeId: '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
    amount: 200,
    date: '2021-10-14',
    user: 'Benjamin',
  };
  const updatedTransaction = {
    name: 'test',
    placeId: '7f28c5f9-d711-4cd6-ac15-d13d71abff85',
    amount: 200,
    date: '2021-10-14',
    user: 'Benjamin',
  };

  const sendPostRequest = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/transactions', newTransaction);
      console.log(response.data);
    }
    catch (err) {
      console.error(err);
    }
  };

  const sendPutRequest = async (id) => {
    try {
      const response = await axios.put(`http://localhost:9000/api/transactions/${id}`, updatedTransaction);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendDeleteRequest = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/transactions/${id}`)
      console.log(response.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const ratePlace = useCallback(
    (id, rating) => {
      const newPlaces = places.map((p) => (p.id === id ? { ...p, rating } : p));
      setPlaces(newPlaces);
    },
    [places]
  );

  /*const createTransaction = (user, place, amount, date) => {
     const newTransactions = [
      {
        id: transactions.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1,
        user,
        place,
        amount,
        date: new Date(date),
      },
      ...transactions,
    ]; // newest first
    setTransactions(newTransactions); 
  };*/

  /* const getTransactions = async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get('http://localhost:9000/api/transactions?limit=25&offset=0', {
        headers: { 'authorization': 'Bearer YOUR_JWT_TOKEN_HERE' }
      });
      setTransactions(response.data.data);
    }
    catch (err) {
      console.log(err);
      setError(err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []); */

  return (
    <TransactionsProvider>
      <AddTransactionForm places={places} />
      <div className='m-5 flex'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='flex-1'
          placeholder='search'
        />
        <button type='button' onClick={() => setSearch(text)}>
          Search
        </button>
      </div>
      <div className='flex flex-col justify-items-end align-items-end'>
        <Transactions search={search} />
      </div>
      <Places places={places} onRate={ratePlace} />
    </TransactionsProvider>
  );
}

export default App;
