

var Pudding=function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function r(t){if(!this.abi)throw new Error("Contract ABI not set. Please inherit Pudding and set static .abi variable with contract abi.");this.contract=t,this.address=t.address;for(var e=0;e<this.abi.length;e++){var n=this.abi[e];"function"==n.type&&(1==n.constant?this[n.name]=this.constructor.promisifyFunction(this.contract[n.name]):this[n.name]=this.constructor.synchronizeFunction(this.contract[n.name]),this[n.name].call=this.constructor.promisifyFunction(this.contract[n.name].call),this[n.name].sendTransaction=this.constructor.promisifyFunction(this.contract[n.name].sendTransaction),this[n.name].request=this.contract[n.name].request),"event"==n.type&&(this[n.name]=this.contract[n.name])}this.allEvents=this.contract.allEvents}var a=n(1),s=n(2);r["new"]=function(){var t=Array.prototype.slice.call(arguments),e=r.getWeb3();if(!this.prototype.binary)throw new Error("Contract binary not set. Please override Pudding and set .binary before calling new()");var n=this;return new a(function(a,s){var o=e.eth.contract(n.prototype.abi),i={},c=t[t.length-1];r.is_object(c)&&c instanceof r.BigNumber==0&&(i=t.pop()),i=r.merge(r.class_defaults,n.prototype.class_defaults,i),null==i.data&&(i.data=n.prototype.binary);var l=function(t,e){return null!=t?void s(t):void(null==t&&null!=e&&null!=e.address&&a(new n(e)))};t.push(i,l),o["new"].apply(o,t)})},r.at=function(t){var e=r.getWeb3(),n=e.eth.contract(this.prototype.abi),a=n.at(t);return new this(a)},r.deployed=function(){if(!this.prototype.address)throw new Error("Contract address not set - deployed() relies on the contract class having a static 'address' value; please set that before using deployed().");return this.at(this.prototype.address)},r.extend=function(){for(var t=(Array.prototype.slice.call(arguments),0);t<arguments.length;t++)for(var e=arguments[t],n=Object.keys(e),r=0;r<n.length;r++){var a=n[r],s=e[a];this.prototype[a]=s}},r.whisk=function(t,e){if(null==this.web3)throw new Error("Please call Pudding.setWeb3() before calling Pudding.whisk().");var n=e;return null==e&&(n=function(t){r.apply(this,arguments)}),n.prototype=Object.create(r.prototype),n.abi=n.prototype.abi=t.abi,n.binary=n.prototype.binary=t.binary,n.unlinked_binary=n.prototype.unlinked_binary=t.unlinked_binary||t.binary,n.prototype.class_defaults=t.defaults||{},n.address=n.prototype.address=t.address,n.deployed_address=n.prototype.deployed_address=t.address,n.generated_with=n.prototype.generated_with=t.generated_with,n.contract_name=n.prototype.contract_name=t.contract_name,n.load=function(){return n},n["new"]=r["new"].bind(n),n.at=r.at.bind(n),n.deployed=r.deployed.bind(n),n.extend=r.extend.bind(n),n},r.load=function(t,e){null==e&&(e={}),t instanceof Array||(t=[t]);for(var n=[],r=0;r<t.length;r++){var a=t[r],s=a.load(this);n.push(s.contract_name),e[s.contract_name]=s}return n},r.defaults=function(t){null==this.class_defaults&&(this.class_defaults={}),null==t&&(t={});for(var e=Object.keys(t),n=0;n<e.length;n++){var r=e[n],a=t[r];this.class_defaults[r]=a}return this.class_defaults},r.setWeb3=function(t){if(this.web3=t,null==this.web3.toBigNumber)throw new Error("Pudding.setWeb3() must be passed an instance of Web3 and not Web3 itself.");this.BigNumber=this.web3.toBigNumber(0).constructor},r.getWeb3=function(){return this.web3||r.web3},r.is_object=function(t){return"object"==typeof t&&!(t instanceof Array)},r.merge=function(){for(var t={},e=Array.prototype.slice.call(arguments),n=0;n<e.length;n++)for(var r=e[n],a=Object.keys(r),s=0;s<a.length;s++){var o=a[s],i=r[o];t[o]=i}return t},r.promisifyFunction=function(t){var e=this;return function(){var n=this,s=Array.prototype.slice.call(arguments),o={},i=s[s.length-1];return r.is_object(i)&&i instanceof r.BigNumber==0&&(o=s.pop()),o=r.merge(r.class_defaults,e.class_defaults,o),new a(function(e,r){var a=function(t,n){null!=t?r(t):e(n)};s.push(o,a),t.apply(n.contract,s)})}},r.synchronizeFunction=function(t){var e=this,n=r.getWeb3();return function(){var s=Array.prototype.slice.call(arguments),o={},i=s[s.length-1];return r.is_object(i)&&i instanceof r.BigNumber==0&&(o=s.pop()),o=r.merge(r.class_defaults,e.class_defaults,o),new a(function(r,a){var i=function(t,e){var s=null,o=240,i=0;if(null!=t)return void a(t);var s,c=function(){n.eth.getTransaction(e,function(t,n){null==t&&(null!=n.blockHash&&(clearInterval(s),r(e)),i>=o&&(clearInterval(s),a(new Error("Transaction "+e+" wasn't processed in "+i+" attempts!"))),i+=1)})};s=setInterval(c,1e3),c()};s.push(o,i),t.apply(e,s)})}},r.class_defaults={},r.version=s.version,t.exports=r},function(t,e){t.exports=Promise},function(t,e){t.exports={name:"ether-pudding",version:"2.0.3",description:"Pudding - a (more) delightful Ethereum contract abstraction",author:"Tim Coulter",main:"./index.js","private":!1,scripts:{test:"./node_modules/.bin/mocha"},repository:{type:"git",url:"https://github.com/consensys/ether-pudding.git"},license:"MIT License. Copyright Consensys LLC, and authors. All rights reserved.",devDependencies:{chai:"^3.4.1","ethereumjs-testrpc":"^0.1.1","json-loader":"^0.5.4",mocha:"^2.3.4",solc:"^0.1.6",temp:"^0.8.3",web3:"^0.15.1",webpack:"^1.12.11"},dependencies:{bluebird:"^3.1.5","node-dir":"^0.1.11"}}}]);

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));
Pudding.setWeb3(web3);
var socket;

