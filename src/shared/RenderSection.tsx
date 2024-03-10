import type { SortMappableType } from '../types'

type RenderSectionType = {
  check: string
  mappable: SortMappableType[]
  sorted: (arg0: SortMappableType[]) => any
}

export default function RenderSection({
  check,
  mappable,
  sorted,
}: RenderSectionType) {
  return (
    <div className='container'>
      <section className='item-section-main'>
        <div className='item-section-container'>
          {check && mappable && sorted(mappable)}
        </div>
      </section>
    </div>
  )
}
