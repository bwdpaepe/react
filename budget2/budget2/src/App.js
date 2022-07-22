import './App.css';
import Place from './components/Place';
import Transaction from './components/Transaction';
import { TRANSACTION_DATA, PLACE_DATA } from './mock-data';
import { useCallback, useMemo, useState } from "react";
import AddTransactionForm from './components/AddTransactionForm';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [transactions, setTransactions] = useState(TRANSACTION_DATA);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const filteredTransactions = useMemo(() => transactions.filter((t) => {
    console.log("filtering...");
    return t.place.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  }), [transactions, search]);

  const createTransaction = (user, place, amount, date) => {
    const newTransactions = [
      {
        user, place, amount, date: new Date(date),
      },
      ...transactions,
    ];
    setTransactions(newTransactions);
  };

  const ratePlace = useCallback((id, rating) => {
    const newPlaces = places.map((p) => (
      p.id === id ? { ...p, rating } : p
    ))
    setPlaces(newPlaces)
  }, [places]);
  const deletePlace = (id) => {
    const newPlaces = places.filter((p) => (
      p.id !== id
    ))
    setPlaces(newPlaces)
  };
  console.log('Render app');
  return (
    <div className="App">
      <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
      <div className="m-5 flex">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="flex-1" placeholder="search" />
        <button type="button" onClick={() => setSearch(text)}>Search</button>
      </div>
      {filteredTransactions.map((trans) =>
        <Transaction key={trans.user + trans.date} user={trans.user} amount={trans.amount} place={trans.place} />
      )}
      <Place places={places} onRate={ratePlace} deleteMe={deletePlace} />
    </div>
  );
}

export default App;
