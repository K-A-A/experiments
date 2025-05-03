import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types'

export const buildDevServer = (options: BuildOptions): DevServerConfiguration => ({
    port: options.port,
    hot: true
})
