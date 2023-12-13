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
	  xhttp.open('GET', `/public/data/${filename}.json?ms=${ms}`, false);
	  xhttp.send();
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
	      html += `<th><span>${loadData.steps[index]}</span></th>`;
	      html += `<td class="status${status}">${loadData.states[status].text}</td>`;
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
	  completionSpan.style.height = `${trackEl.offsetHeight - 6}px`;
	  completionSpan.style.width = `${trackEl.dataset.completion}%`;
	};
	const setupPage = () => {
	  document.body.classList.add('js');
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
