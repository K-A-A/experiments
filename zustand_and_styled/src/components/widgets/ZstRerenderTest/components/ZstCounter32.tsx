import { useZstRerenderTestStore } from '../store/store'
import { Title, VerticalLayout } from './shared'

export const ZstCounter32 = (): JSX.Element => {
  /** WARN: Ререндер всегда, даже если свойство не меняется.
   * Shallow не помогает, так как на том же уровне меняется другое свойство.
   */
  const { count32: count } = useZstRerenderTestStore((s) => s.nested3)
  const inc = useZstRerenderTestStore((s) => s.incCount32)

  return (
    <VerticalLayout gridTemplateRows="0fr 1fr 0fr" style={{ backgroundColor: 'white' }}>
      <Title>{'Nested3 { Count32 } (bad selector)'}</Title>
      <div style={{ display: 'grid', placeItems: 'center' }}>{count}</div>
      <button onClick={inc}>+</button>
    </VerticalLayout>
  )
}
