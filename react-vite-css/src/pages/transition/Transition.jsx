import './Transition.css'

export default function Transition() {
  return (
    <div className={'p-2'}>
      <div id={'box'} className={'h-20 w-20 bg-green-300'}>
      </div>

      <div id={'box-ani'} className={'w-20 h-20 bg-red-400 mt-2'}></div>
    </div>
  )
}