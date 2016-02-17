var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8103"));

var accounts;
var account;
var browserAccounts;

function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};


function refreshBalance() {
	var ethvalue = web3.fromWei(web3.eth.getBalance(account));
    var latestBlock = web3.eth.blockNumber;

    var latestBlock_elem = document.getElementById("latestBlock");
    var ethbalance_elem = document.getElementById("ethbalance");

	ethbalance_elem.innerHTML = ethvalue.valueOf();
    latestBlock_elem.innerHTML = latestBlock.valueOf();
};

function tryDeploy() {
    var name = document.getElementById("trydeploy");
    createNewOrga();
    if (name) {
	self.location.href = "debug.html";
    }
}

function getPeerNumber() {
    var peers_elem = document.getElementById("peerNumber");
    peers_elem.innerHTML = web3.net.peerCount.valueOf();
}


function sendCoin() {
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


function update() {
    refreshBalance();
    getPeerNumber();
    //createNewOrga();
    //createNewCampaign();
    filter = web3.eth.filter('latest');
    filter.watch(function (err, logs) {
	if (err)
	    console.error(err);
	else {
	    refreshBalance();
	    getPeerNumber();
	}
    });
}


function getLocalAccounts() {
	web3.eth.getAccounts(function (err, accs) {
		if (err != null) {
			console.error(err);
			alert("There was an error fetching your accounts.");
			return;
		}

		if (accs.length == 0) {
			console.log("Please create an account with your eth client")
		}
		else {
			accounts = accs;
			account = web3.eth.coinbase;
			update();
		}
	});
}


function launchConnectedMode() {
	console.log("connected");
	web3.eth.isSyncing(function (err, sync) {
		if (!err) {
			if (sync === true) {
				console.log("start syncing");
			}
			else if (sync) {
				console.log(sync.currentBlock);
			}
			else {
				console.log("stop syncing");
			}
		}
	});
	getLocalAccounts();
}

function launchRemoteMode() {
	console.log("remote");
	browserAccounts = new Accounts({minPassphraseLength : 0});
	if (browserAccounts.length == 0)
		account = browserAccounts.new("password").address;
	else {
		account = browserAccounts.get().selected;
		console.log(browserAccounts.get(account, "password"));
	}
	console.log(account);
	accounts = null;
	var provider = new HookedWeb3Provider({
		host:"http://localhost:8101",
		transaction_signer: browserAccounts
	});
	web3.setProvider(provider);
	update();
}

window.onload = function() {
    if (web3.isConnected()) {
	launchConnectedMode();
    }
    else {
	launchRemoteMode();
    }
}
