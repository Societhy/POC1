
//TODO : send Contract name to server, get abi + adress back, then connect with at()
function loadContract() {
    var contractInstance = BasicOrga.deployed();
    var nb = 0;
    while (nb < 100)
    {
        BasicOrga.new().then(function(tx) {
            console.log(tx, nb);
        });
        console.log(++nb);
    }
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
function createContract() {
    //TO LOCALLY DEPLOY NEW CONTRACT :
    var price = (web3.eth.estimateGas({from:web3.eth.coinbase, data:BasicOrga.binary}));
    var contract = Pudding.whisk(BasicOrga.abi, BasicOrga.binary, {gas:356160, from:web3.eth.coinbase, data:BasicOrga.binary});
    contract.new().then(function (tx) {
        console.log("lel", tx);
    });
}
