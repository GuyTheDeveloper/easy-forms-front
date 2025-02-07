import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "./register.schema";
import { useSignupMutation } from "@api/auth-api";
import { Button } from "@components/ui/button";

interface AuthValues {
  username: string;
  email: string;
  password: string;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthValues>({
    resolver: yupResolver(registerSchema),
    mode: "onSubmit",
  });
  const values = watch();
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const onSubmit = async (data: AuthValues) => {
    const res = await signup(data).unwrap();
    if (res.user) navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-transparent rounded-[6px] mx-auto my-auto min-w-96">
        <h2 className="text-center">Sign In</h2>
        {error && "data" in error ? (
          <p className="text-red-500">Error: {error.data?.error}</p>
        ) : null}
        <form
          className="w-full flex flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="flex flex-col gap-y-4">
            <span className="self-start">Your Username</span>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              value={values.username || ""}
              {...register("username")}
            />
            {errors.username ? (
              <span className="text-red-600">{errors.username.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-y-4">
            <span className="self-start">Your Email</span>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              value={values.email || ""}
              {...register("email")}
            />
            {errors.email ? (
              <span className="text-red-600">{errors.email.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-y-4">
            <span className="self-start">Password</span>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={values.password || ""}
              {...register("password")}
            />
            {errors?.password ? (
              <span className="text-red-600">{errors.password.message}</span>
            ) : null}
          </label>
          <Button className="rounded-[6px]" disabled={isLoading}>
            Sign In
          </Button>
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
