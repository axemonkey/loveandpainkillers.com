const getData = (filename, callback) => {
	const xhttp = new XMLHttpRequest();
	const ms = Date.now();
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			callback(xhttp.responseText);
		}
	};
	xhttp.open('GET', `../data/${filename}.json?ms=${ms}`, false);
	xhttp.send();
};

export default getData;
