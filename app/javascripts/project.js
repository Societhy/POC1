Pudding.setWeb3(web3);

var fundraise;
var fundraiseInstance;
var project;
var projectInstance;

function register() {
    var userName = $("#name").val();

    projectInstance.register(userName, {from:account}).then(function (tx) {
        console.log("user " + userName + " registered", tx);
    });
}

function createFundraise() {
    var name = $("#fundraiseName").val();
    var description = $("#fundraiseDesc").val();
    var goal = $("#fundraiseGoal").val();
    var timeLimit = $("#fundraiseDate").val();

    projectInstance.createFundraise(name, description, goal, timeLimit, {from:account, gas:3000000}).then(function (tx) {
        console.log("fundraise " + name + " created");
    });
}

function createProposal() {
    var name = $("#proposalName").val();
    var description = $("#proposalDesc").val();;
    var amount = $("#proposalAmount").val();
    var timeLimit = $("#proposalDate").val();
    var beneficiary = $("#proposalTarget").val();

    projectInstance.createProposal(name, description, web3.toWei(amount), beneficiary, timeLimit, {from:account, gas:3000000}).then(function (tx) {
        console.log("proposal " + name + " created");
    });
}

function voteForProposal(vote, id) {

    projectInstance.voteForProposal(id, vote, {from:account}).then(function (tx) {
        console.log("voted proposal " + id, tx);
    });
}

function updateContracts() {
    projectInstance.checkProposals({from:account, gas:3000000}).then(function (tx) {
        console.log("proposals checked");
    });
    projectInstance.checkCampaigns({from:account, gas:3000000}).then(function (tx) {
        console.log("fundraises checked");
    });
}

function contributeToFundraise(fundraiseAddr) {
    var amount = document.getElementById(fundraiseAddr).value;

    console.log(amount);
    fundraiseInstance = fundraise.at(fundraiseAddr);
    console.log(fundraiseInstance);
    fundraiseInstance.allEvents().watch(function (err, logs) {
        console.log(logs);
        socket.emit(logs.event, logs.args);
    });
    fundraiseInstance.donate({from: account, gas:3000000, value:web3.toWei(amount)}).then(function (tx) {
        console.log("donation to fundraise processed");
    });
}

window.onload = function() {
    var projAddr = $("#projAddr").text();

    socket.emit("getProjData", null);
    socket.emit("getFundraiseData", projAddr);
    socket.on("fundraiseData", function (data) {
        fundraise = Pudding.whisk({abi: data.abi, binary: data.binary});
        console.log(fundraise);
    });
    socket.on("projData", function (data) {
        project = Pudding.whisk({abi: data.abi, binary: data.binary});
        projectInstance = project.at(projAddr);
        console.log(projectInstance);
        $("#balance").text(web3.fromWei(web3.eth.getBalance(projAddr)));
        projectInstance.allEvents().watch(function (err, logs) {
            console.log(logs);
            socket.emit(logs.event, logs.args);
        });
    });
}
