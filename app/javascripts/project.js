var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));

var socket;
var project;
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

function register() {
    var username;

    contractInstance.register(username, {from:account}).then(function (tx) {
        console.log("user " + username + " registered", tx);
        socket.emit("userRegisterProj", {username:username, userAddr:account, projAddr:contractInstance.address});
    });
}

function createProposal() {
    var name;
    var description;
    var goal;
    var timeLimit;
    var proposalLimit;

    contractInstance.createProposal(name, description, goal, timeLimit, proposalLimit, {from:account}).then(function (tx) {
        console.log("proposal " + name + " created, id : ", tx);
        socket.emit("newProposal", {id:tx, propName:name, desc:description, goal:goal, deadline:timeLimit, pdeadline:proposalLimit});
    });
}

function voteForProposal() {
    var id;
    var vote;

    contractInstance.voteForProposal(id, vote, {from:account}).then(function (tx) {
        console.log("voted proposal " + id, tx);
        socket.emit("newVote", {id:id, vote:vote, userAddr:account, projAddr:contractInstance.address});
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
    var addr = $("#projAddr").text();

    socket = io();
    socket.emit("getProjData", null);
    socket.on("projData", function (data) {
        project = data;
        contract = Pudding.whisk({abi:project.abi, binary:project.binary});
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
