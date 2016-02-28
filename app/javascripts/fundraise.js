var fundraise;
var contract;
var contractInstance;

function donate() {
    var amount;

    web3.eth.sendTransaction({from:account, value:web3.toWei(amount), to:contractInstance.address}).then(function(tx) {
        console.log("donation processed");
    });
}

window.onload = function() {
    var addr = $("#fundraiseAddr").text();

    socket.emit("getFundraiseData", null);
    socket.on("fundraiseData", function (data) {
        fundraise = data;
        contract = Pudding.whisk({abi:fundraise.abi, binary:fundraise.binary});
        console.log(addr);
        contractInstance = contract.at(addr);
        console.log(contractInstance);
    });
}
