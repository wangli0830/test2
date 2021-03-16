module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/dist/'
    : '/',
    devServer: {
        before: function (app, server, compiler) {
            app.get('/api/test', function (req, res) {
                // console.log(server, 'server', compiler)
                res.json({ custom: 'response' });
            });
            app.post('/api/test', function (req, res) {
                // console.log(server, 'server', compiler)
                res.json({
                    code: 0,
                    data: {

                    },
                    msg: '请求成功'
                });
            });
        }
    },
    // proxy: {
    //     '/api': 'http://localhost:3000'
    // }
}