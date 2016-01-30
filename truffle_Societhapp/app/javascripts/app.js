var accounts;
var account;
var balance;
var ethbalance;

function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};

function refreshBalance() {
    var meta = MetaCoin.deployed();
    var ethbalance_elem = document.getElementById("ethbalance");
    var ethvalue = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase));
    
    meta.getBalance.call(account, {from: account}).then(function(value) {
	var balance_element = document.getElementById("balance");
	balance_element.innerHTML = value.valueOf();
    }).catch(function(e) {
	console.log(e);
	setStatus("Error getting balance; see log.");
    });
    ethbalance_elem.innerHTML = ethvalue.valueOf();
};

function getApi() {
    var api_elem = document.getElementById("apiVersion");
    api_elem.innerHTML = web3.version.api;
}

function sendCoin() {
    var meta = MetaCoin.deployed();

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    setStatus("Initiating transaction... (please wait)");

    meta.sendCoin(receiver, amount, {from: account}).then(function() {
	setStatus("Transaction complete!");
	refreshBalance();
    }).catch(function(e) {
	console.log(e);
	setStatus("Error sending coin; see log.");
    });
};

window.onload = function() {
    web3.eth.getAccounts(function(err, accs) {
	if (err != null) {
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
	getApi();
    });
}
