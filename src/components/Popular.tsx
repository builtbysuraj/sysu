import { fabouriteTopics } from '../constant'

type PopularComponentProps = {
  onChildValue: (arg0: string) => void
}

export default function Popular({ onChildValue }: PopularComponentProps) {
  const handleClick = (value: string) => {
    onChildValue(value)
  }

  return (
    <div className='popular'>
      <h1>Your Favourite Topics</h1>

      <div className='list'>
        <ul className='list-items'>
          {fabouriteTopics.map((item: string) => (
            <li key={item} onClick={() => handleClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
