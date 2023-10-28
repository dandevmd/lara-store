import React from "react";
import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { stateStorage } from "../state/ContextProvider";

const GuestLayout = () => {
    const { currentUser, userToken } = stateStorage();
    const location = useLocation();

    if (userToken) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {location.pathname === "/login"
                            ? "Sign in to your account"
                            : "Create an account"}
                    </h2>
                    {location.pathname === "/login" ? (
                        <h4 className="font-semibold text-black-600 text-center mt-4">
                            Or{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Register!
                            </Link>{" "}
                            if you don't have an account{" "}
                        </h4>
                    ) : (
                        <h4 className="font-semibold text-black-600 text-center mt-4">
                            Or{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Login!
                            </Link>{" "}
                            if you have an account{" "}
                        </h4>
                    )}
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default GuestLayout;
