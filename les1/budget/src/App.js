import logo from './logo.svg';
import './App.css';
import Transaction from './components/Transaction';
import TRANSACTION_DATA from './mock-data';

function App() {
  return (
    <div className="App">
      {TRANSACTION_DATA.map((trans) => (
        <Transaction
          key = {trans.key}
          user={trans.user}
          amount = {trans.amount}
          place = {trans.place} />
      ))}
      
    </div>
  );
}

export default App;
