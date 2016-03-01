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
    var name = $("#fundraiseName").val();
    var description = $("#fundraiseDesc").val();
    var goal = $("#fundraiseGoal").val();
    var timeLimit = $("#fundraiseDate").val();

    contractInstance.createFundraise(name, description, goal, timeLimit, {from:account, gas:3000000}).then(function (tx) {
        console.log("fundraise " + name + " created");
    });
}

function createProposal() {
    var name = $("#proposalName").val();
    var description = $("#proposalDesc").val();;
    var amount = $("#proposalAmount").val();
    var timeLimit = $("#proposalDate").val();
    var beneficiary = $("#proposalTarget").val();

    contractInstance.createProposal(name, description, amount, beneficiary, timeLimit, {from:account, gas:3000000}).then(function (tx) {
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
