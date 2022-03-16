import './Transition.css'

export default function Transition() {
  return (
    <div className={'p-2'}>

      {/* 参考：
          https://juejin.cn/post/6844903615920898056
          https://juejin.cn/post/6844903967491784712
      */}

      <div id={'tran-width'} className={'bg-yellow-300'}></div>

      <div id={'tran-opacity'} className={'bg-indigo-300 mt-2'}></div>

      <div id={'circle'} className={'bg-red-300 rounded rounded-full w-20 h-20 mt-2'}></div>

      <div id={'circleAni'} className={'bg-blue-300 rounded rounded-full w-20 h-20 mt-2'}></div>

      <div id={'box'} className={'h-20 w-20 bg-green-300 mt-2'}>
      </div>

      <div id={'box-ani'} className={'w-20 h-20 bg-red-400 mt-2'}></div>
    </div>
  )
}