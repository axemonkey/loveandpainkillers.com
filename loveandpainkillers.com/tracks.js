import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const {tracks} = require('./data/tracks.json');

const definites = [];
const possibles = [];
const completions = [];

const calculateTrackCompletion = track => {
	const trackData = track.statuses;
	const relevantSteps = (trackData.match(/[0-2]/g) || []).length;
	const startedSteps = (trackData.match(/1/g) || []).length;
	const completedSteps = (trackData.match(/2/g) || []).length;
	const progress = Math.ceil(((startedSteps / 2) + completedSteps) / relevantSteps * 100);

	return progress;
};

const average = array => array.reduce((a, b) => a + b) / array.length;

for (const track of tracks) {
	if (track.definite) {
		track.completion = calculateTrackCompletion(track);
		completions.push(track.completion);
		definites.push(track);
	} else {
		possibles.push(track);
	}
}

const overall = Number.parseInt(average(completions), 10);

const tracksModule = {
	definites,
	possibles,
	overall,
};

export {tracksModule};
