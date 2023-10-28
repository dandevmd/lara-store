import React, { useState } from "react";
import axiosClient from "../../request/axiosclient";
import { stateStorage } from "../../state/ContextProvider";

const Login = () => {
    const { setUserToken, currentUser, setCurrentUser } = stateStorage();
    const [clientData, setClientData] = useState({
        email: "",
        password: "",
        error: {
            __html: "",
        },
    });

    let timeoutId;

    const onChange = (e) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            setClientData({
                ...clientData,
                [e.target.name]: e.target.value,
            });
        }, 300);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setClientData({
            ...clientData,
            error: {
                __html: "",
            },
        });

        axiosClient
            .post("login", {
                email: clientData.email,
                password: clientData.password,
            })
            .then(({ data }) => {
                setUserToken(data.token);
                setCurrentUser(data.user);
            })
            .catch((error) => {
                if (error.response) {
                    const formatedErrors = Object.values(
                        error.response.data.errors
                    ).flat();
                    setClientData({
                        ...clientData,
                        error: {
                            __html: formatedErrors.join("<br />"),
                        },
                    });
                }
                console.error(error);
            });
    };

    return (
        <>
            {clientData.error.__html && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    dangerouslySetInnerHTML={{
                        __html: clientData.error.__html,
                    }}
                />
            )}
            <form
                onSubmit={(e) => onSubmit(e)}
                className="space-y-6"
                action="/login"
                method="POST"
            >
                <div>
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
                            onChange={(e) => onChange(e)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => onChange(e)}
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </>
    );
};

export default Login;
