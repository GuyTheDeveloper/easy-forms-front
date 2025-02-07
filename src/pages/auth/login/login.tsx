import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "./login.schema";
import { useLoginMutation } from "@api/auth-api";

interface AuthValues {
  email: string;
  password: string;
}
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthValues>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });
  const values = watch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data: AuthValues) => {
    const res = await login(data).unwrap();
    if (res.user) navigate("/");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        {error && "data" in error ? (
          <p className="text-red-500">Error: {error.data?.error}</p>
        ) : null}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label className="flex flex-col gap-y-4">
            <span className="self-start">Your Email</span>
            <input
              type="email"
              className="form__input"
              placeholder="name@gmail.com"
              value={values.email || ""}
              {...register("email")}
            />
            {errors?.email ? (
              <span className="form__inp--invalid">{errors.email.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-y-4">
            <span className="self-start">Password</span>
            <input
              type="password"
              className="form__input"
              placeholder="password"
              minLength={1}
              value={values.password || ""}
              {...register("password")}
            />
            {errors?.password ? (
              <span className="form__inp--invalid">
                {errors.password.message}
              </span>
            ) : null}
          </label>
          <button className="form__btn" disabled={isLoading}>
            {isLoading ? "Loading" : "Sign In"}
          </button>
        </form>

        <p className="mt-10 text-sm/6 text-gray-500">
          Dont have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
