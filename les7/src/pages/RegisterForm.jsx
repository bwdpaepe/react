import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useCallback } from "react/cjs/react.development";
import LabelInput from "../components/LabelInput";
import { useRegister, useSession } from "../contexts/AuthProvider";

export default function RegisterForm() {
  const { loading, error, isAuthed } = useSession();
  const history = useHistory();
  const register = useRegister();
  const methods = useForm();
  const { reset, getValues, handleSubmit } = methods;

  useEffect(() => {
    if (isAuthed) {
      history.replace('/');
    }
  }, [isAuthed, history]);

  const handleRegister = useCallback(async (name, email, password) => {
    const success = await register(name, email, password);
    if (success) {
      history.replace('/');
    }
  }, [register, history]
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const validationRules = useMemo(() => ({
    name: {
      required: true,
    },
    email: {
      required: true,
    },
    password: {
      required: true,
    },
    confirmPassword: {
      required: true,
      validate: {
        notIdentical: value => {
          const password = getValues('password');
          return password === value ? null : 'both passowrds need to be identical';
        }
      }
    }
  }), [getValues]);

  return (
    <FormProvider {...methods}>
      <div className="w-1/4 mx-auto">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(handleRegister)} className="grid grid-cols-1 gap-y-4">
          {error ? (
            <p className="text-red-500">{JSON.stringify(error)}</p>
          ) : null}
          <LabelInput
            label="name"
            type="text"
            defaultValue="Bart"
            placeholder="your name"
            validation={validationRules.name} />

          <LabelInput
            label="email"
            type="text"
            defaultValue="bart@hogent.be"
            placeholder="your@email.com"
            validation={validationRules.email} />
          <LabelInput
            label="password"
            type="password"
            defaultValue="12345678"
            validation={validationRules.password} />

          <LabelInput
            label="confirmPassword"
            type="password"
            defaultValue="12345678"
            validation={validationRules.confirmPassword} />
          <div className="flex flex-row justify-end">
            <button type="submit" disabled={loading} className="disabled:opacity-50">
              Register
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
