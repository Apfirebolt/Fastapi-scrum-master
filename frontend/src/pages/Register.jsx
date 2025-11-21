import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { register as registerFunc, reset } from '../features/auth/authSlice'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, isError, isSuccess, message } = useSelector(
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit((data) => dispatch(registerFunc(data)))} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">Email is required.</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              id="username"
              type="text"
              placeholder="Username"
              {...register('username', { required: true })}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">Username is required.</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register('password', { required: true })}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">Password is required.</p>}
          </div>
          <div className="flex space-x-3">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                id="firstName"
                type="text"
                placeholder="First Name"
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">First Name is required.</p>}
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                id="lastName"
                type="text"
                placeholder="Last Name"
                {...register('lastName', { required: true })}
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">Last Name is required.</p>}
            </div>
          </div>
          <button
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
