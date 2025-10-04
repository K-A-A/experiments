import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

type JokeSingleDTO = {
  type: 'single'
  joke: string
}

type JokeDoubleDTO = {
  type: 'double'
  setup: string
  delivery: string
}

type JokeDTO = JokeSingleDTO | JokeDoubleDTO

export const useRandomJoke = () => {
  const [joke, setJoke] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  const getJoke = async () => {
    abortControllerRef.current?.abort('Запрос за шуткой отменён. Причина - новый запрос')
    abortControllerRef.current = new AbortController()

    setIsLoading(true)
    setError('')

    try {
      const joke = await axios.get<JokeDTO>('https://sv443.net/jokeapi/v2/joke/Programming', {
        signal: abortControllerRef.current.signal,
      })

      setJoke(
        joke.data.type === 'single' ? joke.data.joke : `${joke.data.setup} ${joke.data.delivery}`
      )
      abortControllerRef.current = null
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Запрос отменён:', err.message)
      } else {
        setError('Ошибка выполнения запроса!')
        console.log('Ошибка выполения запроса:', (err as Error).message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const cancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort('Запрос за шуткой отменён. Причина - пользователь.')
      abortControllerRef.current = null
    }

    setIsLoading(false)
  }

  useEffect(() => {
    void getJoke()
    return cancel
  }, [])

  return { joke, isLoading, error, getJoke, cancel }
}
