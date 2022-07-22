import './App.css';
import { useCallback, useMemo, useState } from 'react';
import { TRANSACTION_DATA, PLACE_DATA } from './mock-data';
import Transaction from './components/Transaction';
import Places from './components/Places';
import AddTransactionForm from './components/AddTransactionForm';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [transactions, setTransactions] = useState(TRANSACTION_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const ratePlace = useCallback((id, rating) => {
    const newPlaces = places.map((p) => (p.id === id ? { ...p, rating } : p));
    setPlaces(newPlaces);
  }
    , [places]);

  const createTransaction = (user, place, amount, date) => {
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
    console.log(transactions);
    console.log(newTransactions);
  };

  const filteredTransactions = useMemo(() => transactions.filter((trans) => {
    console.log("filtering...");
    return trans.place.toLowerCase().includes(search.toLowerCase());
  })
    , [transactions, search]);

  console.log('Render app');
  return (
    <div className="App">
      <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
      <div className="m-5 flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1"
          placeholder="search" />
        <button
          type="button"
          onClick={() => setSearch(text)}>Search</button>
      </div>
      {filteredTransactions.map((trans, index) => (
        <Transaction {...trans} key={index} />
      ))}
      <Places places={places} onRate={ratePlace} />
    </div>
  );
}

export default App;
