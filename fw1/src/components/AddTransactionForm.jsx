import { useEffect } from "react";
import { useForm } from 'react-hook-form';

export default function AddTransactionForm({ places, onSaveTransaction = (f) => f }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
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
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    const { user, place, amount, date } = data;
    onSaveTransaction(user, place, parseInt(amount), date);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label htmlFor="user">who</label>
        <input
          {...register('user',
            { required: 'user is required', minLength: { value: 2, message: 'Min length is 2' } })}
          defaultValue=''
          type="text"
          placeholder="user"
          name="user"
          id="user"
          required
        />
        {errors.user && <p className="text-danger">{errors.user.message}</p>}
      </fieldset>
      <fieldset>
        <label htmlFor="date">when</label>
        <input
          {...register('date')}
          defaultValue=''
          type="date"
          placeholder="date"
          name="date"
          id="date"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="place">where</label>
        <select
          {...register('place')}
          defaultValue=''
          name="place"
          id="place"
          required>
          {places.map((p, index) => (
            <option key={index} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="amount">amount</label>
        <input
          {...register('amount')}
          defaultValue=''
          type="number"
          placeholder="amount"
          name="amount"
          id="amount"
          required />
      </fieldset>
      <button type="submit">Save</button>
    </form>
  );
}