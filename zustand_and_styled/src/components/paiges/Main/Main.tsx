import { WgtController } from '../../dummies/WgtController/WgtController'
import { WgtLayout } from '../../layouts/WgtLayout'
import { useMain } from './useMain'

export const Main = () => {
  const { widgets, addWidget, removeWidget } = useMain()

  return (
    <div
      style={{
        backgroundColor: 'lightcoral',
        height: '100vh',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'auto',
      }}
    >
      <WgtController onAdd={addWidget} onRemove={removeWidget} count={widgets.length} />
      <WgtLayout>{widgets}</WgtLayout>
    </div>
  )
}
