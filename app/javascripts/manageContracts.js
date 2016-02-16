
//TODO : send Contract name to server, get abi + adress back, then connect with at()
function loadContract() {
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

//TODO : send Contract name to Server, get the abi + binary back, then deploy as shown below
function createNewOrga() {
    alert("INSIDE create!");
    var gasNb = (web3.eth.estimateGas({from:web3.eth.coinbase, data:BasicOrga.binary}));

    alert("INSIDE create2!");
    var contract = Pudding.whisk(BasicOrga.abi, BasicOrga.binary);
    alert("INSIDE create3!");
    contract.new({gas:gasNb, from:web3.eth.coinbase, data:BasicOrga.binary}).then(function (tx) {
        console.log("orga deployed", tx);
    });
}

function createNewCampaign() {
    var gasNb = (web3.eth.estimateGas({from: web3.eth.coinbase, data: Crowdfunding.binary})) * 1.2;
    Crowdfunding.new(web3.eth.coinbase, 100, 100, {from:web3.eth.coinbase, data:Crowdfunding.binary, gas:gasNb}).then(function (tx) {
        console.log("campaign deployed", tx);
        return tx.beneficiary.call();
    }).then(function (res) {
        console.log(res.valueOf());
    });
}
