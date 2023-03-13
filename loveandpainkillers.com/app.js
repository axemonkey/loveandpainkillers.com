import path from 'path';
import {createRequire} from 'module';
import express from 'express';
import hbs from 'handlebars';
import {engine} from 'express-handlebars';
import {tracksModule} from './tracks.js';

const require = createRequire(import.meta.url);
const updates = require('./data/updates.json');

const appFolder = `${path.resolve()}/loveandpainkillers.com`;
const loveandpainkillersApp = express();
const env = process.env.NODE_ENV || 'development';

const bgs = [
	{
		filename: 'scott-webb-F5NcnzZK3_0-unsplash.jpg',
		author: 'Scott Webb',
		url: 'https://unsplash.com/@scottwebb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		filename: 'raimond-klavins-n-7HTOiJPso-unsplash.jpg',
		author: 'Raimond Klavins',
		url: 'https://unsplash.com/@raimondklavins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		filename: 's-migaj-VjIm5-UkvfY-unsplash.jpg',
		author: 'S Migaj',
		url: 'https://unsplash.com/@simonmigaj?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		filename: 'jamie-street-OKwXxtFj3aE-unsplash.jpg',
		author: 'Jamie Street',
		url: 'https://unsplash.com/@jamie452?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		filename: 'stormseeker-oXo6IvDnkqc-unsplash.jpg',
		author: 'Stormseeker',
		url: 'https://unsplash.com/@sseeker?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		filename: 'daniel-tafjord-9p7nBsrcCt0-unsplash.jpg',
		author: 'Daniel Tafjord',
		url: 'https://unsplash.com/@danieltafjord?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		filename: 'trym-nilsen-eXV-LsWfCOo-unsplash.jpg',
		author: 'Trym Nilsen',
		url: 'https://unsplash.com/@trymon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
];

// CSP
// loveandpainkillersApp.use(function (req, res, next) {
// 	res.setHeader('Content-Security-Policy', 'script-src \'self\' \'unsafe-eval\' \'https://storage.ko-fi.com\'');
// 	return next();
// });

hbs.registerHelper('eq', function (a, b) {
	return (a === b);
});

loveandpainkillersApp.engine('hbs', engine({
	extname: 'hbs',
}));
loveandpainkillersApp.set('views', `${appFolder}/views`);
loveandpainkillersApp.set('view engine', 'hbs');
loveandpainkillersApp.use(express.static(`${appFolder}/public`));

loveandpainkillersApp.get('/', (req, res) => {
	const title = `Love &amp; Painkillers${(env === 'development' ? '::DEV' : '')}`;
	const bgIndex = new Date().getDay();
	const whatBg = bgs[bgIndex];

	res.render('index', {
		definites: tracksModule.definites,
		possibles: tracksModule.possibles,
		overall: tracksModule.overall,
		title,
		updates,
		bg: whatBg,
		bgIndex,
	});
});

// exports.app = app;

export {loveandpainkillersApp};
