import { onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import SwiperCore, { EffectCoverflow } from 'swiper'

import { cat } from '../firebase'
import Popular from './Popular'
import StoryInput from './StoryInput'
import StoryMain from './StoryMain'

SwiperCore.use([EffectCoverflow])

export default function Story() {
  const [categories, setCategories] = useState<string[]>([])
  const [newCat, setNewCat] = useState<string[]>([])
  const [randomCat, setRandom] = useState<string[]>([])

  const [search, setSearch] = useState('')
  const [check, setCheck] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [show, setShow] = useState(false)
  const [content, setContent] = useState(false)

  useEffect(() => {
    onValue(cat, (snapshot) => {
      if (snapshot.exists()) {
        const entries = Object.entries(snapshot.val()) as [string, string][]
        setCategories(entries.map((item) => item[1]))
        setNewCat(entries.map((item) => item[1]))
        setRandom(entries.map((item) => item[1]))
      }
    })
  }, [])

  useEffect(() => {
    if (randomCat.length > 0) {
      const random = Math.floor(Math.random() * categories.length)
      setCheck(randomCat[random])
    }
  }, [randomCat])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    windowWidth > 425 ? setContent(true) : setContent(false)
  }, [windowWidth])

  function handleChildValue(value: string) {
    setSelectedValue(value)
    setSearch('')
  }

  return (
    <div className='flex'>
      <Popular onChildValue={handleChildValue} />
      <div className='story-section'>
        <StoryInput
          content={content}
          setContent={setContent}
          newCat={newCat}
          show={show}
          setShow={setShow}
          categories={categories}
          setCategories={setCategories}
        />

        <div className='middle-line' />

        <StoryMain
          check={check}
          windowWidth={windowWidth}
          randomCat={randomCat}
          search={search}
          setSearch={setSearch}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setShow={setShow}
        />
      </div>
    </div>
  )
}
