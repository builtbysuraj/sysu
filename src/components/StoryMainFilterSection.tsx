import { CgArrowsExchangeAltV } from 'react-icons/cg'

type StoryMainFilterSectionType = {
  
}

export default function StoryMainFilterSection({
  stories,
  handleFlip,
  flipped,
}) {
  return (
    <div className='filter'>
      <h1 className='total-story'>
        <span>
          {stories === 1
            ? `${stories} story`
            : stories === 0
            ? `0 story`
            : `${stories} stories`}
        </span>{' '}
        for you to read
      </h1>
      <div className='flex-filter'>
        <h2 className='filter-heading'>
          Sort:
          <span onClick={handleFlip}>
            {flipped ? 'Oldest to Newest' : 'Newest to Oldest'}
          </span>
        </h2>
        <CgArrowsExchangeAltV className='filterarrow' onClick={handleFlip} />
      </div>
    </div>
  )
}
