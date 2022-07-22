import './App.css';
import {useState} from 'react';
import {TRANSACTION_DATA, PLACE_DATA} from './mock-data';
import Transaction from './components/Transaction';
import Places from './components/Places';
import AddTransactionForm from './components/AddTransactionForm';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [transactions, setTransactions] = useState(TRANSACTION_DATA);

  const ratePlace = (id, rating) => {
    const newPlaces = places.map((p) => (p.id === id ? {...p, rating} : p));
    setPlaces(newPlaces);
  };

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
  };
  return (
    <div className="App">
      <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
      {transactions.map((trans, index) => (
        <Transaction {...trans} key={index} />
      ))}
      <Places places={places} onRate={ratePlace} />
    </div>
  );
}

export default App;
