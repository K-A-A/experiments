import { FC, PropsWithChildren } from 'react'

/**
 * Пропсы для провайдера Zustand-контекста.
 *
 * @template T Тип состояния стора.
 * @property children Дочерние элементы React, которые будут иметь доступ к контексту.
 * @property initialValue Начальное значение состояния, которое может переопределить дефолтные значения стора.
 */
export type ZustandStoreProviderProps<TStore extends object> = PropsWithChildren & {
  initialValue?: Partial<TStore>
}

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
   *
   * @template U Тип возвращаемого значения из селектора.
   * @param selector Функция, выбирающая часть состояния.
   * @returns Выбранное состояние.
   */
  <U>(selector: (state: TStore) => U, equalityFn?: (a: U, b: U) => boolean) => U,
]

export type ZustandContextOptions<TStore extends object> = {
  /** Имя стора для DevTools */
  name?: string
  /** Включить DevTools (по умолчанию true). */
  devtools?: boolean
  /** Начальное состояние по умолчанию, применяется при создании контекста. */
  defaultState?: Partial<TStore>
}
