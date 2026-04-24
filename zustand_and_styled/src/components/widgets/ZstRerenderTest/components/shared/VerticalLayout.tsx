import type { CSSProperties, ReactNode } from 'react'

type VerticalLayoutProps = {
  children: ReactNode
  gridTemplateRows: string
  style?: CSSProperties
}

export const VerticalLayout = ({
  children,
  gridTemplateRows,
  style,
}: VerticalLayoutProps): JSX.Element => {
  return <div style={{ display: 'grid', gridTemplateRows, ...style }}>{children}</div>
}
