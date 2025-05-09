import { Configuration } from 'webpack'

export type BuildPaths = {
    entry: string
    public: string 
    output: string
    src: string
}

export type BuildOptions = {
    port: number
    paths: BuildPaths
    mode: Configuration['mode'],
    analyzer: boolean
}