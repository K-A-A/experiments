import webpack from 'webpack'

import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types'


export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
    const { mode, paths } = options
    const isDev = mode === 'development'

    return {
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        mode,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),        
        devtool: isDev && 'source-map',
        devServer: buildDevServer(options),
        watchOptions: {
            ignored: /node_modules/
        }
    }
}
