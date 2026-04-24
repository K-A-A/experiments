import { useZstRerenderTestStore } from '../store/store'
import { Title, VerticalLayout } from './shared'

export const ZstCounter411 = (): JSX.Element => {
  // Корректная работа
  const { count411: count } = useZstRerenderTestStore((s) => s.nested4.nested41)
  const inc = useZstRerenderTestStore((s) => s.incCount411)

  return (
    <VerticalLayout gridTemplateRows="0fr 1fr 0fr" style={{ backgroundColor: 'white' }}>
      <Title>{'Nested4.Nested41 { Count411 }'}</Title>
      <div style={{ display: 'grid', placeItems: 'center' }}>{count}</div>
      <button onClick={inc}>+</button>
    </VerticalLayout>
  )
}
