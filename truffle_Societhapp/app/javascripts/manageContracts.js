
//TODO : send Contract name to server, get abi + adress back, then connect with at()
function loadContract() {
    var contractInstance = BasicOrga.deployed();
    //contractInstance.getBalance.call(account).then(function(res) {
    //    console.log(res);
    //});
    console.log(contractInstance);
}

//TODO : send Contract name to Server, get the abi + binary back, then deploy as shown below
function createContract() {
    //TO LOCALLY DEPLOY NEW CONTRACT :
    var contract = Pudding.whisk(BasicOrga.abi, BasicOrga.binary, {gasLimit:3141592, from: account, data: BasicOrga.binary});
    contract.new().then(function(res){
        console.log(res);
    });
}
