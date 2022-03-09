import './NavBar.css'
import logo from '@/assets/img/logo.png'
import homeIcon from '@/assets/img/icon/home.svg'
import analyseIcon from '@/assets/img/icon/analyse.svg'
import scheduleIcon from '@/assets/img/icon/schedule.svg'
import avatar from '@/assets/img/avatar.png'
import {useState, useEffect} from "react";
import {NavLink, useLocation} from "react-router-dom";

function NavBar() {
  const [avatarMenu, setAvatarMenu] = useState(false)
  const [homeActive, setHomeActive] = useState(false)
  const [analyseActive, setAnalyseActive] = useState(false)
  const [scheduleActive, setScheduleActive] = useState(false)

  useEffect(() => {
    console.log('effect 渲染 ui 后调用 111')
  })

  useEffect(() => {
    console.log('第二个参数为空数组，等同 componentDidMount 222')
  }, [])

  let location = useLocation()
  let activePath = location.pathname

  useEffect(() => {
    console.log('第二个参数为非空数组，则在数据内参数变化后调用 333')

    console.log(activePath)

    switch (activePath) {
      case '/':
        setHomeActive(true)
        setAnalyseActive(false)
        setScheduleActive(false)
        break
      case '/home':
        setHomeActive(true)
        setAnalyseActive(false)
        setScheduleActive(false)
        break
      case '/analyse':
        setHomeActive(false)
        setAnalyseActive(true)
        setScheduleActive(false)
        break
      case '/schedule':
        setHomeActive(false)
        setAnalyseActive(false)
        setScheduleActive(true)
        break
      default:
        break
    }

  }, [activePath])

  const avatarClick = () => {
    setAvatarMenu(!avatarMenu)
    setInterval(() => {
      if (avatarMenu) {
        setAvatarMenu(!avatarMenu)
      }
    }, 2500)
  }

  const outSideAvatarClick = () => {
    if (avatarMenu) {
      setAvatarMenu(!avatarMenu)
    }
  }

  return (
    <div className={'flex relative h-full'}>
      <div className='NavBar'>
        <NavLink to={'/'} className='nav-logo'>
          <img src={logo} className='' />
        </NavLink>

        <NavLink to='/home' className={['Nav-item nav-home', homeActive ? 'bg-blue-400': ''].join(' ')}>
          <img className='nav-icon' src={homeIcon}/>
        </NavLink>

        <NavLink to='/analyse' className={['Nav-item nav-analyse', analyseActive ? 'bg-blue-400': ''].join(' ')}>
          <img className='nav-icon' src={analyseIcon} />
        </NavLink>

        <NavLink to='/schedule' className={['Nav-item nav-schedule', scheduleActive ? 'bg-blue-400': ''].join(' ')}>
          <img className='nav-icon' src={scheduleIcon} />
        </NavLink>

        <div className='nav-avatar' onClick={outSideAvatarClick}>
          <img className='nav-avatar-img' src={avatar} onClick={avatarClick} />
        </div>
      </div>

      {
        avatarMenu ?
          <div className={[' -mr-40 flex flex-col justify-end'
            , avatarMenu ? '':'invisible'].join(" ")}>
            <div className={'invisible flex-1'}></div>
            <div className={'invisible flex-1'}></div>
            <div className={'invisible flex-1'}></div>
            <div className={'invisible flex-1'}></div>
            <div className={'border-green-800 border-2 bg-pink-100 h-full flex-1'}>
              setting and about
            </div>
          </div> : <></>
      }
    </div>
  )
}

export default NavBar;