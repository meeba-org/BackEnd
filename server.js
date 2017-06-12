const express = require('express')
const app = express()
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
	res.send('meeba says: Hello World!!! test')
});

app.listen(app.get('port'), function () {
	console.log('Example app listening on port ' + app.get('port'));
});

module.exports = app;