import { ModuleOptions, runtime } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from './types'
import ReactRefreshTypeScript from 'react-refresh-typescript'

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
    const isDev = options.mode === 'development'

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    }

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [{
                        name: 'convertColors',
                        params: {
                            currentColor: true
                        }
                    }]
                }
            }
        }]
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ]
    }

    const babelLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript',
                    ['@babel/preset-react', {
                        runtime: isDev ? 'automatic' : 'classic'    // Чтобы при отладке не было React is undefined
                    }]
                ]
            }
        }
    }

    return [
        assetLoader,
        scssLoader,
        babelLoader,
        svgrLoader
    ]
}
