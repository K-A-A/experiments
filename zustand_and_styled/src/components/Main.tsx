export const Main = () => {
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
      <div
        style={{
          backgroundColor: 'lightgreen',
          flexGrow: 0,
        }}
      >
        Header
      </div>
      <div
        style={{
          backgroundColor: 'lightcyan',
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        Layout
      </div>
    </div>
  )
}
