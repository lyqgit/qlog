import babel from '@rollup/plugin-babel';
import { resolve,dirname  } from 'path'
import terser from '@rollup/plugin-terser';
import { fileURLToPath } from 'url';
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import nodeResolve from '@rollup/plugin-node-resolve';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

function createFile(path:string){
    return resolve(__dirname,path)
}

const isProduction = process.env.NODE_ENV === 'production'


const pluginsWithEnv = isProduction ? [terser()] : [serve({
    port: 10001,
    contentBase: ['examples']
}), livereload({watch: 'examples/qlog.umd.js'})]


export default defineConfig({
    input:createFile('src/index.ts'),
    output:[
        {
            file:createFile(isProduction?'dist/qlog.es.js':'examples/qlog.es.js'),
            name:'qlog',
            format: 'es',
            sourcemap:!isProduction
        },
        {
            file:createFile(isProduction?'dist/qlog.umd.js':'examples/qlog.umd.js'),
            name:'qlog',
            format: 'umd',
            sourcemap:!isProduction
        }
    ],
    plugins:[
        babel({ babelHelpers: 'bundled' }),
        typescript({
            compilerOptions: {
                lib: ["es5", "es6", "dom"], 
                target: "es5",
                esModuleInterop: true,
                allowSyntheticDefaultImports: true,
                allowImportingTsExtensions:true
            },
            include:'src/*'
        }),
        nodeResolve(),
        ...pluginsWithEnv
    ]
})