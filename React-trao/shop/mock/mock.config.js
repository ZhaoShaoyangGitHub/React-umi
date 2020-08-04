/* eslint-disable import/no-commonjs */

module.exports = {
    mode: 'request-timeout',
    mockServer: {
        port: 3005,
        proxy: 'http://ip-27-rongyue-technician-swagger.coralcodes.com',
        timeout: 1,
        checkParams: true,
    },
}
