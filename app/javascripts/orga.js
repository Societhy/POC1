var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));
Pudding.setWeb3(web3);
var socket;

var orga;
var contract;
var contractInstance;

var accounts = null;
var account = null;

function joinExistingOrga() {
    var orgaName = $("#name").val();
    var userName = "simon";
    //var userName = $("#name").val();
    contractInstance.register(userName, {gas:gasNb, from:account, to:orga.address}).then(function (tx) {
        console.log("orga joined", tx);
        socket.emit("userJoinedOrga", {userAddress:account, orgaAddress:orga.address});
    });
}

function destroyOrga() {

}

function createProject() {

}

function getOrgaMembers() {

}

function sendFundToProject() {

}

function donateToOrga() {
    var contractInstance = BasicOrga.deployed();

    var eventNewUser = contractInstance.newUser();
    var eventDonation = contractInstance.newDonation();
    eventNewUser.watch(function(err, res) {
        console.log("new User event", res.args.name);
    });
    eventDonation.watch(function(err, res) {
        console.log("new don", web3.fromWei(res.args.value.valueOf()));
    });

    contractInstance.donate({from:web3.eth.coinbase, value:web3.toWei(100), to:BasicOrga.address})
        .then(function(res) {
            console.log(web3.fromWei(web3.eth.getBalance(BasicOrga.address)).valueOf());
            return contractInstance.register("simon", {from: web3.eth.coinbase})
        })
        .then(function(tx) {
            console.log("register sent", tx);
            return contractInstance.getMember.call(web3.eth.coinbase);
        })
        .then(function (res) {
            console.log(res);
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
    socket = io();

    socket.emit("getOrgaData", null);
    socket.on("orgaData", function (data) {
        orga = data;
        contract = Pudding.whisk({abi:orga.abi, binary:orga.binary});
        contractInstance = contract.at(orga.address);
        console.log(orga);
    });

    if (web3.isConnected()) {
        launchConnectedMode();
    }
    else {
        launchRemoteMode();
    }
}
