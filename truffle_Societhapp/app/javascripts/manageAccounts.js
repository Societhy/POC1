function createKey() {
    var accountObject = browserAccounts.new('lolol0o');
    var JSONData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(accountObject));
    var link = document.createElement('a');
    link.href = "data: " + JSONData;
    link.download = 'data.json';
    link.innerHTML = 'download JSON';
    var container = document.getElementById('exportWallet');
    container.appendChild(link);
    console.log(accountObject);
}

function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
	alert("The file API isn't supported on this browser yet.");
	return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
	alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
	alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
	alert("Please select a file before clicking 'Load'");
    }
    else {
	file = input.files[0];
	fr = new FileReader();
	fr.onload = receivedText;
	fr.readAsText(file);
    }

    function receivedText(e) {
	lines = e.target.result;
	var newArr = JSON.parse(lines);
	var newAccount = browserAccounts.set(newArr.address, newArr);
	console.log(newArr);
    }
}

function listAccounts() {
    browserAccount = browserAccounts.get();
    for (var elem in browserAccount)
    {
	if (elem !== "selected")
	    console.log(elem);
    }
    for (var elem in accounts)
	console.log(accounts[elem]);
}

function clearAccounts() {
    browserAccounts.clear();
}
