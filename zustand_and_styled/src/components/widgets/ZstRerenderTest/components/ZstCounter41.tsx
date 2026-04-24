import { useZstRerenderTestStore } from '../store/store'
import { Title, VerticalLayout } from './shared'

export const ZstCounter41 = (): JSX.Element => {
  // WARN: Сбой из-за изменений объекта на нижнем уровне. Если бы не он, то всё ок.
  const { count41: count } = useZstRerenderTestStore((s) => s.nested4)
  const inc = useZstRerenderTestStore((s) => s.incCount41)

  return (
    <VerticalLayout gridTemplateRows="0fr 1fr 0fr" style={{ backgroundColor: 'white' }}>
      <Title>{'Nested4 { Count41 } (bad selector)'}</Title>
      <div style={{ display: 'grid', placeItems: 'center' }}>{count}</div>
      <button onClick={inc}>+</button>
    </VerticalLayout>
  )
}
