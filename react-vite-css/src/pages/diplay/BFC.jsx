import './BFC.css'

export default function BFC() {
  return (
    <div>
      <h1 className={'text-xl text-center'}>BFC</h1>

      BFC demo1 float
      {/* BFC demo1 */}
      <div className={'outer'}>
        <div className={'left bg-red-200'}>left</div>
        <div className={'right bg-green-400'}>right</div>
      </div>

      BFC demo1 float tailwind
      {/* BFC demo1 */}
      <div className={'h-full'}>
        <div className={'bg-yellow-300 float float-left w-32 h-full'}>left</div>
        <div className={'bg-blue-200 h-full ml-32'}>right</div>
      </div>

      BFC demo2 float + overflow
      {/* BFC demo2 */}
      <div className={'outer2'}>
        <div className={'left2 bg-gray-300'}>left</div>
        <div className={'right2 bg-blue-200'}>right</div>
      </div>

      BFC demo2 float + overflow tailwind
      <div className={'h-full'}>
        <div className={'h-full w-40 float float-left bg-red-300'}>left</div>
        <div className={'h-full overflow-auto bg-green-200'}>right</div>
      </div>

      BFC demo3 flex
      <div className={'o3'}>
        <div className={'l3 bg-blue-200'}>left</div>
        <div className={'r3 bg-gray-200'}>right</div>
      </div>

      BFC demo3 flex tailwind
      <div className={'flex'}>
        <div className={'w-60 bg-red-200'}>left</div>
        <div className={'flex-1 bg-blue-200'}>right</div>
      </div>

      BFC demo4 position left absolute
      <div className={'o4'}>
        <div className={'l4 bg-blue-200'}>left</div>
        <div className={'r4 bg-gray-200'}>right</div>
      </div>

      BFC demo4 position left absolute tailwind
      <div className={'relative'}>
        <div className={'w-60 bg-green-200 absolute'}>left</div>
        <div className={'bg-red-200 ml-60'}>right</div>
      </div>

      BFC demo5 position right absolute
      <div className={'o5'}>
        <div className={'l5 bg-blue-200'}>left</div>
        <div className={'r5 bg-gray-200'}>right</div>
      </div>

      BFC demo5 position right absolute tailwind
      <div className={'relative'}>
        <div className={'bg-yellow-200 w-60'}>left</div>
        <div className={'bg-indigo-200 absolute left-60 top-0 right-0 bottom-0'}>right</div>
      </div>
    </div>
  )
}