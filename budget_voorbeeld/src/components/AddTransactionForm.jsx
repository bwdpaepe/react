import {useState} from 'react';

export default function AddTransactionForm({places, onSaveTransaction = (f) => f}) {
  const [user, setUser] = useState('');
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState('home');
  const [amount, setAmount] = useState(0);

  const toDateInputString = (date) => {
    // (toISOString returns something like 2020-12-05T14:15:74Z,
    // date HTML5 input elements expect 2020-12-05
    //
    if (!date) return null;
    if (typeof date !== Object) {
      date = new Date(date);
    }
    let asString = date.toISOString();
    return asString.substring(0, asString.indexOf('T'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTransaction(user, place, amount, date);
    setUser('');
    setDate(new Date());
    setPlace('home');
    setAmount(0);
  };

  return (
    <form className="m-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="user">who</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="user"
            name="user"
            id="user"
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="date">when</label>
          <input
            type="date"
            value={toDateInputString(date)}
            onChange={(e) => setDate(e.target.value)}
            placeholder="date"
            name="date"
            id="date"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="place">where</label>
          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            name="place"
            id="place"
            required>
            {places.map((p, index) => (
              <option key={index} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="amount"
            name="amount"
            id="amount"
            required
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <div className="flex justify-end">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}
