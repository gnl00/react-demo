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
    <div>

      {/*<div className={'bg-red-100'}>*/}
      {/*  <div className={'tabs relative'}>*/}
      {/*    <div className={'tab-pane flex space-x-4'}>*/}
      {/*      <div>label</div>*/}
      {/*      <div className={'hidden absolute top-0 left-10'}>content 1</div>*/}
      {/*    </div>*/}

      {/*    <div className={'tab-pane flex space-x-4'}>*/}
      {/*      <div>label</div>*/}
      {/*      <div className={'hidden absolute top-0 left-10'}>content 2</div>*/}
      {/*    </div>*/}

      {/*    <div className={'tab-pane flex space-x-4'}>*/}
      {/*      <div>label</div>*/}
      {/*      <div className={' absolute top-0 left-10'}>content 3</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={'bg-blue-100'}>
        <Tabs name={'contactTab'} defaultIndex={1} >
          <TabPane name={'tab'} label={'tab1'} index={1}>1111</TabPane>
          <TabPane name={'tab'} label={'tab2'} index={2}>2222</TabPane>
          <TabPane name={'tab'} label={'tab3'} index={3}>3333</TabPane>
          <TabPane name={'tab'} label={'tab4'} index={4}>4444</TabPane>
        </Tabs>
      </div>

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
    <div className={[name, 'relative'].join(' ')}>
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
      <div className={'cursor-default'} onClick={() => tabClick(index)} >

        <div className={'bg-gray-100 p-2 hover:bg-gray-200'}>
          {label}
        </div>

        <div className={[currentIndex === activeIndex ? '' : 'hidden', 'h-full w-full bg-yellow-100 absolute top-0 left-20'].join(' ')}>
          {props.children}
        </div>

      </div>

    </div>
  )
}

export {
  Tabs,
  TabPane,
}