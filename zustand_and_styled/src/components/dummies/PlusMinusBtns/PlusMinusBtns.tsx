export type PlusMinusBtnsProps = {
  count: number
  onAdd: () => void
  onRemove: () => void
}

export const PlusMinusBtns = (props: PlusMinusBtnsProps): JSX.Element => (
  <div>
    <button onClick={props.onAdd}>+</button>
    <button onClick={props.onRemove} disabled={props.count < 1}>
      -
    </button>
  </div>
)
