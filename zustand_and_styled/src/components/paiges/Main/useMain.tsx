import { CounterWithState } from '@/components/widgets/CounterWithState'
import { RandomJoke } from '@/components/widgets/RandomJoke'
import { useCounter } from '@/stores/counter-store/useCounter'

export const useMain = () => {
  const [wgtCount, wgtAdd, wgtRemove] = useCounter()

  //TODO: STORE ALL ELEMENTS IN ARRAY. REMOVE USE COUNTER
  const widgets = Array.from({ length: wgtCount }, (_, i) => {
    const zeroOrOne = Math.floor(Math.random() * 10) % 2
    return zeroOrOne ? <CounterWithState key={i} /> : <RandomJoke key={i} />
  })

  return {
    wgtCount,
    wgtAdd,
    wgtRemove,
    widgets,
  }
}
