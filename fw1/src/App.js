import { useState, useMemo, useCallback } from 'react';
import './App.css';
import Transaction from './components/Transaction';
import { TRANSACTION_DATA, PLACE_DATA } from './mock-data';
import Places from './components/Places';
import AddTransactionForm from './components/AddTransactionForm';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [transactions, setTransactions] = useState(TRANSACTION_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const createTransaction = (user, place, amount, date) => {
    const newTransactions = [
      { user, place, amount, date: new Date(date), },
      ...transactions
    ];
    setTransactions(newTransactions);
  };
  const ratePlace = useCallback((id, rating) => {
    const newPlaces = places.map(
      (p) => (p.id === id ? { ...p, rating } : p)
    );
    setPlaces(newPlaces);
  }, [places]
  );
  const filteredTransactions = useMemo(() => transactions.filter((trans) => {
    console.log("filtering...");
    return trans.place.toLowerCase().includes(search.toLowerCase());
  }
  ), [transactions, search]
  );
  console.log('Render app');
  return (
    <div className="App container">
      <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
      <div className="m-5 flex">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="flex-1" placeholder="search" />
        <button type="button" onClick={() => setSearch(text)}>Search</button>
      </div>
      {filteredTransactions.map((t, i) =>
        <Transaction user={t.user} amount={t.amount} date={t.date} place={t.place} key={i} />
      )}
      <Places places={places} onRate={ratePlace} />
    </div>
  );
}

export default App;
