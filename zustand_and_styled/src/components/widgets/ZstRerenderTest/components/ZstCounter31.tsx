import { useZstRerenderTestStore } from '../store/store'
import { Title, VerticalLayout } from './shared'

export const ZstCounter31 = (): JSX.Element => {
  // Максимально корректная работа
  const count = useZstRerenderTestStore((s) => s.nested3.count31)
  const inc = useZstRerenderTestStore((s) => s.incCount31)

  return (
    <VerticalLayout gridTemplateRows="0fr 1fr 0fr" style={{ backgroundColor: 'white' }}>
      <Title>Nested3.Count31</Title>
      <div style={{ display: 'grid', placeItems: 'center' }}>{count}</div>
      <button onClick={inc}>+</button>
    </VerticalLayout>
  )
}
