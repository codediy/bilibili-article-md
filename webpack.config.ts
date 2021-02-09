
import webpack from 'webpack';
import fs from 'fs';
const package_ = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf-8'}))
import path from 'path';
import WebpackUserscript from 'webpack-userscript';
import TerserWebpackPlugin from 'terser-webpack-plugin';

function getIcon64URL() {
    const icon = fs.readFileSync('./assets/icon64.png');
    return `data:image/png;base64,${icon.toString('base64')}`;
}

function getStyleURL() {
    return `data:text/css;base64,${fs.readFileSync('./src/style.css').toString('base64')}`
}

const isDebug: boolean = process.env.NODE_ENV === 'development';

const config: webpack.Configuration = {
    entry: './src/main.ts',
    output: {
        filename: isDebug ? `${package_.name}.dev.js` : `${package_.name}.js`,
        path: path.resolve(__dirname, isDebug ? './dev' : './dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.json', '.js']
    },
    optimization: {
        minimizer: [<any>new TerserWebpackPlugin()]
    },
    plugins: [new WebpackUserscript({
        headers: {
            name: isDebug ? package_.name + '-dev' : package_.name,
            "run-at": 'document-end',
            include: '*://member.bilibili.com/platform/*',
            grant: [
                'GM_xmlhttpRequest',
                'GM_registerMenuCommand',
                'GM_getResourceURL',
                'GM_getResourceText',
            ],
            connect: '*',
            resource: [
                'icon ' + getIcon64URL(),
                'style ' + getStyleURL()
            ],
            icon64: getIcon64URL(),
            updateURL: 'https://raw.githubusercontent.com/Passkou/bilibili-article-md/main/dist/bilibili-article-md.user.js',
            namespace: 'passkou'
        }
    })]
};
export default config;

