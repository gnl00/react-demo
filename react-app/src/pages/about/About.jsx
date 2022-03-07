import './About.css'

export default function About() {
  const info = 'this is About\'s content'
  return (
    <div className='About'>
      <div className='About-header'>
        <h1>{info}</h1>
      </div>
    </div>
  )

}