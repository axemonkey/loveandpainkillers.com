const calculateTrackCompletion = function(trackStatuses) {
	const relevantSteps = (trackStatuses.match(/[0-2]/g) || []).length;
	const startedSteps = (trackStatuses.match(/1/g) || []).length;
	const completedSteps = (trackStatuses.match(/2/g) || []).length;
	const progress = Math.ceil(((startedSteps / 2) + completedSteps) / relevantSteps * 100);

	return progress;
};

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/public');
	eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' });
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		// liveReload: false,
		watch: [
			'src/public/**/*',
		],
		showVersion: true,
	});

	eleventyConfig.addNunjucksGlobal('getTrackCompletion', function(trackStatuses) {
		return calculateTrackCompletion(trackStatuses);
	});

	eleventyConfig.addNunjucksGlobal('getOverallCompletion', function(tracks) {
		let count = 0;
		for (track of tracks) {
			const thisTrackCompletion = calculateTrackCompletion(track.statuses);
			count += thisTrackCompletion;
		}

		return Math.ceil(count / tracks.length);
	});

	return {
		dir: {
			includes: "_includes",
			layouts: "_layouts",
		}
	}
};
