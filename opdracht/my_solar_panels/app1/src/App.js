import './App.css';
import Production from './components/Production';
import { PRODUCTIONS } from './mock-data';

function App() {
  return (
    <div className="App">
      <Production productionData={PRODUCTIONS} />
    </div>
  );
}

export default App;
