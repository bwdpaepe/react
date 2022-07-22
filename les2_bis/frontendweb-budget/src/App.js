import './App.css';
import Places from './components/Places';
import Transaction from './components/Transaction';
import { TRANSACTION_DATA, PLACE_DATA } from './mock-data';
import { useState } from "react";
import AddTransactionForm from './components/AddTransactionForm';

function App() {
	const [places, setPlaces] = useState(PLACE_DATA);
	const [transactions, setTransactions] = useState(TRANSACTION_DATA);
	const ratePlace = (id, rating) => {
		const newPlaces = places.map((p) => (p.id === id ? { ...p, rating } : p));
		setPlaces(newPlaces);
	};

	const createTransaction = (user, place, amount, date) => {
		const newTransactions = [
			{
				user, place, amount, date: new Date(date),
			},
			...transactions,
		];
	};
	return (
		<div className="App">
			<AddTransactionForm places={places} onSaveTransaction={createTransaction}/>
			{transactions.map(trans =>
				<Transaction key={trans.key} user={trans.user} place={trans.place} amount={trans.amount} />)
			}
			<Places places={places} onRate={ratePlace} />
		</div>
	);
}

export default App;

