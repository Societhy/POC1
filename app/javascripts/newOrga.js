Pudding.setWeb3(web3);

function createNewOrga() {
    var orgaName = $("#name").val();

    window.socket.emit("newOrga", null);

    window.socket.on("newOrgaCode", function (contractData) {
        console.log(contractData);
        var gasNb = (web3.eth.estimateGas({from:account, data:contractData.binary}));
        alert("deploying this contract cost you " + web3.fromWei(gasNb * web3.eth.gasPrice) + " ether.");
        var contract = Pudding.whisk({abi:contractData.abi, binary:contractData.binary});
        contract.new({gas:gasNb, from:account, data:contractData.binary}).then(function (tx) {
            console.log("orga deployed", tx);
            window.socket.emit("newOrgaAddress", {orgAddr:tx.address, userAddr:account, orgName:orgaName});
        })
    });
}

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

$("#submit_form").click(createNewOrga);