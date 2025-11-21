import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { login, reset } from '../features/auth/authSlice'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-purple-300">
      <form
        onSubmit={handleSubmit((data) => dispatch(login(data)))}
        className="bg-white shadow-lg rounded-lg px-10 py-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">Sign In</h2>
        <div className="mb-5">
          <label
            className="block text-gray-800 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className={`border-2 rounded-md w-full py-2 px-3 focus:outline-none focus:border-purple-500 transition ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">Email is required.</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-800 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`border-2 rounded-md w-full py-2 px-3 focus:outline-none focus:border-purple-500 transition ${
              errors.password ? "border-red-400" : "border-gray-300"
            }`}
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">Password is required.</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-md transition"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {isError && (
          <div className="mt-4 text-center text-red-600 text-sm">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
