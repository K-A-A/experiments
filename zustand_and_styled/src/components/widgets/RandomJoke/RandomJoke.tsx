import { useRandomJoke } from './useRandomJoke'

export const RandomJoke = (): JSX.Element => {
  const { joke, error, isLoading, getJoke, cancel } = useRandomJoke()

  return (
    <div
      style={{
        backgroundColor: 'gold',
        height: 200,
        padding: 10,
        overflow: 'auto',
      }}
    >
      <div>Случайная шутка:</div>
      {isLoading && <div>Идёт загрузка...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!isLoading && joke && <div>{joke}</div>}
      {!isLoading ? (
        <button onClick={() => void getJoke()}>Загрузить новую шутку</button>
      ) : (
        <button onClick={cancel}>Отменить</button>
      )}
    </div>
  )
}
