Pudding.setWeb3(web3);

var orga;
var contract;
var contractInstance;

function joinExistingOrga() {
    var userName = $("#name").val();
    contractInstance.register(userName, {from:account, value:web3.toWei(10)}).then(function (tx) {
        console.log("orga joined", tx);
        socket.emit("userJoinedOrga", {userAddr:account, orgAddr:contractInstance.address});
    });
    contractInstance.getMember.call(account).then(function (data) {
        console.log(data);
    });
}

function destroyOrga() {
    contractInstance.kill({from:account}).then(function (tx) {
        console.log("orga destroyed", tx);
        socket.emit("orgaDeleted", {orgAddr:contractInstance.address});
    });

}

function createProject() {
    var projName = $("#projectName").val();
    var projDescription = $("#projectDesc").val();

    contractInstance.createProject(projName, projDescription, {from:account}).then(function (tx) {
        console.log("project Created", tx);
        socket.emit("newProject", {projAddr:tx, orgAddr:contractInstance.address, projName:projName, projDesc:projDescription, creator:account});
    });
}

function sendFundToProject() {
    var projectAddr;
    var amount;

    contractInstance.transferFundToProject(projectAddr, amount, {from:account}).then(function (tx) {
        console.log("orga joined", tx);
        socket.emit("userJoinedOrga", {userAddr:account, orgAddr:contractInstance.address});
    });
}

function donateToOrga() {
    var amount = $("#amount").val();

    contractInstance.donate({from:account, value:web3.toWei(amount)}).then(function(tx) {
        $("#ethBalance").text(web3.fromWei(web3.eth.getBalance(contractInstance.address)) + " ether");
        console.log("donation processed");
    });
}

window.onload = function() {
    var addr = $("#orgAddr").text();

    socket.emit("getOrgaData", null);
    socket.on("orgaData", function (data) {
        orga = data;
        contract = Pudding.whisk({abi: orga.abi, binary: orga.binary});
        contractInstance = contract.at(addr);
        $("#ethBalance").text(web3.fromWei(web3.eth.getBalance(addr)) + " ether");
        console.log(contractInstance);
    });
}