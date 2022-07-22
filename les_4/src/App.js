import './App.css';
import Places from './components/Places';
import AddTransactionForm from './components/AddTransactionForm';
import Transactions from './components/Transaction';
import { TransactionsProvider } from './context/TransactionsProvider';
import { PlacesProvider } from './context/PlacesProvider';



function App() {

  return (
    <TransactionsProvider>
      <PlacesProvider>
        <div className='App'>
          <AddTransactionForm />
          <Transactions />
          <Places />
        </div>
      </PlacesProvider>
    </TransactionsProvider>
  );
}

export default App;
