import { WgtController } from '../../dummies/WgtController/WgtController'
import { WgtLayout } from '../../layouts/WgtLayout'
import { useMain } from './useMain'

export const Main = () => {
  const { wgtCount, wgtAdd, wgtRemove, widgets } = useMain()

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
      <WgtController onAdd={wgtAdd} onRemove={wgtRemove} count={wgtCount} />
      <WgtLayout>{widgets}</WgtLayout>
    </div>
  )
}
