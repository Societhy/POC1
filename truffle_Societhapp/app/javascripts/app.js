if (typeof(web3) === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));

// var socket = io();
var browserAccounts = new Accounts({minPassphraseLength : 0});
var accounts;
var account;
var balance;
var ethbalance;
var socket = io();


socket.on('userData', function (fName, lName) {
    var firstName_elem = document.getElementById("firstName");
    var lastName_elem = document.getElementById("lastName");

    firstName_elem.innerHTML = fName;
    lastName_elem.innerHTML = lName;
});



function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};

function refreshBalance() {
    var ethvalue = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase));
    var latestBlock = web3.eth.blockNumber;

    var latestBlock_elem = document.getElementById("latestBlock");
    var ethbalance_elem = document.getElementById("ethbalance");
    // meta.getBalance.call(account, {from: account}).then(function(value) {
    // 	var balance_element = document.getElementById("balance");
    // 	balance_element.innerHTML = value.valueOf();
    // }).catch(function(e) {
    // 	console.log(e);
    // 	setStatus("Error getting balance; see log.");
    // });

    ethbalance_elem.innerHTML = ethvalue.valueOf();
    latestBlock_elem.innerHTML = latestBlock.valueOf();
};

function getPeerNumber() {
    var peers_elem = document.getElementById("peerNumber");
    peers_elem.innerHTML = web3.net.peerCount.valueOf();
}

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
    accounts = browserAccounts.get();
    for (var elem in accounts)
    {
	if (elem !== "selected")
	    console.log(elem);
    }
}

function clearAccounts() {
    browserAccounts.clear();
}

function sendCoin() {
    var transactionHash = null;
    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    setStatus("Initiating transaction... (please wait)");
    
    filter = web3.eth.filter('latest');

    web3.eth.sendTransaction({to: receiver, value: web3.toWei(amount), from: account}, function(err, address){
	if (err) {
    	    console.error(err);
    	    setStatus("Error sending coin; see log.");
	}
	else
	{
    	    setStatus("Transaction sent!");
	    filter.watch(function(err, logs) {
		if (err)
		    console.error(err);
		else
		{
		    if (web3.eth.getTransaction(address).blockHash === logs) {
    		    	setStatus("Transaction mined!");
			filter.stopWatching();
		    }
		}
	    });
	}
    });
};

window.onload = function() {
    web3.eth.getAccounts(function(err, accs) {
	if (err != null) {
	    console.error(err);
	    alert("There was an error fetching your accounts.");
	    return;
	}

	if (accs.length == 0) {
	    alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
	    return;
	}
	
	accounts = accs;
	account = accounts[0];

	refreshBalance();
	getPeerNumber();
	filter = web3.eth.filter('latest');
	filter.watch(function(err, logs) {
	    if (err)
		console.error(err);
	    else
	    {
    		refreshBalance();
		getPeerNumber();
	    }
	});
    });
}
