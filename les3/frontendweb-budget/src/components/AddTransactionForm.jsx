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

  const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
    return (
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor={label}>
          {label}
        </label>
        <input
          {...register(label, validation)}
          defaultValue={defaultValue}
          placeholder={label}
          type={type}
          id={label}
          name={label}
          {...rest}
        />
        { }
      </div >
    );
  };

  const LabelSelect = ({ label, options, defaultValue, validation, ...rest }) => {
    return (
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor={label}>
          {label}
        </label>
        <select {...register(label, validation)} defaultValue={defaultValue} {...rest} id={label} name={label}>
          {options.map(value => (
            <option key={value.id} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>
        {errors[label] && <p className="text-red-500">{errors[label].message}</p>}
      </div>
    );
  };

  console.log('before rendering');
  return (
    <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-6 gap-6">
        <LabelInput
          label="user"
          type="text"
          defaultValue=""
          validation={{
            required: 'this is required',
            minLength: { value: 2, message: 'Min length is 2' }
          }} />
        <LabelInput
          label="date"
          type="date"
          defaultValue={toDateInputString(new Date())}
          validation={{ required: 'this is required' }} />
        <LabelSelect
          label="place"
          defaultValue="hogent"
          options={places}
          validation={{ required: 'This is required' }} />
        <LabelInput
          label="amount"
          type="number"
          defaultValue="0"
          validation={{
            valueAsNumber: true,
            required: 'this is required',
            min: { value: 1, message: 'min 1' },
            max: { value: 5000, message: 'max 5000' }
          }} />
        <div className="col-span-6 sm:col-span-3">
          <div className="flex justify-end">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}
