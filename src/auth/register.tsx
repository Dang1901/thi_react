import React from 'react';
import { useForm } from 'react-hook-form';
import { IUser } from '../Interface/user';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
  const navigate = useNavigate();

  const onSubmit = async (authdata: IUser) => {
    try {
      const { data } = await axios.post('http://localhost:3000/register', authdata);
      alert('Đăng ký thành công');
      navigate('/login');
    } catch (error) {   
      alert('Đăng ký không thành công');
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cyan-700">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-5 text-center">Đăng ký tài khoản</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-red-500">Vui lòng nhập tên đăng nhập</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('email', {
              required: 'Email là bắt buộc',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Sai định dạng Email',
              },
            })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('password', {
              required: 'Password là bắt buộc',
              minLength: {
                value: 6,
                message: 'Nhập ít nhất 6 kí tự',
              },
            })}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <button 
          type="submit"
          className="w-full bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-200"
        >
          Đăng ký
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Bạn đã có tài khoản?</span>
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
