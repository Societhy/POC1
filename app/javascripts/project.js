var project;
var contract;
var contractInstance;

function uploadImage() {
    var stream = ss.createStream();
    var input, file;

    input = document.getElementById('imageinput');
    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        ss(window.socket).emit('orgaimg', stream, {size: file.size, name:file.name});
        ss.createBlobReadStream(file).pipe(stream);
    }
}

function register() {
    var username;

    contractInstance.register(username, {from:account}).then(function (tx) {
        console.log("user " + username + " registered", tx);
        socket.emit("userRegisterProj", {userAddr:account, projAddr:contractInstance.address});
    });
}

function createProposal() {
    var name;
    var description;
    var goal;
    var timeLimit;
    var proposalLimit;

    contractInstance.createProposal(name, description, goal, timeLimit, proposal, {from:account}).then(function (tx) {
        console.log("proposal " + name + " created, id : ", tx);
        socket.emit("newProposal", {userAddr:account, projAddr:contractInstance.address});
    });
}

function voteForProposal() {
    var id;
    var vote;

    contractInstance.voteForProposal(id, vote, {from:account}).then(function (tx) {
        console.log("voted proposal " + id, tx);
        socket.emit("newVote", {userAddr:account, projAddr:contractInstance.address});
    });
}

window.onload = function() {
    var addr = $("#projAddr").text();

    socket.emit("getProjData", null);
    socket.on("projData", function (data) {
        project = data;
        contract = Pudding.whisk({abi: project.abi, binary: project.binary});
        console.log(addr);
        contractInstance = contract.at(addr);
        console.log(contractInstance);
    });
}