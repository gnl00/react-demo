import {useState} from "react";
import {login} from "../../request/test";

export default function Test() {

  const [name, setName] = useState(null);
  const [passwd, setPasswd] = useState(null);

  const nameIptChange = evt => {
    setName(evt.target.value)
  }

  const passwdIptChange = evt => {
    setPasswd(evt.target.value)
  }

  const btnClick = () => {
    login({account: name, passwd})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className={'space-y-2 flex flex-col justify-center items-center mt-4'}>
      <div>
        <input type={'text'} value={name || ''} onChange={nameIptChange}
               className={'bg-gray-100 outline-none rounded h-10 placeholder-gray-500'}
               placeholder={'Input name here'} />
      </div>
      <div>
        <input type={'text'} value={passwd || ''} onChange={passwdIptChange}
               className={'bg-gray-100 outline-none rounded h-10 placeholder-gray-500'}
               placeholder={'Input passwd here'}/>
      </div>
      <div className={'bg-gray-100 p-4 rounded hover:bg-gray-200'} onClick={btnClick}>btn</div>
    </div>
  )
}