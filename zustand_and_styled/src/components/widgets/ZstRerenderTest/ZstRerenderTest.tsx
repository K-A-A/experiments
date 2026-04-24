import {
  ZstCounter1,
  ZstCounter2,
  ZstCounter31,
  ZstCounter32,
  ZstCounter41,
  ZstCounter411,
} from './components'
import { ZstRerenderTestProvider } from './store/store'

export const ZstRerenderTest = (): JSX.Element => {
  return (
    <ZstRerenderTestProvider>
      <div
        style={{
          backgroundColor: 'lightblue',
          height: 200,
          padding: 10,
          overflow: 'auto',
          display: 'grid',
          gridAutoFlow: 'column',
          columnGap: 10,
        }}
      >
        <ZstCounter1 />
        <ZstCounter2 />
        <ZstCounter31 />
        <ZstCounter32 />
        <ZstCounter41 />
        <ZstCounter411 />
      </div>
    </ZstRerenderTestProvider>
  )
}
