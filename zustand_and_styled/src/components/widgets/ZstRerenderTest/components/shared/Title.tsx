type TitleProps = {
  children: string
}

export const Title = ({ children }: TitleProps): JSX.Element => (
  <div style={{ textAlign: 'center' }}>{children}</div>
)
