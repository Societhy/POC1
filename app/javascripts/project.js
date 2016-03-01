Pudding.setWeb3(web3);
var project;
var contract;
var contractInstance;

function register() {
    var userName = $("#name").val();

    contractInstance.register(userName, {from:account}).then(function (tx) {
        console.log("user " + username + " registered", tx);
        socket.emit("userRegisterProj", {username:username, userAddr:account, projAddr:contractInstance.address});
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
        contractInstance.createProposal("test", "bonjour", 10, 10, 10, {from:account}).then(function (tx) {
        console.log("proposal " + name + " created");
    });
}

function voteForProposal() {
    var id;
    var vote;

    contractInstance.voteForProposal(id, vote, {from:account}).then(function (tx) {
        console.log("voted proposal " + id, tx);
        socket.emit("newVote", {id:id, vote:vote, userAddr:account, projAddr:contractInstance.address});
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
}
