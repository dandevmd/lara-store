import { useState } from "react";
import axiosClient from "../../request/axiosclient.jsx";
import { stateStorage } from "../../state/ContextProvider.jsx";

const Register = () => {
    const { setUserToken, currentUser, setCurrentUser } = stateStorage();
    const [clientData, setClientData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
            .post("/register", {
                name: clientData.name,
                email: clientData.email,
                password: clientData.password,
                password_confirmation: clientData.password_confirmation,
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
                action="#"
                method="POST"
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            onChange={(e) => onChange(e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Full Name"
                        />
                    </div>
                </div>
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
                            autoComplete="email"
                            required
                            onChange={(e) => onChange(e)}
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
                            autoComplete="current-password"
                            required
                            onChange={(e) => onChange(e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password Confirmation
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            onChange={(e) => onChange(e)}
                            placeholder="Password Confirmation"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Register
                    </button>
                </div>
            </form>
        </>
    );
};

export default Register;
