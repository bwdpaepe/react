import './App.css';
import Transaction from './components/Transaction';
import {
	PLACE_DATA,
	TRANSACTION_DATA
} from './mock-data';
import Places from './components/Places';
import {
	useState
} from 'react';
import AddTransactionForm from './components/AddTransactionForm';

function App() {
	const [places, setPlaces] = useState(PLACE_DATA);
	const [transactions, setTransactions] = useState(TRANSACTION_DATA);
	const ratePlace = (id, rating) => {
		const newPlaces = places.map((p) => p.id === id ? {
			...p,
			rating
		} : p);
		setPlaces(newPlaces);
	}
	const deletePlace = (id) => {
		const newPlaces = places.filter((p) => p.id !== id);
		setPlaces(newPlaces);
	}
	const createTransaction = (user, place, amount, date) => {
		const newTransactions = [{
				id: transactions.reduce((max, t) => t.id > max ? t.id : max, 0) + 1,
				user,
				place,
				amount,
				date,
			},
			...transactions,
		];
		setTransactions(newTransactions);
	}
	return ( <
		div className = "App" > {
			transactions.map(trans =>
				<
				Transaction user = {
					trans.user
				}
				place = {
					trans.place
				}
				amount = {
					trans.amount
				}
				/>)
			} <
			Places places = {
				places
			}
			onRate = {
				ratePlace
			}
			onDelete = {
				deletePlace
			}
			/> <
			AddTransactionForm places = {
				places
			}
			onSaveTransaction = {
				createTransaction
			}
			/>   <
			/div>
		);
	}

	export default App;