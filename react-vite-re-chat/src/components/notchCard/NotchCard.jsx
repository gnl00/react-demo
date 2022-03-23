import './NotchCard.css'

export default function NotchCard() {
  return (
    <div className={'flex justify-center items-center font-bold text-3xl'}>
        <span id={'title'} className={'shadow-md p-2 rounded w-96 text-center text-gray-600 bg-white'}>
          Chat-Room
        </span>
    </div>
  )
}