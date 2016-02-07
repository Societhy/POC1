if (typeof(web3) === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));

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
		loadContract();
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
