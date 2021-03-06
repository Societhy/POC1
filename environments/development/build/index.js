

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));

var socket = io();
var accounts = null;
var account = null;

function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
};


function refreshBalance() {
    var ethvalue;
    var latestBlock = web3.eth.blockNumber;

    ethvalue = account ? web3.fromWei(web3.eth.getBalance(account)) : "?????";
};

function getPeerNumber() {
}

function update() {
    refreshBalance();
    getPeerNumber();
    filter = web3.eth.filter('latest');
    filter.watch(function (err, logs) {
        if (err)
            console.error(err);
        else {
            console.log("new block :", web3.eth.blockNumber, "balance =", web3.fromWei(web3.eth.getBalance(account)).valueOf());
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
    var provider = new HookedWeb3Provider({
        host:"http://localhost:8101",
    });
    if (localStorage.ethereumAccounts)
        account = JSON.parse(localStorage.ethereumAccounts).selected;
    web3.setProvider(provider);
    update();
}

if (web3.isConnected()) {
    launchConnectedMode();
}
else {
    launchRemoteMode();
}