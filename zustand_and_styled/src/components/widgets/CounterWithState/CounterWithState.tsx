import { PlusMinusBtns } from '@/components/dummies/PlusMinusBtns'
import { useCounter } from '@/components/widgets/CounterWithState/useCounter'

export const CounterWithState = (): JSX.Element => {
  const [count, inc, dec] = useCounter()

  return (
    <div
      style={{
        backgroundColor: 'orange',
        height: 200,
        padding: 10,
      }}
    >
      <div>{`Текущее значение: ${count}`}</div>
      <PlusMinusBtns count={count} onAdd={inc} onRemove={dec} />
    </div>
  )
}
