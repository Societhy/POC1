var eventNewUser = contractInstance.newUser();
var eventDonation = contractInstance.newDonation();
eventNewUser.watch(function(err, res) {
    console.log("new User event", res.args.name);
});
eventDonation.watch(function(err, res) {
    console.log("new don", web3.fromWei(res.args.value.valueOf()));
});

//TODO : send Contract name to server, get abi + adress back, then connect with at()
function loadContract() {
    var contractInstance = BasicOrga.deployed();

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

function register(name) {
    var contractInstance = BasicOrga.deployed();

    contractInstance.register(name, {from: web3.eth.coinbase})
        .then(function (res) {
            console.log(res);
        });
}

function anonymousDonation(value) {
    var contractInstance = BasicOrga.deployed();

    contractInstance.anonymousDonation({from:web3.eth.coinbase, value:web3.toWei(value), to:BasicOrga.address});
}

function donation(value) {
    var contractInstance = BasicOrga.deployed();

    contractInstance.donate({from:web3.eth.coinbase, value:web3.toWei(value), to:BasicOrga.address});
}

//TODO : send Contract name to Server, get the abi + binary back, then deploy as shown below
function createNewOrga(name) {
    console.log(account);
    var gasNb = (web3.eth.estimateGas({from:web3.eth.coinbase, data:BasicOrga.binary}));
    var contract = Pudding.whisk(BasicOrga.abi, BasicOrga.binary);
    contract.new(name, {gas:gasNb, from:web3.eth.coinbase, data:BasicOrga.binary}).then(function (tx) {
        console.log("orga deployed", tx);
    });
}

function createNewCampaign() {
    var gasNb = (web3.eth.estimateGas({from: web3.eth.coinbase, data: Crowdfunding.binary})) * 1.2;
    Crowdfunding.new(web3.eth.coinbase, 100, 100, {from:web3.eth.coinbase, gas:gasNb}).then(function (tx) {
        console.log("campaign deployed", tx);
        return tx.beneficiary.call();
    }).then(function (res) {
        console.log(res.valueOf());
    });
}
