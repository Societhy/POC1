
//TODO : send Contract name to server, get abi + adress back, then connect with at()
function loadContract() {
    var contractInstance = BasicOrga.deployed();
    contractInstance.register("simon", {from:web3.eth.coinbase}).then(function(res) {
        console.log(res);
    });
    //contractInstance.getMember.call(web3.eth.coinbase).then(function(res) {
    //    console.log(res);
    //});
}

//TODO : send Contract name to Server, get the abi + binary back, then deploy as shown below
function createContract() {
    //TO LOCALLY DEPLOY NEW CONTRACT :
    var contract = Pudding.whisk(BasicOrga.abi, BasicOrga.binary, {gasLimit:3141592, from: account, data: BasicOrga.binary});
    contract.new().then(function(res){
        console.log(res);
    });
}
