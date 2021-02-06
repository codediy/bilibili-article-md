
const webpack = require('webpack');
const fs = require('fs');
const package = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf-8'}))
const path = require('path')
const WebpackUserscript = require('webpack-userscript')

function getIcon64URL() {
    const icon = fs.readFileSync('./assets/icon64.png');
    return `data:image/png;base64,${icon.toString('base64')}`;
}

function getStyleURL() {
    return `data:text/css;base64,${Buffer.from(fs.readFileSync('./src/style.css'), 'utf-8').toString('base64')}`
}


/**
 * @type {webpack.Configuration}
 */
const config = {
    entry: './src/main.ts',
    mode: 'production',
    output: {
        filename: `${package.name}.js`,
        path: path.resolve(__dirname, './dist')
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
    plugins: [new WebpackUserscript({
        headers: {
            "run-at": 'document-end',
            include: '*://member.bilibili.com/platform/*',
            grant: [
                'GM_xmlhttpRequest',
                'GM_registerMenuCommand',
                'GM_getResourceURL',,
                'GM_getResourceText',
            ],
            connect: '*',
            resource: [
                'icon ' + getIcon64URL(),
                'style ' + getStyleURL()
            ],
            icon64: getIcon64URL(),
            updateURL: 'https://raw.githubusercontent.com/Passkou/bilibili-article-md/main/dist/bilibili-article-md.user.js'
        }
    })]
};
module.exports = config;

