import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
    //user: null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

//create wrapper
//app.js full file ta k wrap kore fellam
//props hishabe ekhn app.js ta chole ashbe
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    //copy
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                eror: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}