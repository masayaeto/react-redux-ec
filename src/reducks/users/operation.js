import {signInAction, signOutAction} from "./actions";
import {push} from "connected-react-router";
import {auth,db, FirebaseTimestamp} from "../../firebase/index";

export const listenAuthState  = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged( user => {
      if(user){
        const uid = user.uid

          db.collection("users").doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()
              
              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))
              console.log("test")
              dispatch(push("/"))
            })
      }else{
        dispatch(push("/signin"))
      }
    })
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    if(email === "" || password === ""){
      alert("必須項目が未入力です。");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user
        
        if(user){
          const uid = user.uid
          console.log(uid)

          db.collection("users").doc(uid).get()
            .then(snapshot => {
              console.log(snapshot)
              const data = snapshot.data()
              


              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))

              dispatch(push("/"))
            })
        }
      })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if(username === "" || email === "" || password === "" || confirmPassword === ""){
      alert("必須項目が未入力です。");
      return false;
    }

    if(password !== confirmPassword){
      alert("パスワードが一致しません。もう一度確認して入力してください。");
      return false;
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user

        if(user){
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            create_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            update_at: timestamp,
            username: username
          }

          db.collection("users").doc(uid).set(userInitialData)
            .then(() => {
              console.log("ユーザーの登録が完了しました")
              dispatch(push("/"))
            })
        }
      })
  }
}

export const  signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        console.log("ログアウトしました")
        dispatch(signOutAction());
        dispatch(push("/signin"));
      }).catch( (error)=>{
        console.log(`ログアウト時にエラーが発生しました (${error})`);
      });
  }
}

export const resetPassword = (email) => {
  console.log(email)
  return async (dispatch) => {
    if(email === ""){
      alert("必須項目が未入力です");
    }else{
      auth.sendPasswordResetEmail(email)
        .then((() => {
          alert("入力いただいたアドレスにパスワードリセット用のメールをお送りしました")
          dispatch(push("/"))
        })).catch(() => {
          alert("パスワードのリセットに失敗しました。")
        })
    }
  }
}