import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory();

    const { doLogin, setError } = useStoreActions((state) => state)
    const { error } = useStoreState((state) => state)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    const [errorHandler, setErrorHandler] = useState({
        status: false,
        message: '',
    })

    const submitLoginForm = (e) => {
        e.preventDefault()
        if (loginForm.email === '' && loginForm.password === '') {
            setError("Email and Password is required !")
        } else {
            doLogin(loginForm);
            history.push('/')
        }
    }

    useEffect(() => {
        if (error) {
            setErrorHandler({
                status: true,
                message: error,
            })
            setTimeout(() => {
                setErrorHandler({ status: false, message: '' })
            }, 3000)
        }
    }, [error])

    return (
        <div className='flex w-full h-screen'>
            {errorHandler.status ? (
                <Modal
                    description={errorHandler.message}
                    className={
                        "translate-y-52 w-3/12 opacity-100 rounded transition absolute inset-x-0 top-0 transform bg-red-600  text-white duration-500 ease-in-out"
                    }
                />
            ) : (
                ''
            )}
            <div
                className="container mx-auto flex items-center justify-center align-middle"
            >
                <div className="w-full max-w-sm">
                    <div className="leading-loose">
                        <form
                            className="rounded max-w-sm bg-white bg-opacity-50 p-10 shadow-xl"
                            onSubmit={submitLoginForm}
                        >
                            <div className="flex items-center justify-center">
                                <p className="text-blue-ribbon justify-center text-center text-lg font-bold">
                                    LOGIN
                                </p>
                            </div>
                            <label
                                htmlFor="login-email"
                                className="block text-sm text-white"
                            >
                                E-mail
                                <input
                                    className="rounded focus:outline-none w-full bg-gray-300 px-5 py-1 text-gray-700 focus:bg-white"
                                    type="email"
                                    id="login-email"
                                    placeholder="Your email..."
                                    aria-label="email"
                                    name="userName"
                                    onChange={(e) =>
                                        setLoginForm({
                                            ...loginForm,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </label>

                            <div className="mt-2">
                                <label
                                    htmlFor="login-password"
                                    className="block  text-sm text-white"
                                >
                                    Password
                                    <input
                                        className="rounded focus:outline-none w-full bg-gray-300 px-5 py-1 text-gray-700 focus:bg-white"
                                        type="password"
                                        id="login-password"
                                        placeholder="Your Password..."
                                        arial-label="password"
                                        name="password"
                                        onChange={(e) =>
                                            setLoginForm({
                                                ...loginForm,
                                                password: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </label>
                            </div>
                            <div className="mt-12 flex items-center justify-center">
                                <button
                                    className="hover:bg-blue-300 rounded bg-blue-400 px-4 font-light tracking-wider text-white"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;