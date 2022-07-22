import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useCallback } from "react/cjs/react.development";
import LabelInput from '../components/LabelInput';
import { useLogin, useSession } from "../contexts/AuthProvider";

const validationRules = {
  email: {
    required: true,
  },
  password: {
    required: true,
  }
};

export default function LoginForm() {
  const login = useLogin();
  const history = useHistory();
  const { loading, error, isAuthed } = useSession();
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isAuthed) {
      history.replace('/');
    }
  }, [isAuthed, history]);

  const handleLogin = useCallback(async ({ email, password }) => {
    const success = await login(email, password);

    if (success) {
      history.replace('/');
    }
  }, [login, history]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);
  return (
    <FormProvider {...methods}>
      <div className="w-1/4 mx-auto">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="grid grid-cols-1 gap-y-4">
          {error ? (
            <p className="text-red-500">{JSON.stringify(error)}</p>
          ) : null}
          <LabelInput
            label="email"
            type="text"
            defaultValue=""
            placeholder="your@email.com"
            validation={validationRules.email} />

          <LabelInput
            label="password"
            type="password"
            defaultValue=""
            placeholder="password"
            validation={validationRules.password} />

          <div className="flex flex-row justify-end">
            <button type="submit" className="disabled:opacity-50" disabled={loading}>
              Sign in
            </button>
            <button type="submit" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );

}
