import React, {useCallback, useState} from "react";
import {signIn} from "../reducks/users/operation"
import {TextInput, PrimaryButton} from "../components/UIkit";
import {useDispatch} from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail]);

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword]);
  
  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium"/>
      <TextInput 
        fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput 
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <div className="module-spacer--medium"/>
      <div className="center">
        <PrimaryButton
          label={"サインイン"}
          onClick={() => {dispatch(signIn(email,password))}}
        />
      </div>
    </div>
  )
}

export default SignIn;