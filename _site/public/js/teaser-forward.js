const DEBUG = false;

const clog = msg => {
	if (DEBUG) {
		console.log(msg);
	}
};

const init = () => {
	clog('teaser load');

	const launch = {
		year: 2024,
		month: 1,
		date: 2,
	};

	const secondInMs = 1000;
	const minuteInMs = secondInMs * 60;
	const hourInMs = minuteInMs * 60;
	const dayInMs = hourInMs * 24;

	const now = new Date();
	const launchDate = new Date();
	launchDate.setFullYear(launch.year, launch.month, launch.date);
	launchDate.setHours(0, 0, 0, 0);

	const timeLeftUntilLaunch = launchDate.getTime() - now.getTime();
	let msLeftUntilLaunch = timeLeftUntilLaunch;

	clog(`timeLeftUntilLaunch: ${timeLeftUntilLaunch}`);
	clog(`now: ${now}`);
	clog(`launchDate: ${launchDate}`);

	if (msLeftUntilLaunch > 0) {
		const wholeDaysLeft = Math.floor(msLeftUntilLaunch / dayInMs);
		msLeftUntilLaunch -= (wholeDaysLeft * dayInMs);
		const wholeHoursLeft = Math.floor(msLeftUntilLaunch / hourInMs);
		msLeftUntilLaunch -= (wholeHoursLeft * hourInMs);
		const wholeMinutesLeft = Math.floor(msLeftUntilLaunch / minuteInMs);
		msLeftUntilLaunch -= (wholeMinutesLeft * minuteInMs);
		const wholeSecondsLeft = Math.floor(msLeftUntilLaunch / secondInMs);

		clog(`wholeDaysLeft: ${wholeDaysLeft}`);
		clog(`wholeHoursLeft: ${wholeHoursLeft}`);
		clog(`wholeMinutesLeft: ${wholeMinutesLeft}`);
		clog(`wholeSecondsLeft: ${wholeSecondsLeft}`);

		const timeStr = `${wholeDaysLeft}d ${wholeHoursLeft}h ${wholeMinutesLeft}m`;

		document.querySelector('h1').textContent = timeStr;
	} else {
		document.location.href = '/launch';
	}
};

window.addEventListener('load', init);