var orga;
var contract;
var contractInstance;

var accounts = null;
var account = null;

function joinExistingOrga() {
    var orgaName = $("#name").val();
    var userName = "simon";
    //var userName = $("#name").val();
    contractInstance.register(userName, {from:account}).then(function (tx) {
        console.log("orga joined", tx);
        socket.emit("userJoinedOrga", {userAddr:account, orgaAddr:contractInstance.address});
    });
}

function destroyOrga() {
    console.log("destroy");
    contractInstance.kill({from:account}).then(function (tx) {
        console.log("orga destroyed", tx);
        socket.emit("orgaDeleted", {orgAddr:contractInstance.address});
    });

}

function createProject() {
    var projName;
    var projDescription;
    var projDate;

    contractInstance.createProject(projName, projDescription, projDate, {from:account}).then(function (tx) {
        console.log("project Created", tx);
        socket.emit("userJoinedOrga", {userAddr:account, orgAddr:contractInstance.address});
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
    var amount;

    web3.eth.sendTransaction({from:account, value:web3.toWei(amount), to:contractInstance.address}).then(function(tx) {
        console.log("donation processed");
    });
}

function getLocalAccounts() {
    web3.eth.getAccounts(function (err, accs) {
        if (err != null) {
            console.error(err);
            alert("There was an error fetching your accounts.");
            return;
        }

        if (accs.length == 0) {
            console.log("Please create an account with your eth client")
        }
        else {
            accounts = accs;
            account = web3.eth.coinbase;
        }
    });
}


function launchConnectedMode() {
    console.log("connected");
    web3.eth.isSyncing(function (err, sync) {
        if (!err) {
            if (sync === true) {
                console.log("start syncing");
            }
            else if (sync) {
                console.log(sync.currentBlock);
            }
            else {
                console.log("stop syncing");
            }
        }
    });
    getLocalAccounts();
}

function launchRemoteMode() {
    console.log("remote");
    var provider = new HookedWeb3Provider({
        host:"http://localhost:8101",
    });
    if (localStorage.ethereumAccounts)
        account = JSON.parse(localStorage.ethereumAccounts).selected;
    web3.setProvider(provider);
}

window.onload = function() {
    var addr = $("#orgAddr").text();

    socket = io();
    socket.emit("getOrgaData", null);
    socket.on("orgaData", function (data) {
        orga = data;
        contract = Pudding.whisk({abi:orga.abi, binary:orga.binary});
        contractInstance = contract.at(addr);
        console.log(contractInstance);
    });

    if (web3.isConnected()) {
        launchConnectedMode();
    }
    else {
        launchRemoteMode();
    }
}