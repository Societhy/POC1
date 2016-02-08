
//TODO : send Contract name to server, get abi + adress back, then connect with at()
function loadContract() {
    var contractInstance = MetaCoin.deployed();
    contractInstance.getBalance.call(account).then(function(res) {
        console.log(res);
    });
}

//TODO : send Contract name to Server, get the abi + binary back, then deploy as shown below
function createContract() {
    //TO LOCALLY DEPLOY NEW CONTRACT :
    var contract = Pudding.whisk(MetaCoin.abi, MetaCoin.binary, {gasLimit:3141592, from: account, data: MetaCoin.binary});
    contract.new().then(function(res){
        console.log(res);
    });
}
