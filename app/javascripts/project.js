Pudding.setWeb3(web3);
var project;
var contract;
var contractInstance;

function register() {
    var userName = $("#name").val();

    contractInstance.register(userName, {from:account}).then(function (tx) {
        console.log("user " + userName + " registered", tx);
    });
}

function createFundraise() {
//todo
}

function createProposal() {
    var name;
    var description;
    var amount;
    var timeLimit;
    var beneficiary;

    //contractInstance.createProposal(name, description, goal, timeLimit, proposalLimit, {from:account}).then(function (tx) {
    contractInstance.createProposal("test", "bonjour", 10, account, 10, {from:account, gas:200000}).then(function (tx) {
        console.log("proposal " + name + " created");
    });
}

function voteForProposal() {
    var id;
    var vote;

    contractInstance.voteForProposal(id, vote, {from:account}).then(function (tx) {
        console.log("voted proposal " + id, tx);
    });
}

window.onload = function() {
    var addr = $("#projAddr").text();

    socket.emit("getProjData", null);
    socket.on("projData", function (data) {
        project = data;
        contract = Pudding.whisk({abi: project.abi, binary: project.binary});
        contractInstance = contract.at(addr);
        console.log(contractInstance);
        contractInstance.allEvents().watch(function (err, logs) {
            console.log(logs);
            socket.emit(logs.event, logs.args);
        });
    });
}
