import { Counter } from '@/components/dummies/Counter'
import { useCounter } from '@/stores/counter-store/useCounter'

export const CounterWithState = (): JSX.Element => {
  const [count, inc, dec] = useCounter()

  return <Counter count={count} onAdd={inc} onRemove={dec} />
}
