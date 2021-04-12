import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getSignedIn} from "./reducks/users/selector";
import {listenAuthState} from "./reducks/users/operation";


const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getSignedIn(selector);

  useEffect( () => {
    if(!isSignedIn){
      dispatch(listenAuthState())
    }
  }, []);

  if(!isSignedIn){
    return <></>
  }else{
    return children;
  }
}

export default Auth;