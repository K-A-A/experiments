import { useZstRerenderTestStore } from '../store/store'
import { Title, VerticalLayout } from './shared'

export const ZstCounter2 = (): JSX.Element => {
  // Максимально корректная работа
  const count = useZstRerenderTestStore((s) => s.count2)
  const inc = useZstRerenderTestStore((s) => s.incCount2)

  return (
    <VerticalLayout gridTemplateRows="0fr 1fr 0fr" style={{ backgroundColor: 'white' }}>
      <Title>Count2</Title>
      <div style={{ display: 'grid', placeItems: 'center' }}>{count}</div>
      <button onClick={inc}>+</button>
    </VerticalLayout>
  )
}
