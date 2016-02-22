var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));

var accounts = null;
var account = null;
var browserAccounts;

//TODO : send Contract name to Server, get the abi + binary back, then deploy as shown below
//TODO : normal si ça marche pas
function createNewOrga() {
    console.log(account);
    var gasNb = (web3.eth.estimateGas({from:web3.eth.coinbase, data:BasicOrga.binary}));
    var contract = Pudding.whisk(BasicOrga.abi, BasicOrga.binary);
    contract.new({gas:gasNb, from:web3.eth.coinbase, data:BasicOrga.binary}).then(function (tx) {
        console.log("orga deployed", tx);
    });
}

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
    window.socket = io();
    if (web3.isConnected()) {
        launchConnectedMode();
    }
    else {
        launchRemoteMode();
    }
}
