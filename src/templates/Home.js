import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../reducks/users/operation";
import {getUserId, getUserName} from "../reducks/users/selector";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>ホーム</h2>
      <p>ユーザーID：{uid}</p>
      <p>ユーザー名：{username}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  )
}

export default Home;