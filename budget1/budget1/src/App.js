import { useState } from 'react';
import './App.css';
import AddTransactionForm from './components/AddTransactionForm';
import Place from './components/Place';
import Transaction from './components/Transaction';
import { TRANSACTION_DATA, PLACE_DATA } from './mock-data';

function App() {
  const [places, setPlaces] = useState(PLACE_DATA);
  const [transactions, setTransactions] = useState(TRANSACTION_DATA);
  const createTransaction = (user, place, amount, date) => {
    const newTransactions = [
      {
        user, place, amount, date: new Date(date),
      },
      ...transactions,
    ];
    setTransactions(newTransactions);
  };
  const ratePlace = (id, rating) => {
    const newPlace = places.map((p) => (p.id === id ? { ...p, rating } : p));
    setPlaces(newPlace);
  };
  const verwijderPlaats = (id) => {
    const newPlace = places.filter((p) => (p.id !== id));
    setPlaces(newPlace);
  }
  return (
    <div className="App">
      <AddTransactionForm places={places} onSaveTransaction={createTransaction} />
      {
        transactions.map((trans, index) =>
          <Transaction key={index} wie={trans.wie} bedrag={trans.bedrag} waar={trans.waar} />

        )

      }
      <Place places={places} onRate={ratePlace} foetsie={verwijderPlaats} />
    </div>
  );
}

export default App;
