import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    //three steps
    //1. login start
    //2. login successsful
    //3. login failure

    //step 1
    dispatch({type: "LOGIN_START"});
    try {
        //step 2
        const  res = await axios.post("/auth/login", userCredentials);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }
    catch(err) {
        //step 3
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}