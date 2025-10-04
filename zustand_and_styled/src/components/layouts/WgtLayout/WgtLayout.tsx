type WgtLayoutProps = {
  children: JSX.Element[]
}

export const WgtLayout = ({ children }: WgtLayoutProps) => (
  <div
    style={{
      backgroundColor: 'lightcyan',
      flexGrow: 1,
      overflow: 'auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      padding: 10,
      alignContent: 'start',
    }}
  >
    {children}
  </div>
)
