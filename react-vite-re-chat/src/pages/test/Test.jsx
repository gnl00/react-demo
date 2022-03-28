import ContactTab from "../../components/contactTab/ContactTab";

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export default function () {
  return (
    <div>

      <div>
        <h1 className={'text-center'}>header</h1>
      </div>

      <div>
        <ContactTab />
      </div>

      <div>
        <Picker onSelect={(evt) => {console.log(evt)}} />
        <Picker title='Pick your emoji…' emoji='point_up' onSelect={(evt) => {console.log(evt)}} i18n={{ search: '搜索', categories: { recent: '最近' } }} />
        <Picker i18n={{ search: '搜索', categories: { recent: '最近' } }} />
        {/*<Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />*/}

      </div>
    </div>
  )
}