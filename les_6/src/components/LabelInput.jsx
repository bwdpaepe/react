import { useFormContext } from 'react-hook-form';

const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
  const { register, errors } = useFormContext();
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
      {errors[label] && <p className="text-red-500" data-cy="labelinput_error">{errors[label].message}</p>}
    </div>
  );
};

export default LabelInput;
