"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Fundraise = (function (_Pudding) {
    _inherits(Fundraise, _Pudding);

    function Fundraise() {
      _classCallCheck(this, Fundraise);

      _get(Object.getPrototypeOf(Fundraise.prototype), "constructor", this).apply(this, arguments);
    }

    return Fundraise;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Fundraise.abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "deadline", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "beneficiary", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": true, "inputs": [], "name": "goal", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [], "name": "endCampaign", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [], "name": "description", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "alreadyRaised", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": true, "inputs": [], "name": "isRaising", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": false, "inputs": [], "name": "donate", "outputs": [], "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_description", "type": "string" }, { "name": "_goal", "type": "uint256" }, { "name": "_timeLimit", "type": "uint256" }], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "fundraiseAddr", "type": "address" }, { "indexed": false, "name": "userAddr", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "newDonationToFundraise", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "fundraiseAddr", "type": "address" }, { "indexed": false, "name": "outcome", "type": "bool" }], "name": "endFundraise", "type": "event" }];
  Fundraise.binary = "606060405260405161077638038061077683398101604052805160805160a05160c05192840193919091019160018054600160a060020a03191633178155845160028054600082905290926020908216156101000260001901909116839004601f9081018290047f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace908101939290919089019083901061010557805160ff19168380011785555b506101359291505b8082111561018e57600081556001016100ae565b50506005829055603c810242016004556007805460ff19169055600060068190558054600160a060020a03191633179055505050506105b4806101c26000396000f35b828001600101855582156100a6579182015b828111156100a6578251826000505591602001919060010190610117565b50508260036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019257805160ff19168380011785555b506100c29291506100ae565b5090565b82800160010185558215610182579182015b828111156101825782518260005055916020019190600101906101a456606060405236156100825760e060020a600035046306fdde03811461008457806329dcb0cf146100df57806338af3eed146100e857806340193883146100fa57806371aac7f9146101035780637284e4161461019457806375d77691146101f25780638da5cb5b146101fb578063acc8ced31461020d578063ed88c68e14610219575b005b6040805160028054602060018216156101000260001901909116829004601f8101829004820284018201909452838352610347939083018282801561040f5780601f106103e45761010080835404028352916020019161040f565b6103b560045481565b6103c7600154600160a060020a031681565b6103b560055481565b6103b5600454600090819042106104cb5760065460055490106104cf57600154604051600654600160a060020a039290921691839182818181858883f15030600160a060020a0316815260016020820152604080517fb633096d10857ca28484982d2886ee800110b970bcbc7870269cfc67b62372c09550918290030192509050a15b600154600160a060020a0316ff5b6040805160038054602060026001831615610100026000190190921691909104601f8101829004820284018201909452838352610347939083018282801561040f5780601f106103e45761010080835404028352916020019161040f565b6103b560065481565b6103c7600054600160a060020a031681565b6103b560075460ff1681565b61008260005b6008548110156102bc5733600160a060020a03166008600050828154811015610002576000919091526002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30154600160a060020a0316141561041757346008600050828154811015610002576002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee4018054909201909155505b600854811415610472576008805460018101808355828183801582901161041f57600083905261041f9060029081027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee3908101918402015b808211156104cb57805473ffffffffffffffffffffffffffffffffffffffff191681556000600191909101908155610314565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156103a75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b820191906000526020600020905b8154815290600101906020018083116103f257829003601f168201915b505050505081565b60010161021f565b50505091909060005260206000209060020201600050604080518082019091523380825234602092909201829052825473ffffffffffffffffffffffffffffffffffffffff191617825560019190910155505b60068054349081019091556040805130600160a060020a0390811682523316602082015280820192909252517f40a1ad9cb057eba2864a0219ae665a7af3ffad269b5d127206d524a1436ea1df9181900360600190a150565b5090565b6040805130600160a060020a031681526000602082015281517fb633096d10857ca28484982d2886ee800110b970bcbc7870269cfc67b62372c0929181900390910190a15060005b6008548110156101865760088054829081101561000257600082815282546002929092027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30154600160a060020a03169290918490811015610002576002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee4015460405190915082818181858883f1505050505060010161051756";

  if ("" != "") {
    Fundraise.address = "";

    // Backward compatibility; Deprecated.
    Fundraise.deployed_address = "";
  }

  Fundraise.generated_with = "1.0.3";
  Fundraise.contract_name = "Fundraise";

  return Fundraise;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Fundraise = factory;
}