var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));
Pudding.setWeb3(web3);
var socket;

var orga;
var contract;
var contractInstance;

var accounts = null;
var account = null;

function    joinExistingOrga() {
    var orgaName = $("#name").val();
    var userName = "simon";
    //var userName = $("#name").val();
    contractInstance.register(userName, {from:account}).then(function (tx) {
        console.log("orga joined", tx);
        socket.emit("userJoinedOrga", {userAddress:account, orgaAddress:contractInstance.address});
    });
}

function destroyOrga() {
    contractInstance.kill({from:account}).then(function (tx) {
        console.log("orga destroyed", tx);
        socket.emit("orgaDeleted", {orgAddress:contractInstance.address});
    });

}

function createProject() {
    var projName;
    var projDescription;
    var projDate;

    contractInstance.createProject(projName, projDescription, projDate, {from:account}).then(function (tx) {
        console.log("project Created", tx);
        socket.emit("userJoinedOrga", {userAddress:account, orgaAddress:contractInstance.address});
    });

}

function sendFundToProject() {
    var projectAddr;
    var amount;

    contractInstance.transferFundToProject(projectAddr, amount, {from:account}).then(function (tx) {
        console.log("orga joined", tx);
        socket.emit("userJoinedOrga", {userAddress:account, orgaAddress:contractInstance.address});
    });
}

function donateToOrga() {
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
    var addr = $("#orgAddr").text();

    socket = io();
    socket.emit("getOrgaData", null);
    socket.on("orgaData", function (data) {
        orga = data;
        contract = Pudding.whisk({abi:orga.abi, binary:orga.binary});
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
