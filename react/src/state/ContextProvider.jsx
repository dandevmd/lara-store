import React, { useState } from "react";

const Context = React.createContext({
    currentUser: {},
    userToken: null,
    toast: {
        message: "",
        show: false,
    },
    surveys: [],
    questionTypes: [],
    setCurrentUser: () => {},
    setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [surveys, setSurveys] = useState([]);
    const [toast, setToast] = useState({
        message: "",
        show: false,
    });
    const [currentUser, setCurrentUser] = useState({});
    const [questionTypes] = useState([
        "text",
        "select",
        "radio",
        "checkbox",
        "textarea",
    ]);

    const setUserToken = (token) => {
        if (!token) {
            _setUserToken(null);
            localStorage.removeItem("TOKEN");
            return;
        }
        localStorage.setItem("TOKEN", token);
        _setUserToken(token);
    };

    const showToast = (message) => {
        setToast({
            message,
            show: true,
        });
    };

    const value = {
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        surveys,
        setSurveys,
        questionTypes,
        toast,
        setToast,
        showToast,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const stateStorage = () => React.useContext(Context);
