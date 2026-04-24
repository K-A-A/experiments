import { useState } from 'react'
import { CounterWithState } from '@/components/widgets/CounterWithState'
import { RandomJoke } from '@/components/widgets/RandomJoke'
import { ZstRerenderTest } from '@/components/widgets/ZstRerenderTest'

export const useMain = () => {
  const [widgets, setWidgets] = useState<JSX.Element[]>([])

  const addWidget = () => {
    setWidgets((prev) => [...prev, getWgt(prev.length)])
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

const getWgt = (key: number): JSX.Element => {
  const wgtSelector = Math.floor(Math.random() * 10) % 3
  switch (wgtSelector) {
    case 0:
      return <CounterWithState key={key} />
    case 1:
      return <RandomJoke key={key} />
    case 2:
      return <ZstRerenderTest key={key} />
  }

  return <div>DEFAULT</div>
}
