import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

module.exports = {
    // Other rules...
    plugins: [new NodePolyfillPlugin()],
}
