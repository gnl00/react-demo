import './Login.css'
import {useState} from "react";
import { login } from "../../network/request/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setAuthAction, setUserInfoAction} from "../../redux/action/user/userActions";
import NotchCard from "../../components/notchCard/NotchCard";

export default function Login() {

  /* ================================================= redux =========================================================*/
  const dispatch = useDispatch()

  /* ================================================= router =========================================================*/
  const navigate = useNavigate();

  /* ================================================= state =========================================================*/
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  /* ================================================= function =========================================================*/
  const accountChange = evt => {
    setAccount(evt.target.value)
  }

  const passwordChange = evt => {
    setPassword(evt.target.value)
  }

  const loginClick = () => {
    if (account && password) {
      login({account, password})
        .then(res => {

          // 登录成功
          if (res) {
            dispatch(setUserInfoAction({uid: account, isAuth: res}))

            navigate('/')
          }
        }).catch(err => {
        console.log(err)
      })

      // 输入框置空
      setAccount('')
      setPassword('')
    }
  }

  /* ================================================= render =========================================================*/
  return (
    <div className={'font-mono'}>
      <NotchCard />

      <div className={'w-full h-full mt-64 flex flex-col justify-center items-center space-y-6'}>
        <div>
          <input
            type={'text'}
            placeholder={'Input account here'}
            className={'loginIpt bg-gray-100 w-full h-10 p-2 outline-none rounded focus:ring focus:ring-4 placeholder-gray-500 shadow'}
            value={account}
            onChange={accountChange} />
        </div>
        <div>
          <input
            type={'text'}
            placeholder={'Input password here'}
            className={'loginIpt bg-gray-100 w-full h-10 p-2 outline-none rounded focus:ring focus:ring-4 placeholder-gray-500 shadow'}
            value={password}
            onChange={passwordChange} />
        </div>

        <div id={'loginBtn'} className={'border-gray-600 border-2 p-2 pl-4 pr-4 rounded'} onClick={loginClick}>Login</div>
      </div>
    </div>
  )
}