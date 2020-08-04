/* eslint-disable import/no-commonjs */

module.exports = {
    mode: 'request-once',
    mockServer: {
        port: 3005,
        proxy: 'http://ip-29-rongyue-swagger.coralcodes.com',
        timeout: 1000,
    },
}
