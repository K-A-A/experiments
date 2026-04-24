import { useZstRerenderTestStore } from '../store/store'
import { Title, VerticalLayout } from './shared'

export const ZstCounter1 = (): JSX.Element => {
  /** WARN: Ререндер всегда, даже если свойство не меняется.
   * Если достать сразу всё, работает аналогично.
   * Если создать объект внутри селектора - получим render loop...
   */
  const { count1: count } = useZstRerenderTestStore((s) => s)
  const inc = useZstRerenderTestStore((s) => s.incCount1)

  /** WARN: Такое работать не будет из-за render loop. Shallow из zustand не поможет!!! */
  // const { count, inc } = useZstRerenderTestStore(
  //   (s) => ({ count: s.count1, inc: s.incCount1 }),
  //   shallow
  // )
  // const { count, inc } = useZstRerenderTestStore((s) => ({ count: s.count1, inc: s.incCount1 }))

  return (
    <VerticalLayout gridTemplateRows="0fr 1fr 0fr" style={{ backgroundColor: 'white' }}>
      <Title>{'{ Count1 } (bad selector)'}</Title>
      <div style={{ display: 'grid', placeItems: 'center' }}>{count}</div>
      <button onClick={inc}>+</button>
    </VerticalLayout>
  )
}
