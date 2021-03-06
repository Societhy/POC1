var browserAccounts;

//TODO : export keyfile in the same format as geth (keythereum like)
function exportKeyFile() {
    if (browserAccounts === undefined)
        browserAccounts = new Accounts({minPassphraseLength : 0});
    var accountObject = browserAccounts.new('passphrase');
    var JSONData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(accountObject));
    var link = document.createElement('a');
    link.href = "data: " + JSONData;
    link.download = 'data.json';
    link.innerHTML = 'download JSON';
    var container = document.getElementById('exportWallet');
    container.appendChild(link);
    console.log(accountObject);
}

function createBrowserAccount() {
    browserAccounts = new Accounts({minPassphraseLength: 6});
    var accountObject = browserAccounts.new($("#password").val());
    console.log(accountObject);
    var JSONData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(accountObject));
    var link = document.createElement('a');
    link.href = "data: " + JSONData;
    link.download = 'data.json';
    link.innerHTML = 'download JSON';
    var container = document.getElementById('settings');
    container.appendChild(link);
}

//TODO : manage both custom key file (created by us) and key file generated by geth
function loadKeyFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('keyFileInput');
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
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        lines = e.target.result;
        var newArr = JSON.parse(lines);
        var newAccount = browserAccounts.set(newArr.address, newArr);
        console.log(newArr);
        listAccounts();
    }
}

function listAccounts() {
    browserAccount = browserAccounts.get();
    for (var elem in browserAccount) {
        if (elem !== "selected")
            $("#accountList tbody").append("<tr > <td>"+elem+"</td><td>Dans le browser</td>");
    }
    for (var elem in accounts) {
        $("#accountList tbody").append("<tr> <td>" + accounts[elem] + "</td><td>en local</td>");
    }
}

function clearAccounts() {
    browserAccounts.clear();
    listAccounts();
}

function sendCoin() {
    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    setStatus("Initiating transaction... (please wait)");
    filter = web3.eth.filter('latest');
    web3.eth.sendTransaction({to: receiver, value: web3.toWei(amount), from: account}, function(err, address){
        if (err) {
            console.error(err);
            setStatus("Error sending coin; see log.");
        }
        else
        {
            setStatus("Transaction sent!");
            filter.watch(function(err, logs) {
                if (err)
                    console.error(err);
                else
                {
                    if (web3.eth.getTransaction(address).blockHash === logs) {
                        setStatus("Transaction mined!");
                        filter.stopWatching();
                    }
                }
            });
        }
    });
};

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
        ss(socket).emit('userimg', stream, {size: file.size, name:file.name});
        ss.createBlobReadStream(file).pipe(stream);
    }
}

window.onload = function() {
    socket.emit("getUser", {addr:web3.eth.coinbase});
    socket.on("userNotFound", function () {
        $("#firstname").text("unknown");
        $("#lastname").text("unknown");
    });
    socket.on("userData", function (data) {
        $("#firstname").text(data.nickname);
        $("#lastname").text(data.lastname);
        $("#address").text(account);
        $("#balance").text(web3.fromWei(web3.eth.getBalance(account)));
    });
    browserAccounts = new Accounts({minPassphraseLength: 6});
    listAccounts();
}

