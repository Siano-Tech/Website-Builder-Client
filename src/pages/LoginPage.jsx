import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../utils/Utils';
import logo from '../assets/apple-touch-icon.png'
import toast from 'react-hot-toast';
import { submitForm } from '../api/login';

export default function LoginPage() {
    const navigate = useNavigate();
    const uid = getUserId();
    const [phoneNo, setPhoneNo] = useState();

    useEffect(() => {
        if (uid) {
            navigate('/fb');
        }
    }, [uid])
    
    const handleOnChange = (e) => {
        setPhoneNo(e.target.value)
    }

    const getStarted = (e) => {
        e.preventDefault();
        if(!phoneNo) {
            toast.error('Please enter phone number');
            return;
        }
        toast.loading('Getting started...');
        submitForm({phoneNo: phoneNo}).then((d) => {
            console.log('user registered successfully : ', d);
            localStorage.setItem('user', JSON.stringify(d.data.user));
            // localStorage.setItem('token', d.data.token);
            localStorage.setItem('isLoggedIn', true);
            toast.remove();
            toast.success('Starting...');
            navigate('/fb');
        }).catch((e) => toast.success(e.data));
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src={logo}
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Enter your mobile number to get started
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={getStarted} className="space-y-6">
                        <div>
                            <label
                                htmlFor="phoneNo"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Mobile Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phoneNo"
                                    name="phoneNo"
                                    type="tel"
                                    required
                                    autoComplete="tel"
                                    maxLength={10}
                                    onChange={handleOnChange}
                                    value={phoneNo}
                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}

                        {/* <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div> */}

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Go
                            </button>
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <a
                            href="#"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Start a 14 day free trial
                        </a>
                    </p> */}
                </div>
            </div>
        </>
    );
}
