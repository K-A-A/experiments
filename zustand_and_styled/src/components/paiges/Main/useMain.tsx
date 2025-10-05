import { useState } from 'react'
import { CounterWithState } from '@/components/widgets/CounterWithState'
import { RandomJoke } from '@/components/widgets/RandomJoke'

export const useMain = () => {
  const [widgets, setWidgets] = useState<JSX.Element[]>([])

  const addWidget = () => {
    const zeroOrOne = Math.floor(Math.random() * 10) % 2
    const wgt = zeroOrOne ? (
      <CounterWithState key={widgets.length} />
    ) : (
      <RandomJoke key={widgets.length} />
    )
    setWidgets((prev) => [...prev, wgt])
  }

  const removeWidget = () => {
    setWidgets((prev) => prev.slice(0, prev.length - 1))
  }

  return {
    widgets,
    addWidget,
    removeWidget,
  }
}
