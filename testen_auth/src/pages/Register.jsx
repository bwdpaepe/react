import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router';
import LabelInput from '../components/LabelInput';
import { useRegister, useSession } from '../contexts/AuthProvider';

export default function Register() {
  const history = useHistory();
  const { loading, error, isAuthed } = useSession();
  const register = useRegister();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
    getValues,
  } = methods;

  const handleRegister = useCallback(async ({ name, email, password }) => {
    const success = await register({
      name,
      email,
      password,
    })

    if (success) {
      // we can't come back to register
      history.replace('/');
    }
  }, [history, register]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const validationRules = useMemo(() => ({
    name: {
      required: true
    },
    email: {
      required: true
    },
    password: {
      required: true
    },
    confirmPassword: {
      required: true,
      validate: {
        notIdentical: value => {
          const password = getValues('password');
          return password === value ? null : 'Both passwords need to be identical';
        }
      }
    },
  }), [getValues]);

  if (isAuthed) {
    return <Redirect from="/register" to="/" />
  }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-1/4">
        <h1>Register</h1>
        <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleRegister)}>
          {
            error ? (
              <p className="text-red-500">
                {JSON.stringify(error)}
              </p>
            ) : null
          }
          <LabelInput
            label="name"
            type="text"
            defaultValue=""
            placeholder="Your Name"
            validation={validationRules.name} />

          <LabelInput
            label="email"
            type="email"
            defaultValue=""
            placeholder="your@email.com"
            validation={validationRules.email} />

          <LabelInput
            label="password"
            type="password"
            defaultValue=""
            validation={validationRules.password} />

          <LabelInput
            label="confirmPassword"
            type="password"
            defaultValue=""
            validation={validationRules.confirmPassword} />

          <div className="flex flex-row justify-end">
            <button type="submit" disabled={loading} className="disabled:opacity-50">
              Register
            </button>

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
