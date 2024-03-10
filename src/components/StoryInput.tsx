import { push, ref } from 'firebase/database'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { BsPen } from 'react-icons/bs'
import { initialCategories } from '../constant'
import { cat, database } from '../firebase'

type StoryInputProps = {
  newCat: string[]
  show: boolean
  categories: string[]
  content: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
  setContent: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StoryInput({
  newCat,
  content,
  show,
  categories,
  setShow,
  setContent,
  setCategories,
}: StoryInputProps) {
  const [swiper, setSwiper] = useState(null)

  const [subject, setSubject] = useState('')
  const [describe, setDescribe] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  function handleSubmit(evt: React.FormEvent) {
    const random = Math.random() * 4
    evt.preventDefault()
    const Data = {
      subject: subject,
      description: describe,
      category: selectedCategory,
      timeStamp: getCurrentDateTime(),
      id: random,
    }

    if (subject && describe && selectedCategory) {
      push(ref(database, `List/${selectedCategory}`), Data)

      if (selectedCategory) {
        if (
          newCat &&
          !newCat.some(
            (item) => item.toLowerCase() === selectedCategory.toLowerCase()
          )
        ) {
          push(cat, selectedCategory)
        }
        clear()
      }
    }

    // setContent(false)
  }

  function handleShow() {
    setShow((prev) => !prev)
  }

  function performSearch(searchValue: string) {
    const filteredCategories =
      categories &&
      categories.filter((category) =>
        category.toLowerCase().startsWith(searchValue.toLowerCase())
      )

    return filteredCategories
  }

  function handleAdd() {
    setSelectedCategory(searchText.toUpperCase())
    setSearchText('')
    setSearchResults([])
    setShow(false)

    if (searchText) {
      if (
        initialCategories &&
        !initialCategories.some(
          (item) => item.toLowerCase() === searchText.toLowerCase()
        )
      ) {
        setCategories((prevCategories) => [...prevCategories, searchText])
        initialCategories.push(searchText)
      }
    }
  }

  function getCurrentDateTime() {
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = String(now.getFullYear())
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`
  }

  function handleCategorySelect(category: string) {
    setSelectedCategory(category.toUpperCase())
    setSearchText('')
    setSearchResults([])
    setShow(false)
  }

  function handleValue(
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = evt.target.name
    const value = evt.target.value

    if (name === 'subject') {
      setSubject(value)
    } else if (name === 'description') {
      setDescribe(value)
    }
  }

  function handleSearch(evt: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = evt.target.value
    setSearchText(searchValue)

    const results = performSearch(searchValue)
    setSearchResults(results)
  }

  function showContent() {
    setContent((prev) => !prev)
  }

  function clear() {
    setSubject('')
    setDescribe('')
    setSearchText('')
    setSelectedCategory('')
  }

  return (
    <form className='section-1'>
      <div className='section-1-head'>
        <h1>Write your own story</h1>
        <BsPen className='pen' onClick={showContent} />
      </div>
      {content && (
        <div className='section-1-content'>
          <div className='subject'>
            <label htmlFor='subject'>
              <h3>Topic</h3>
            </label>
            <input
              id='subject'
              name='subject'
              type='text'
              placeholder='write the topic for your story '
              value={subject}
              onChange={handleValue}
              required
            />
          </div>

          <div className='description'>
            <label htmlFor='describe'>
              <h3>Description</h3>
            </label>
            <textarea
              value={describe}
              name='description'
              id='describe'
              placeholder='write what your story is about here'
              onChange={handleValue}
              required
            />
          </div>

          <div className='selectCategory'>
            <div className='select-btn' onClick={handleShow}>
              {selectedCategory ? (
                <span>{selectedCategory.toUpperCase()}</span>
              ) : (
                <span>Select a category</span>
              )}
              <BiChevronDown className='down' />
            </div>

            {show && (
              <div className='content'>
                <div className='search'>
                  <AiOutlineSearch className='search-btn' />
                  <input
                    type='text'
                    id='category'
                    placeholder='Search'
                    value={searchText}
                    onChange={handleSearch}
                    required
                  />
                </div>

                {searchText.length === 0 ? (
                  <ul className='search-list'>
                    {initialCategories.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : searchResults.length > 0 ? (
                  <ul className='search-list'>
                    {searchResults.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className='search-list'>
                    <li onClick={handleAdd}>Add new category</li>
                  </ul>
                )}
              </div>
            )}
          </div>

          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            PUBLISH YOUR STORY
          </button>
        </div>
      )}
    </form>
  )
}
