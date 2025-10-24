import { createContext, useContext, useEffect, useRef } from 'react'
import { v4 } from 'uuid'
import { StoreApi, createStore, useStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Draft, produce } from 'immer'
import { ZustandContext, ZustandContextOptions, ZustandStoreProviderProps } from './types'

export const createZustandContext = <TStore extends object, TAction = never>(
  /**
   * Инициализатор стора. Возвращает объект состояния и действий.
   * Внутри set используется immer-подобный апдейтер для удобства.
   */
  storeInitializer: (
    set: (recipe: (draft: Draft<TStore>) => void) => void,
    get: StoreApi<TStore>['getState']
  ) => TStore,
  storeOptions?: ZustandContextOptions<TStore>
): ZustandContext<TStore> => {
  if (!storeOptions) {
    storeOptions = { name: undefined, devtools: false }
  }
  storeOptions.name ??= `zustand:${v4()}`

  const StoreContext = createContext<StoreApi<TStore> | undefined>(undefined)

  const StoreProvider = ({ children, initialValue }: ZustandStoreProviderProps<TStore>) => {
    const createdRef = useRef<StoreApi<TStore> | null>(null)
    if (!createdRef.current) {
      const enhancer = (fn: any) =>
        storeOptions.devtools === false ? fn : devtools(fn, { name: storeOptions.name })

      const initializer = (
        set: StoreApi<TStore>['setState'],
        get: StoreApi<TStore>['getState']
      ) => {
        const setWithImmer = (recipe: (draft: Draft<TStore>) => void) =>
          set((state) => produce(state, recipe))

        const base = storeInitializer(setWithImmer, get)
        const mergedDefault = storeOptions.defaultState
          ? { ...base, ...storeOptions.defaultState }
          : base

        const mergedInitial = initialValue ? { ...mergedDefault, ...initialValue } : mergedDefault
        return mergedInitial
      }

      const store = createStore<TStore>()(enhancer(initializer as any))
      createdRef.current = store
    }

    useEffect(() => {
      return () => {
        createdRef.current?.devtools?.cleanup()
      }
    }, [])

    return <StoreContext.Provider value={createdRef.current!}>{children}</StoreContext.Provider>
  }

  const useStoreContext = <U,>(
    selector: (state: TStore) => U,
    _equalityFn?: (a: U, b: U) => boolean
  ): U => {
    const store = useContext(StoreContext)
    if (!store) {
      throw new Error(`${storeOptions.name} provider for context is missing`)
    }
    // Note: current zustand version in project may not support equality function in this overload
    return useStore(store, selector)
  }

  return [StoreProvider, useStoreContext]
}
