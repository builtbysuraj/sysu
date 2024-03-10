import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

import type { ParagraphType } from '../types'

import { formattedDate } from '../utils/dateAndTimeUtils'
import { revealHead, revealMain, revealPara } from '../utils/styles'

type ExpandedSectionsType = {
  [key: string]: boolean
}

type ParagraphProps = {
  item: ParagraphType
  windowWidth: number
  reveal: ExpandedSectionsType
  setReveal: React.Dispatch<React.SetStateAction<ExpandedSectionsType>>
}

export function Paragraph({
  item,
  windowWidth,
  reveal,
  setReveal,
}: ParagraphProps) {
  const [expandedSections, setExpandedSections] = useState({})

  const styles = {
    main: revealMain(windowWidth),
    head: revealHead,
    para: revealPara(reveal),
  }

  const goBack = () => setReveal({})

  const togglePara = (itemId: string | number) => {
    const updateFunc = windowWidth > 425 ? setExpandedSections : setReveal
    updateFunc((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
  }

  if (!item) return null

  const words = String(item[1]).split(' ')
  // @ts-ignore
  const isExpanded = expandedSections[item[2]]
  const isRevealed = reveal[item[2]]

  const shouldShorten = words.length > 24 && !isExpanded
  const text = shouldShorten ? String(item[1]).slice(0, 154) + '...' : item[1]

  const readMoreOrLess = shouldShorten ? 'Read more...' : 'Read less'

  return (
    <div
      className='item-section'
      key={item[2]}
      style={isRevealed ? styles.main : {}}
    >
      <div className='item-category'>
        <h3>{item[0]}</h3>
        <p>{formattedDate(String(item[4]))}</p>
      </div>
      {isRevealed && <BsArrowLeft className='left-arrow' onClick={goBack} />}
      <h2 style={isRevealed ? styles.head : {}}>{item[3]}</h2>
      <div className='show-para'>
        <p style={isRevealed ? styles.para : {}}>{text}</p>
      </div>
      {words.length > 24 && (windowWidth > 425 || !isRevealed) && (
        <span className='read-more' onClick={() => togglePara(item[2])}>
          {readMoreOrLess}
        </span>
      )}
    </div>
  )
}
