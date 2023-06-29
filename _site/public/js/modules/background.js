const backgrounds = [
	{
		author: 'Scott Webb',
		url: 'https://unsplash.com/@scottwebb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		author: 'Raimond Klavins',
		url: 'https://unsplash.com/@raimondklavins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		author: 'S Migaj',
		url: 'https://unsplash.com/@simonmigaj?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		author: 'Jamie Street',
		url: 'https://unsplash.com/@jamie452?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		author: 'Stormseeker',
		url: 'https://unsplash.com/@sseeker?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		author: 'Daniel Tafjord',
		url: 'https://unsplash.com/@danieltafjord?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
	{
		author: 'Trym Nilsen',
		url: 'https://unsplash.com/@trymon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
	},
];

const setupBackground = () => {
	const theDate = new Date();
	const theDay = theDate.getDay();
	const unsplashLinkEl = document.querySelector('.unsplashLink');

	document.body.classList.add(`bg${theDay}`);
	unsplashLinkEl.innerHTML = backgrounds[theDay].author;
	unsplashLinkEl.href = backgrounds[theDay].url;
};

export default setupBackground;
