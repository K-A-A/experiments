import { Configuration } from 'webpack'

export type BuildPaths = {
    entry: string
    html: string 
    output: string
}

export type BuildOptions = {
    port: number
    paths: BuildPaths
    mode: Configuration['mode'],
    analyzer: boolean
}