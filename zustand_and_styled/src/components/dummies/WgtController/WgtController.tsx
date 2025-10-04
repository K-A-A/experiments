import { PlusMinusBtns, type PlusMinusBtnsProps } from '@/components/dummies/PlusMinusBtns'

export const WgtController = (props: PlusMinusBtnsProps) => {
  return (
    <div
      style={{
        backgroundColor: 'lightgreen',
        padding: 10,
        flexGrow: 0,
      }}
    >
      <PlusMinusBtns count={props.count} onAdd={props.onAdd} onRemove={props.onRemove} />
      {`Количество виджетов: ${props.count}`}
    </div>
  )
}
