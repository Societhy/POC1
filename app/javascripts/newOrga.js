var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));

var accounts = null;
var account = null;

function createNewOrga() {
    var orgaName = $("#name").val();

    window.socket.emit("newOrga", null);

    window.socket.on("newOrgaCode", function (contractData) {
        console.log(contractData);
        var gasNb = (web3.eth.estimateGas({from:account, data:contractData.binary}));
        alert("deploying this contract cost you " + web3.fromWei(gasNb * web3.eth.gasPrice) + " ether.");
        var contract = Pudding.whisk({abi:contractData.abi, binary:contractData.binary});
        contract.new({gas:gasNb, from:account, data:contractData.binary, value:web3.toWei(10000)}).then(function (tx) {
            console.log("orga deployed", tx);
            window.socket.emit("newOrgaAddress", {orgAddr:tx.address, userAddr:account, orgName:orgaName});
        })
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
    Pudding.setWeb3(web3);
    if (web3.isConnected()) {
        launchConnectedMode();
    }
    else {
        launchRemoteMode();
    }
}

$("#submit_form").click(createNewOrga);