import express from 'express';
import vhost from 'vhost';

import {loveandpainkillersApp} from './loveandpainkillers.com/app.js';

const app = express();
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	app
		.use(vhost('loveandpainkillers.node', loveandpainkillersApp))
		.listen(80);
} else if (env === 'production') {
	app
		.use(vhost('loveandpainkillers.com', loveandpainkillersApp))
		.listen(8080);
}

app.get('/', function (req, res) {
	res.send('These aren\'t the droids you\'re looking for, champ.');
});
