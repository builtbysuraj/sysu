import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { SortMappableType } from '../types'

import { database } from '../firebase'
import RenderSection from '../shared/RenderSection'
import { Paragraph } from '../shared/paragraph'
import { formattedDate2, formattedTime } from '../utils/dateAndTimeUtils'
import { sortMappable } from '../utils/sortMappable'
import StoryMainFilterSection from './StoryMainFilterSection'
import StoryMainHeader from './StoryMainHeader'

type StoryMainProps = {
  windowWidth: number
  search: string
  randomCat: string[]
  selectedValue: string
  check: string
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>
  setSearch: React.Dispatch<React.SetStateAction<string>>
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function StoryMain({
  windowWidth,
  search,
  randomCat,
  selectedValue,
  check,
  setSelectedValue,
  setSearch,
  setShow,
}: StoryMainProps) {
  const [searchResults2, setSearchResults2] = useState([])
  const [flipped, setFlipped] = useState(false)
  const [show3, setShow3] = useState(false)
  const [menu, setMenu] = useState(false)
  const [show4, setShow4] = useState(false)
  const [stories, setStories] = useState(0)
  const [reveal, setReveal] = useState({})
  const [mappable, setMappable] = useState<SortMappableType[]>([])

  function handleCategorySelect2(category: string) {
    setSelectedValue('')
    setSearch(category)
    setSearchResults2([])
    searchBar(category)
  }

  function searchBar(cat: string) {
    cat && setMenu(true)
    setShow3(false)
    setShow4(false)
  }

  function performSearch2(searchValue: string) {
    const filteredCategories =
      randomCat &&
      randomCat.filter((category: string) =>
        category.toLowerCase().startsWith(searchValue.toLowerCase())
      )

    return filteredCategories
  }

  function handleClick() {
    setShow3((prev) => !prev)
    setShow4(false)
  }

  function handleClick2() {
    setShow4((prev) => !prev)
    setShow3(false)
  }

  function handleFlip() {
    setFlipped((prev) => !prev)
  }

  function handleSearch2(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearch(evt.target.value)
    setMenu(false)
    setShow3(true)

    const results = performSearch2(evt.target.value)
    console.log(results, 'handleSearch2')
    // @ts-ignore
    setSearchResults2(results)
  }

  function sorted(mappable: SortMappableType[]) {
    const sortedMappable = mappable.sort((a, b) => {
      const dateA = new Date(formattedDate2(String(Object.values(a[1])[4])))
      const dateB = new Date(formattedDate2(String(Object.values(b[1])[4])))

      if (dateA < dateB) {
        return flipped ? 1 : -1
      }

      if (dateA > dateB) {
        return flipped ? -1 : 1
      }

      const timeA = formattedTime(String(Object.values(a[1])[4]))
      const timeB = formattedTime(String(Object.values(b[1])[4]))

      if (timeA < timeB) {
        return flipped ? 1 : -1
      }
      if (timeA > timeB) {
        return flipped ? -1 : 1
      }

      return 0
    })

    return sortedMappable.map((items, index) => {
      // const random = Math.random() * 4
      return (
        <div key={index} className='single-items'>
          <Paragraph
            item={Object.values(items[1])}
            windowWidth={windowWidth}
            reveal={reveal}
            setReveal={setReveal}
          />
        </div>
      )
    })
  }

  useEffect(() => {
    if (windowWidth > 425) {
      setReveal({})
    } else if (windowWidth <= 425) {
      setShow4(false)
      setShow(false)
    }
  }, [windowWidth])

  useEffect(() => {
    if (search) {
      onValue(
        ref(database, `List/${search.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length)
            setMappable(Object.entries(snapshot.val()))
          }
        }
      )
    }
    setReveal({})
  }, [search])

  useEffect(() => {
    if (selectedValue) {
      onValue(
        ref(database, `List/${selectedValue.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length)
            setMappable(Object.entries(snapshot.val()))
          }
        }
      )
    }
    setReveal({})
  }, [selectedValue])

  useEffect(() => {
    if (check) {
      onValue(
        ref(database, `List/${check.toUpperCase()}`),
        function (snapshot) {
          if (snapshot.exists()) {
            setStories(Object.entries(snapshot.val()).length)
            setMappable(Object.entries(snapshot.val()))
          }
        }
      )
    }

    setReveal({})
  }, [check])

  // Calculate sortedMappable and map it to JSX elements before return statement
  const sortedMappable = sortMappable(mappable, flipped)

  const swiperSlides = sortedMappable.map((items, index) => {
    // const random = Math.random() * 4
    return (
      <SwiperSlide key={index} className='swiper-slide'>
        <Paragraph
          item={Object.values(items[1])}
          windowWidth={windowWidth}
          reveal={reveal}
          setReveal={setReveal}
        />
      </SwiperSlide>
    )
  })

  return (
    <section className='section-2'>
      <StoryMainHeader
        show3={show3}
        show4={show4}
        search={search}
        searchResults2={searchResults2}
        handleCategorySelect2={handleCategorySelect2}
        handleClick={handleClick}
        handleClick2={handleClick2}
        handleSearch2={handleSearch2}
      />

      <StoryMainFilterSection
        stories={stories}
        handleFlip={handleFlip}
        flipped={flipped}
      />

      {windowWidth > 425 ? (
        <div>
          {selectedValue && (
            <RenderSection check={check} mappable={mappable} sorted={sorted} />
          )}
          {(!menu || search.length === 0) && (
            <RenderSection check={check} mappable={mappable} sorted={sorted} />
          )}
          {search.length > 0 && menu && (
            <RenderSection check={check} mappable={mappable} sorted={sorted} />
          )}
        </div>
      ) : (
        <div className='container'>
          <section className='item-section-main'>
            <Swiper
              effect='coverflow'
              centeredSlides={true}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }}
            >
              <div className='swiper-wrapper'>{swiperSlides}</div>
            </Swiper>
          </section>
        </div>
      )}
    </section>
  )
}
