import {createContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

/* ================================================= context =========================================================*/
// export const Context = createContext(null)

export default function Auth(props) {

  /* ================================================= redux =========================================================*/
  const isAuth = useSelector(state => state.isAuth)

  /* ================================================= router =========================================================*/
  const navigate = useNavigate();

  /* ================================================= state =========================================================*/
  const [webSocket, setWebSocket] = useState(null)

  /* ================================================= useEffect =========================================================*/
  useEffect(() => {
    authCheck()
  }, [])

  /* ================================================= function =========================================================*/
  const authCheck = () => {
    // console.log(isAuth)

    // 未登录，跳转到登录页
    if (!isAuth) {
      navigate('/login')
    }

  }

  /* ================================================= render =========================================================*/
  return (
    <div>
      { isAuth ? props.children : <></> }
    </div>
  )
}