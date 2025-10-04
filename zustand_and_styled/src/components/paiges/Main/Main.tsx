import { CounterWithState } from '@/components/widgets/CounterWithState'
import { useCounter } from '@/stores/counter-store/useCounter'
import { WgtController } from '../../dummies/WgtController/WgtController'
import { WgtLayout } from '../../layouts/WgtLayout'

export const Main = () => {
  const [wgtCount, wgtAdd, wgtRemove] = useCounter()
  const widgets = Array.from({ length: wgtCount }, (_, i) => <CounterWithState key={i} />)

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
