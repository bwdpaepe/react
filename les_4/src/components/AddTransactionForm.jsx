import { useContext, useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useCallback } from 'react/cjs/react.development';
import { TransactionContext } from '../context/TransactionsProvider';
import { usePlaces } from '../context/PlacesProvider';

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

const validationRules = {
  user: {
    required: 'this is required',
    minLength: { value: 2, message: 'Min length is 2' },
  },
  date: { required: 'this is required' },
  place: { required: 'This is required' },
  amount: {
    valueAsNumber: true,
    required: 'this is required',
    min: { value: 1, message: 'min 1' },
    max: { value: 5000, message: 'max 5000' },
  }
}

const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={label}>{label}</label>
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
        id={label}
        name={label}
        {...rest}
      />
      {errors[label] && <p className="text-red-500">{errors[label].message}</p>}
    </div>
  );
};

const LabelSelect = ({ label, options, defaultValue, validation, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={label}>{label}</label>
      <select
        {...register(label, validation)}
        defaultValue={defaultValue}
        {...rest}
        id={label}
        name={label}>
        {options.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
      {errors[label] && <p className="text-red-500">{errors[label].message}</p>}
    </div>
  );
};

export default function AddTransactionForm() {
  const { currentTransaction, setTransactionToUpdate, createOrUpdateTransaction } = useContext(TransactionContext);
  const { places } = usePlaces();
  const methods = useForm();
  const { reset, setValue, handleSubmit } = methods;

  useEffect(() => {
    if (
      currentTransaction &&
      (Object.keys(currentTransaction).length !== 0 ||
        currentTransaction.constructor !== Object)
    ) {
      const dateAsString = toDateInputString(new Date(currentTransaction.date));
      setValue('date', dateAsString);
      setValue('user', currentTransaction.user.name);
      setValue('place', currentTransaction.place.id);
      setValue('amount', currentTransaction.amount);
    }
    else {
      reset();
    }
  }, [currentTransaction, reset, setValue]);

  const onSubmit = useCallback(async (data) => {
    console.log(JSON.stringify(data));
    const { user, place, amount, date } = data;
    await createOrUpdateTransaction(
      {
        id: currentTransaction?.id,
        user,
        placeId: place,
        date,
        amount: parseInt(amount),
      }
    );
    reset();
  }, [createOrUpdateTransaction, reset, currentTransaction?.id]);

  const cancel = useCallback(() => {
    setTransactionToUpdate(null);
  }, [setTransactionToUpdate]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="m-5">
        <div className="grid grid-cols-6 gap-6">
          <LabelInput
            label="user"
            type="text"
            defaultValue=""
            validation={validationRules.user}
          />
          <LabelInput
            label="date"
            type="date"
            defaultValue={toDateInputString(new Date())}
            validation={validationRules.date}
          />
          <LabelSelect
            label="place"
            defaultValue="hogent"
            options={places}
            validation={validationRules.place}
          />
          <LabelInput
            label="amount"
            type="number"
            defaultValue="0"
            validation={validationRules.amount}
          />

          <div className="col-span-6 sm:col-span-3">
            <div className="flex justify-end">
              <button type="submit">
                {currentTransaction?.id ? 'Save Transaction' : 'Add Transaction'}
              </button>
              {currentTransaction?.id ? (
                <button onClick={cancel}>
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
