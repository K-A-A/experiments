import { createContext, useContext, useEffect, useRef } from 'react'
import { StoreApi, createStore, useStore, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'
import {
  StoreApiWithDevtools,
  ZustandContext,
  ZustandContextInitializer,
  ZustandContextOptions,
  ZustandDevtoolsAction,
  ZustandImmerSet,
  ZustandStoreProviderProps,
} from '../models'
import { formatLocalTimestamp } from '../utils/datetime'

export const createZustandContext = <TStore extends object>(
  /**
   * Инициализатор стора. Возвращает объект состояния и действий.
   * `set` — immer-рецепт; необязательно передайте `replace` и `action` (имя шага в Redux DevTools).
   * `store` — полный API экземпляра Zustand (`setState` со всеми аргументами, `subscribe`, …).
   */
  storeInitializer: ZustandContextInitializer<TStore>,
  storeOptions?: ZustandContextOptions<TStore>
): ZustandContext<TStore> => {
  if (!storeOptions) {
    storeOptions = { name: undefined, devtools: false }
  }
  const StoreContext = createContext<StoreApi<TStore> | undefined>(undefined)

  const StoreProvider = ({ children, initialValue, name }: ZustandStoreProviderProps<TStore>) => {
    // Обязательно генерируем имя, даже если не передано. Все имена дополняем датой, чтобы различать экземпляры и порядок их создания.
    name ??= storeOptions.name
    name = `${name ?? 'zustand-tools'} ${formatLocalTimestamp()}`

    const createdRef = useRef<StoreApiWithDevtools<TStore> | null>(null)
    if (!createdRef.current) {
      const initializer: StateCreator<TStore> = (set, get, store) => {
        const setWithImmer: ZustandImmerSet<TStore> = (recipe, replace, action) => {
          const updater = (state: TStore) => produce(state, recipe)
          if (replace === undefined && action === undefined) {
            set(updater)
          } else {
            ;(
              set as (
                partial: typeof updater,
                replace?: boolean,
                action?: ZustandDevtoolsAction
              ) => void
            )(updater, replace, action)
          }
        }

        const base = storeInitializer(setWithImmer, get, store as StoreApiWithDevtools<TStore>)
        const mergedDefault = storeOptions.defaultState
          ? { ...base, ...storeOptions.defaultState }
          : base

        const mergedInitial = initialValue ? { ...mergedDefault, ...initialValue } : mergedDefault
        return mergedInitial
      }

      const store = (
        storeOptions.devtools === false
          ? createStore<TStore>()(initializer)
          : createStore<TStore>()(devtools(initializer, { name }))
      ) as StoreApiWithDevtools<TStore>
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
