import { PlusMinusBtns } from '../PlusMinusBtns'
import type { PlusMinusBtnsProps } from '../PlusMinusBtns'

export const Counter = (props: PlusMinusBtnsProps): JSX.Element => {
  return (
    <div
      style={{
        backgroundColor: 'orange',
        height: 200,
        padding: 10,
      }}
    >
      <div>{`Текущее значение: ${props.count}`}</div>
      <PlusMinusBtns count={props.count} onAdd={props.onAdd} onRemove={props.onRemove} />
    </div>
  )
}
