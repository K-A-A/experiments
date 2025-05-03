import path from 'path'
import webpack, { Configuration } from 'webpack'
import { buildWebpack } from './config/buildWebpack'

type EnvVars = {
    mode: Configuration['mode']
    port: number
    analyzer: boolean
}

export default (env: EnvVars): webpack.Configuration =>
    buildWebpack({
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            output: path.resolve(__dirname, 'static'),
            public: path.resolve(__dirname, 'public'),
            src: path.resolve(__dirname, 'src')
        },
        mode: env.mode ?? 'development',
        port: env.port ?? 3000,
        analyzer: env.analyzer
    })
