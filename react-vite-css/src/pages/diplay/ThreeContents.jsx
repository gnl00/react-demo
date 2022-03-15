import './ThreeContents.css'

export default function ThreeContents() {
  return (
    <div>
      <h1 className={'text-lg text-center'}>三栏布局</h1>

      <div id="main" className="float">
        <div id="main-wrap">main</div>
      </div>
      <div id="left" className="float">left</div>
      <div id="right" className="float">right</div>

    </div>
  )
}