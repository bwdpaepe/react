import { useState } from "react";

export default function AddTransactionForm({ places, onSaveTransaction = (f) => f }) {
  const [user, setUser] = useState('');
  const [date, setDate] = useState(new Date());
  const [place, setPlace] = useState('home');
  const [amount, setAmount] = useState(0);

  const toDateInputString = (date) => {
    if (!date) return null;
    if (typeof date !== Object) {
      date = new Date(date);
    }
    let asString = date.toISOString();
    return asString.substring(0, asString.index('T'));
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
    <form onSubmit={handleSubmit} className='m-5'>
      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='user'>who</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            type='text'
            placeholder='user'
            name='user'
            id='user'
            required />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='date'>when</label>
          <input
            value={toDateInputString(date)}
            onChange={(e) => setDate(e.target.value)}
            type='date'
            placeholder='date'
            name='date'
            id='date' />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='place'>where</label>
          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            name='place'
            id='place'
            required>
            {places.map((p, index) => (
              <option key={index} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label htmlFor='amount'>amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type='number'
            placeholder='amount'
            name='amount'
            id='amount'
            required />
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <div className='flex justify-end'>
            <button type='submit'>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}