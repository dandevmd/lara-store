import React, { useState } from "react";
import { tmpSurveys } from "../fake.js";

const Context = React.createContext({
    currentUser: {},
    userToken: null,
    surveys: [],
    setCurrentUser: () => {},
    setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(1234);
    const [surveys, setSurveys] = useState(tmpSurveys);
    const [currentUser, setCurrentUser] = useState({
        name: "Tom Cook",
        email: "tom@example.com",
        imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const value = {
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        surveys,
        setSurveys,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const stateStorage = () => React.useContext(Context);
