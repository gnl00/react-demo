import ContactTab from "../../components/contactTab/ContactTab";

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {forwardRef, useRef} from "react";

export default function () {
  return (
    <div className={'w-full h-full'}>

      <div>
        <h1 className={'text-center'}>header</h1>
      </div>

      <div>
        <ContactTab />
      </div>

      <div>
        {/*<Picker onSelect={(evt) => {console.log(evt)}} />*/}
        {/*<Picker title='Pick your emoji…' emoji='point_up' onSelect={(evt) => {console.log(evt)}} i18n={{ search: '搜索', categories: { recent: '最近' } }} />*/}
        {/*<Picker i18n={{ search: '搜索', categories: { recent: '最近' } }} />*/}
        {/*<Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />*/}
      </div>

      <div>
        <Father></Father>
      </div>


    </div>
  )
}

function Father() {

  const divRef = useRef();
  const sonRef = useRef();

  console.log(sonRef)

  const clickHandler = () => {

    console.log(divRef)
    console.log(sonRef)

    console.log('father click')
  }

  return (
    <div>
      <div className={'bg-purple-200'} onClick={() => clickHandler()} ref={divRef}>this is father</div>
      <Son ref={sonRef}></Son>

    </div>
  )
}

const Son = forwardRef((props, ref) => {
  const clickHandler = (evt) => {
    console.log('son click')
  }

  return (
    <div className={'bg-green-100'} onClick={evt => clickHandler(evt)} ref={ref}>this is son</div>
  )
})
