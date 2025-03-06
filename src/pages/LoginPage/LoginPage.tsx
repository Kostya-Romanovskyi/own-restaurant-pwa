import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILogin } from '../../API/auth/auth.interface';
import { useLoginUser } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

import './LoginPage.scss';
import Spinner from '../../components/Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const LoginPage = () => {
  const { mutate, isPending } = useLoginUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async user => {
    mutate(user, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['current'] });
        navigate('/staff', { replace: true });
      },
    });

    reset();
  };

  return (
    <main>
      <div className="container">
        {isPending ? (
          <Spinner size={spinnerSize.lg} />
        ) : (
          <div className="login__wrapper">
            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
              <div className="input__login__wrapper">
                <label className="login__label" htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  className={`login__input ${errors.email ? 'login__error__border' : ''}`}
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="login__error">Email field is required</span>}
              </div>

              <div className="input__login__wrapper">
                <label className="login__label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className={`login__input ${errors.password ? 'login__error__border' : ''}`}
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className="login__error">Password field is required</span>
                )}
              </div>

              <button className="login__button" type="submit">
                Log In
              </button>
            </form>
            <Link className="link__to__registration" to="/register">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default LoginPage;
