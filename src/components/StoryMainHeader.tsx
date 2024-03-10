import { BiChevronDown } from 'react-icons/bi'
import { initialCategories } from '../constant'

export default function StoryMainHeader({
  searchResults2,
  show3,
  show4,
  search,
  handleCategorySelect2,
  handleClick,
  handleClick2,
  handleSearch2,
}) {
  return (
    <div className='section-2-head'>
      <h1>Read their stories</h1>

      <div className='looking'>
        <div className='choose'>
          <label htmlFor='choose'>
            <h3>What are you looking for?</h3>
          </label>
          <input
            type='text'
            id='choose'
            placeholder='Browse a Category'
            value={search}
            onClick={handleClick}
            onChange={handleSearch2}
            required
          />
          <BiChevronDown className='btn-2' onClick={handleClick2} />
        </div>

        {show4 ? (
          <ul className='search-list search-list-2'>
            {initialCategories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategorySelect2(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        ) : show3 && search.length === 0 ? (
          <ul className='search-list search-list-2'>
            {initialCategories.map((category) => (
              <li
                key={category}
                onClick={() => handleCategorySelect2(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        ) : (
          show3 &&
          searchResults2.length > 0 && (
            <ul className='search-list search-list-2'>
              {searchResults2.map((category) => (
                <li
                  key={category}
                  onClick={() => handleCategorySelect2(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  )
}
