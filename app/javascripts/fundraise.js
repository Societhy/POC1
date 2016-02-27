var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));

var socket;
var fundraise;
var contract;
var contractInstance;

var accounts = null;
var account = null;
var browserAccounts;

function uploadImage() {
    var stream = ss.createStream();
    var input, file;

    input = document.getElementById('imageinput');
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
        ss(window.socket).emit('orgaimg', stream, {size: file.size, name:file.name});
        ss.createBlobReadStream(file).pipe(stream);
    }
}

function donate() {
    var amount;

    web3.eth.sendTransaction({from:account, value:web3.toWei(amount), to:contractInstance.address}).then(function(tx) {
        console.log("donation processed");
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
}

window.onload = function() {
    var addr = $("#fundraiseAddr").text();

    socket = io();
    socket.emit("getFundraiseData", null);
    socket.on("fundraiseData", function (data) {
        fundraise = data;
        contract = Pudding.whisk({abi:fundraise.abi, binary:fundraise.binary});
        console.log(addr);
        contractInstance = contract.at(addr);
        console.log(contractInstance);
    });

    if (web3.isConnected()) {
        launchConnectedMode();
    }
    else {
        launchRemoteMode();
    }
}
