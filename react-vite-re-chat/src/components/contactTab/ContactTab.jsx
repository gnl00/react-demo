import {createContext, useContext, useEffect, useState} from "react";

export default function () {

  const [tabIndex, setTabIndex] = useState(1)

  const tabOpen = (index) => {
    console.log('open tab: ', index)
    setTabIndex(index)
  }

  const tabClose = index => {
    console.log('close tab: ', index)
  }

  useEffect(() => {

  }, []);


  return (
    <div className={'bg-blue-100 p-5'}>

      {/*<div className={'bg-white flex justify-start items-center p-2'}>*/}
      {/*  <div className={'bg-gray-100 p-2'} onClick={() => tabOpen(1)}>label 1</div>*/}
      {/*  <div className={'bg-gray-100 p-2'} onClick={() => tabOpen(2)}>label 222</div>*/}
      {/*  <div className={'bg-gray-100 p-2'} onClick={() => tabOpen(3)}>label 333</div>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <div className={(tabIndex === 1 ? '' : 'hidden')}>content 111</div>*/}
      {/*  <div className={(tabIndex === 2 ? '' : 'hidden')}>content 222</div>*/}
      {/*  <div className={(tabIndex === 3 ? '' : 'hidden')}>content 333</div>*/}
      {/*</div>*/}

      <Tabs name={'contactTab'} defaultIndex={1} >
        <TabPane name={''} label={'tab1'} index={1}>1111</TabPane>
        <TabPane name={''} label={'tab2'} index={2}>2222</TabPane>
        <TabPane name={''} label={'tab3'} index={3}>3333</TabPane>
        <TabPane name={''} label={'tab4'} index={4}>4444</TabPane>
      </Tabs>

    </div>
  )
}


const tabContext = createContext(null)
function Tabs(props) {

  // defaultIndex start from 0
  const { name, defaultIndex = 1 } = props

  const [activeIndex, setActiveIndex] = useState()

  useEffect(() => {
    setActiveIndex(defaultIndex)
  }, [])

  return (
    <div className={[name, 'flex relative'].join(' ')}>
      <tabContext.Provider value={{activeIndex, setActiveIndex}}>
        <div>{ props.children }</div>
      </tabContext.Provider>
    </div>
  )
}

function TabPane(props) {

  const { activeIndex, setActiveIndex } = useContext(tabContext);

  const { name, label, index } = props

  const [currentIndex, setCurrentIndex] = useState()

  useEffect(() => {
    setCurrentIndex(index)
  }, [])

  const tabClick = (index) => {
    console.log('click tab index: ', index)
    setActiveIndex(index)
  }

  return (
    <div className={[name, ''].join(' ')}>
      <div className={'bg-gray-100 p-2 hover:bg-gray-200 cursor-default'} onClick={() => tabClick(index)} >{label}</div>
      <div className={[currentIndex === activeIndex ? '' : 'hidden', ''].join(' ')}>
        {props.children}
      </div>
    </div>
  )
}