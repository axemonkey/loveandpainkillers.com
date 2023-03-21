import {loveandpainkillersApp} from './loveandpainkillers.com/app.js';

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	loveandpainkillersApp
		.listen(7777);
} else if (env === 'production') {
	loveandpainkillersApp
		.listen(process.env.PORT); // host specifies port number
}
