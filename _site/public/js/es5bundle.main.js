(function () {
	'use strict';

	const getData = (filename, callback) => {
	  const xhttp = new XMLHttpRequest();
	  const ms = Date.now();
	  xhttp.onreadystatechange = () => {
	    if (xhttp.readyState === 4 && xhttp.status === 200) {
	      callback(xhttp.responseText);
	    }
	  };
	  xhttp.open('GET', "/public/data/".concat(filename, ".json?ms=").concat(ms), false);
	  xhttp.send();
	};

	const backgrounds = [{
	  author: 'Scott Webb',
	  url: 'https://unsplash.com/@scottwebb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}, {
	  author: 'Raimond Klavins',
	  url: 'https://unsplash.com/@raimondklavins?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}, {
	  author: 'S Migaj',
	  url: 'https://unsplash.com/@simonmigaj?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}, {
	  author: 'Jamie Street',
	  url: 'https://unsplash.com/@jamie452?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}, {
	  author: 'Stormseeker',
	  url: 'https://unsplash.com/@sseeker?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}, {
	  author: 'Daniel Tafjord',
	  url: 'https://unsplash.com/@danieltafjord?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}, {
	  author: 'Trym Nilsen',
	  url: 'https://unsplash.com/@trymon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
	}];
	const setupBackground = () => {
	  const theDate = new Date();
	  const theDay = theDate.getDay();
	  const unsplashLinkEl = document.querySelector('.unsplashLink');
	  document.body.classList.add("bg".concat(theDay));
	  unsplashLinkEl.innerHTML = backgrounds[theDay].author;
	  unsplashLinkEl.href = backgrounds[theDay].url;
	};

	const loadStatus = {
	  steps: false,
	  states: false
	};
	const loadData = {};
	let loadInterval;
	const gotSteps = stepsResponse => {
	  loadData.steps = JSON.parse(stepsResponse).steps;
	  loadStatus.steps = true;
	};
	const gotStates = statesResponse => {
	  loadData.states = JSON.parse(statesResponse).states;
	  loadStatus.states = true;
	};
	const makeProgressTable = statuses => {
	  // start table
	  let html = '<table class="progressTable">';
	  let index = 0;
	  for (const status of statuses) {
	    if (status <= 2) {
	      html += '<tr>';
	      html += "<th><span>".concat(loadData.steps[index], "</span></th>");
	      html += "<td class=\"status".concat(status, "\">").concat(loadData.states[status].text, "</td>");
	      html += '</tr>';
	    }
	    index++;
	  }

	  // end table
	  html += '</table>';
	  return html;
	};
	const showProgress = event => {
	  const track = event.target.tagName === 'LI' ? event.target : event.target.parentNode;
	  const trackData = track.dataset.statuses;
	  const visibleTables = document.querySelectorAll('.progressTable');
	  if (track.classList.contains('open')) {
	    track.classList.remove('open');
	    for (const table of visibleTables) {
	      table.remove();
	    }
	  } else {
	    for (const table of visibleTables) {
	      table.parentNode.classList.remove('open');
	      table.remove();
	    }
	    track.classList.add('open');
	    track.innerHTML += makeProgressTable(trackData);
	  }
	};
	const showBackground = trackEl => {
	  const completionSpan = trackEl.querySelector('.completion');
	  completionSpan.style.height = "".concat(trackEl.offsetHeight - 6, "px");
	  completionSpan.style.width = "".concat(trackEl.dataset.completion, "%");
	};
	const setupPage = () => {
	  document.body.classList.add('js');
	  setupBackground();
	  const tracks = document.querySelectorAll('.trackItem');
	  for (const track of tracks) {
	    showBackground(track);
	    track.addEventListener('click', showProgress);
	  }
	};
	const init = () => {
	  console.log('init');
	  getData('steps', gotSteps);
	  getData('states', gotStates);
	  loadInterval = window.setInterval(() => {
	    if (loadStatus.steps && loadStatus.states) {
	      window.clearInterval(loadInterval);
	      setupPage();
	    }
	  }, 500);
	};

	window.addEventListener('load', init);

})();
