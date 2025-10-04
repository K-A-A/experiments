import { useState } from 'react'

type Counter = [count: number, increase: () => void, decrease: () => void]

export const useCounter = (): Counter => {
  const [count, setCount] = useState<number>(0)

  const increase = () => {
    setCount((prev) => prev + 1)
  }

  const decrease = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : prev))
  }

  return [count, increase, decrease]
}
