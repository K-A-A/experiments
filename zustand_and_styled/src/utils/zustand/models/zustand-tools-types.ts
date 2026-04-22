import type { Draft } from 'immer'
import { StoreApi } from 'zustand'
import { FC, PropsWithChildren } from 'react'

/** Третий аргумент `setState` при включённом devtools — имя действия в Redux DevTools. */
export type ZustandDevtoolsAction = string | { type: string; [key: string]: unknown }

/**
 * Обёртка над `set` Zustand с immer-рецептом; необязательные `replace` и `action`
 * пробрасываются в нативный `setState` (в т.ч. для имён действий в DevTools).
 */
export type ZustandImmerSet<TStore extends object> = (
  recipe: (draft: Draft<TStore>) => void,
  replace?: boolean,
  action?: ZustandDevtoolsAction
) => void

/**
 * Расширенный тип StoreApi с поддержкой devtools middleware.
 *
 * @template TStore Тип состояния стора.
 */
export type StoreApiWithDevtools<TStore extends object> = StoreApi<TStore> & {
  devtools?: {
    cleanup: () => void
  }
}

/**
 * Инициализатор стора: `set` с immer, полный `get`, экземпляр `store` (setState/getState/subscribe и т.д.).
 */
export type ZustandContextInitializer<TStore extends object> = (
  set: ZustandImmerSet<TStore>,
  get: StoreApi<TStore>['getState'],
  store: StoreApi<TStore> & Pick<StoreApiWithDevtools<TStore>, 'devtools'>
) => TStore

/**
 * Пропсы для провайдера Zustand-контекста.
 *
 * @template T Тип состояния стора.
 * @property children Дочерние элементы React, которые будут иметь доступ к контексту.
 * @property initialValue Начальное значение состояния, которое может переопределить дефолтные значения стора.
 * @property name Имя хранилища для DevTools
 */
export type ZustandStoreProviderProps<TStore extends object> = PropsWithChildren & {
  initialValue?: Partial<TStore>
  name?: string
}

/**
 * Селектор для выборки части состояния Zustand-стора.
 *
 * @template TStore Тип состояния стора.
 * @template U Тип выбираемого значения.
 */
export type ZustandSelector<TStore extends object, U> = (state: TStore) => U

/**
 * Функция сравнения результатов селектора.
 *
 * @template U Тип выбираемого значения.
 */
export type ZustandEqualityFn<U> = (a: U, b: U) => boolean

/**
 * Тип хука, который выбирает часть состояния из Zustand-контекста.
 *
 * @template TStore Тип состояния стора.
 */
export type ZustandStoreHook<TStore extends object> = <U>(
  selector: ZustandSelector<TStore, U>,
  equalityFn?: ZustandEqualityFn<U>
) => U

/**
 * Массив, содержащий провайдер и хук для доступа к состоянию.
 *
 * @template T Тип состояния стора.
 *
 * - Первый элемент — React-компонент-провайдер для оборачивания части дерева.
 * - Второй элемент — хук для выбора части состояния из контекста Zustand.
 */
export type ZustandContext<TStore extends object> = [
  /**
   * Провайдер контекста Zustand, который предоставляет состояние потомкам.
   */
  FC<ZustandStoreProviderProps<TStore>>,

  /**
   * Хук для получения части состояния из контекста с помощью селектора.
   */
  ZustandStoreHook<TStore>
]

export type ZustandContextOptions<TStore extends object> = {
  /** Имя хранилища для DevTools */
  name?: string
  /** Включить DevTools (по умолчанию true). */
  devtools?: boolean
  /** Начальное состояние по умолчанию, применяется при создании контекста. */
  defaultState?: Partial<TStore>
}
