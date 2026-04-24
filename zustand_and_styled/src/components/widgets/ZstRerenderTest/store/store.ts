import { createZustandContext } from '@/utils/zustand'

type ZstRerenderTestState = {
  count1: number
  count2: number
  nested3: {
    count31: number
    count32: number
  }
  nested4: {
    count41: number
    nested41: {
      count411: number
    }
  }
  incCount1: () => void
  incCount2: () => void
  incCount31: () => void
  incCount32: () => void
  incCount41: () => void
  incCount411: () => void
}

const [ZstRerenderTestProvider, useZstRerenderTestStore] =
  createZustandContext<ZstRerenderTestState>(
    (set) => ({
      count1: 0,
      count2: 0,
      nested3: {
        count31: 0,
        count32: 0,
      },
      nested4: {
        count41: 0,
        nested41: {
          count411: 0,
        },
      },
      incCount1: () =>
        set((draft) => {
          draft.count1++
        }),
      incCount2: () =>
        set((draft) => {
          draft.count2++
        }),
      incCount31: () =>
        set((draft) => {
          draft.nested3.count31++
        }),
      incCount32: () =>
        set((draft) => {
          draft.nested3.count32++
        }),
      incCount41: () =>
        set((draft) => {
          draft.nested4.count41++
        }),
      incCount411: () =>
        set((draft) => {
          draft.nested4.nested41.count411++
        }),
    }),
    {
      name: 'zst-rerender-test',
      devtools: true,
    }
  )

export { ZstRerenderTestProvider, useZstRerenderTestStore }
