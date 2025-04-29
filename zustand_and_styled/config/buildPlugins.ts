import webpack, { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BuildOptions } from './types'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export const buildPlugins = ({ paths, mode, analyzer }: BuildOptions): Configuration['plugins'] => {
    const isDev = mode === 'development'
    const isProd = mode === 'production'
    
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html
        })
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
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