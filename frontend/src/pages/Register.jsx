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
    <form onSubmit={handleSubmit((data) => dispatch(registerFunc(data)))} className="md:w-1/2 sm:w-3/4 mx-auto my-3">
      <p className="text-center text-2xl my-3 text-red-700">REGISTER</p>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        {errors.email && <p className="text-red-500">Email is required.</p>}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
        />
        {errors.username && <p className="text-red-500">Username is required.</p>}
      </div>
      
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Enter Password"
          {...register('password', { required: true })}
        />
        {errors.password && <p className="text-red-500">Password is required.</p>}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="First Name"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && <p className="text-red-500">First Name is required.</p>}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          type="text"
          placeholder="Last Name"
          {...register('lastName', { required: true })}
        />
        {errors.lastName && <p className="text-red-500">Last Name is required.</p>}
      </div>
      <input className="shadow cursor-pointer bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="submit" value="Sign Up" />
    </form>
  );
};

export default Register;
