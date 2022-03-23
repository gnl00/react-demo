import './Chat.css'
import {useEffect} from "react";
import NotchCard from "../../components/notchCard/NotchCard";
import HeaderCard from "../../components/headerCard/HeaderCard";
import ContactCard from "../../components/contactCard/ContactCard";

export default function Chat() {

  console.log('auth success, load Chat page')

  /* ================================================= state =========================================================*/

  /* ================================================= useEffect =========================================================*/
  useEffect(() => {
    openWebsocket().then(res => {
      console.log('opening websocket')
    }).catch(err => {
      console.log('open websocket error: ', err.message)
    })
  }, [])

  /* ================================================= function =========================================================*/
  const openWebsocket = () => import('@/network/websocket/websocket')

  /* ================================================= render =========================================================*/
  return (
    <div className={'w-full min-h-screen'}>

      <NotchCard />

      <div className={'p-10 rounded'}>
        <div className={'bg-white w-full h-full shadow rounded'}>

          <HeaderCard />

          <div className={'grid grid-cols-12 w-full h-full'}>
            <div className={'col-span-3 bg-yellow-100 w-full h-full'}>
              <ContactCard />
            </div>

            <div className={'col-span-9 p-2 bg-white w-full h-full'}>
              <div className={'shadow-lg w-full h-full rounded text-gray-800'}>
                <div className={'bg-gray-200 flex justify-center items-center p-2 space-x-2'}>
                  <div className={'bg-white p-4 rounded shadow'}>
                    avatar
                  </div>
                  <div className={'flex-1 text-lg flex justify-end'}>name</div>
                  <div className={'flex-1 flex justify-end'}>btn</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}