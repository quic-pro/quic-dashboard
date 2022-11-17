const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = function override(config) {
    config.resolve.fallback = {buffer: require.resolve('buffer')};
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    );
    config.plugins.push(
        new CopyPlugin(
            {
                patterns: [
                    {
                        from: './public/manifest.json',
                        transform(content, path) {
                            return content
                                .toString()
                                .replace(
                                    '%REACT_APP_DOMAIN%',
                                    process.env.REACT_APP_DOMAIN
                                )
                        }
                    }
                ]
            }
        )
    );
    return config;
};
