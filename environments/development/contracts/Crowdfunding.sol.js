"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Crowdfunding = (function (_Pudding) {
    _inherits(Crowdfunding, _Pudding);

    function Crowdfunding() {
      _classCallCheck(this, Crowdfunding);

      _get(Object.getPrototypeOf(Crowdfunding.prototype), "constructor", this).apply(this, arguments);
    }

    return Crowdfunding;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Crowdfunding.abi = [{ "constant": true, "inputs": [], "name": "deadline", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "beneficiary", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [], "name": "endCampaign", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "alreadyRaised", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "fundingGoal", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "inputs": [{ "name": "_beneficiary", "type": "address" }, { "name": "_fundingGoal", "type": "uint256" }, { "name": "_duration", "type": "uint256" }], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addr", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "newContribution", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "success", "type": "bool" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "endOfCampaign", "type": "event" }];
  Crowdfunding.binary = "606060405260405160608061033083395060c06040525160805160a05160008054600160a060020a03191684179055600182905542603c8202016003555050506102e38061004d6000396000f36060604052361561004b5760e060020a600035046329dcb0cf81146100b857806338af3eed146100c157806371aac7f9146100d357806375d77691146101565780637a3a0e841461015f575b60048054600181018083556101689234923392828183801582901161016a5760020281600202836000526020600020918201910161016a91905b8082111561022f57805473ffffffffffffffffffffffffffffffffffffffff191681556000600191909101908155610085565b61023360035481565b610233600054600160a060020a031681565b610168600354600090421061023d5760015460025410610240576002548154600160a060020a0316908290606082818181858883f150506040805160018152602081019290925280517f4181430b0977e558b5611a9975a69a2552e7c647428e5a66cff73b20c15426d6945091829003019150a15b600054600160a060020a0316ff5b61023360025481565b61023360015481565b005b50505091909060005260206000209060020201600060406040519081016040528085815260200186815260200150909190915060008201518160000160006101000a815481600160a060020a0302191690830217905550602082015181600101600050555050508160026000828282505401925050819055507f31c29c25a7000e59ae5b61ee532c1bb2bcf7b43fbb2ac491df010fd769ad34e781836040518083600160a060020a031681526020018281526020019250505060405180910390a15050565b5090565b6060908152602090f35b50565b5b600454811015610148576004805482908110156100025760009182526002027f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0190905460048054600160a060020a039290921692918490811015610002576040516002919091027f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19c0154915082818181858883f1505050505060010161024156";

  if ("" != "") {
    Crowdfunding.address = "";

    // Backward compatibility; Deprecated.
    Crowdfunding.deployed_address = "";
  }

  Crowdfunding.generated_with = "1.0.3";
  Crowdfunding.contract_name = "Crowdfunding";

  return Crowdfunding;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Crowdfunding = factory;
}