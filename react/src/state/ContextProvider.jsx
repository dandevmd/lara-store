import React, { useState } from "react";
import { tmpSurveys } from "../fake.js";

const Context = React.createContext({
    currentUser: {},
    userToken: null,
    surveys: [],
    questionTypes: [],
    setCurrentUser: () => {},
    setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [surveys, setSurveys] = useState(tmpSurveys);
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

    const value = {
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        surveys,
        setSurveys,
        questionTypes,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const stateStorage = () => React.useContext(Context);
