import { createRoot } from 'react-dom/client'
import App from './containers/App'

const root = document.getElementById('root')

if (!root) throw new Error('Root element not found!')

const container = createRoot(root)

container.render(<App></App>)
