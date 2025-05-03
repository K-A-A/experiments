import webpack, { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BuildOptions } from './types'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import path from 'path'

export const buildPlugins = ({ paths, mode, analyzer }: BuildOptions): Configuration['plugins'] => {
    const isDev = mode === 'development'
    const isProd = mode === 'production'
    
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: path.resolve(paths.public, 'index.html'),
            favicon: path.resolve(paths.public, 'favicon.ico'),
            publicPath: '/'
        }),
        new DefinePlugin({
            IS_DEV: isDev
        })
    ]

    if (isDev) {
        plugins.push(
            new webpack.ProgressPlugin(),
            new ForkTsCheckerWebpackPlugin(),
            new ReactRefreshWebpackPlugin()
        )
    }

    if (isProd){
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
    }
        
    if (analyzer)
        plugins.push(new BundleAnalyzerPlugin())
    
    return plugins
}