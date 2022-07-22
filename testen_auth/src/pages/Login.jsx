import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router';
import LabelInput from '../components/LabelInput';
import { useLogin, useSession } from '../contexts/AuthProvider';

const validationRules = {
  email: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Login() {
  const history = useHistory();
  const { loading, error, isAuthed } = useSession();
  const login = useLogin();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
  } = methods;

  const handleLogin = useCallback(async ({ email, password }) => {
    const success = await login(email, password);

    if (success) {
      // we can't come back to login
      history.replace('/');
    }
  }, [history, login]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  if (isAuthed) {
    return <Redirect from="/login" to="/" />
  }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-1/4">
        <h1>Sign in</h1>
        <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleLogin)}>
          {
            error ? (
              <p className="text-red-500">
                {error}
              </p>
            ) : null
          }
          <LabelInput
            label="email"
            type="text"
            data-cy="email_input"
            defaultValue=""
            placeholder="your@email.com"
            validation={validationRules.email} />

          <LabelInput
            label="password"
            type="password"
            data-cy="password_input"
            defaultValue=""
            validation={validationRules.password} />

          <div className="flex flex-row justify-end">
            <button type="submit" disabled={loading} className="disabled:opacity-50" data-cy="submit_btn">
              Sign in
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
