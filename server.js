// import express from 'express';
// import vhost from 'vhost';

import {loveandpainkillersApp} from './loveandpainkillers.com/app.js';

// const app = express();
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	loveandpainkillersApp
		// .use(vhost('loveandpainkillers.node', loveandpainkillersApp))
		.listen(7777);
} else if (env === 'production') {
	loveandpainkillersApp
		// .use(vhost('loveandpainkillers.com', loveandpainkillersApp))
		.listen(process.env.PORT); // heroku specifies port number
}
