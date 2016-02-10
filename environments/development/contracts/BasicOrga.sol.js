"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var BasicOrga = (function (_Pudding) {
    _inherits(BasicOrga, _Pudding);

    function BasicOrga() {
      _classCallCheck(this, BasicOrga);

      _get(Object.getPrototypeOf(BasicOrga.prototype), "constructor", this).apply(this, arguments);
    }

    return BasicOrga;
  })(Pudding);

  ;

  // Set up specific data for this class.
  BasicOrga.abi = [{ "constant": true, "inputs": [], "name": "creator", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "user", "type": "address" }], "name": "getMember", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function" }, { "constant": false, "inputs": [], "name": "donate", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "register", "outputs": [], "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addr", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "newDonation", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "name", "type": "string" }], "name": "newUser", "type": "event" }];
  BasicOrga.binary = "60606040526040516104cb3803806104cb83390160405260018054600160a060020a03191633179055610495806100366000396000f3606060405236156100565760e060020a600035046302d05d3f811461005857806306fdde031461006a5780632ada2596146100c457806341c0e1b51461013d578063ed88c68e1461014e578063f2c298be146101a2575b005b610211600154600160a060020a031681565b61021b60028054602060018216156101000260001901909116829004601f810182900490910260809081016040526060828152929190828280156102b45780601f10610289576101008083540402835291602001916102b4565b61021b60043560006060818152600160a060020a03831682526020828152604092839020805460026001821615610100026000190190911604601f810183900490920260a090810190945260808281529293909190828280156104895780601f1061045e57610100808354040283529160200191610489565b610056600154600160a060020a0316ff5b610056600160a060020a033316600081815260208190526040908190203460019190910181905560609283526080527f2990aa85754a2dc2ed3761d2f1ad1620e25fc80d232b2d032eceb204ba4b87be91a1565b60206004803580820135601f81018490049093026080908101604052606084815261005694602493919291840191819083828082843750949650505050505050600160a060020a03331660009081526020819052604090206002015460ff61010090910416156102bc57610002565b6060908152602090f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561027b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b820191906000526020600020905b81548152906001019060200180831161029757829003601f168201915b505050505081565b60406000908120600280820180546201000062ff0000199091161761ff0019166101009081179091558451835484865260209586902094956001821615909302600019011692909204601f908101919091048301929060809083901061034557805160ff19168380011785555b506103759291505b8082111561041e5760008155600101610331565b82800160010185558215610329579182015b82811115610329578251826000505591602001919060010190610357565b50507f1eed1192a0867d5011d38be86e85233d19c6d7113b8f342323d8c3fc2d8de9b76000600050600033600160a060020a03168152602001908152602001600020600050600001600050604051808060200182810382528381815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561044d5780601f106104225761010080835404028352916020019161044d565b5090565b820191906000526020600020905b81548152906001019060200180831161043057829003601f168201915b50509250505060405180910390a150565b820191906000526020600020905b81548152906001019060200180831161046c57829003601f168201915b5050505050905091905056";

  if ("0x829dcfec1532d95c208cce80acbbb5cd36f8c324" != "") {
    BasicOrga.address = "0x829dcfec1532d95c208cce80acbbb5cd36f8c324";

    // Backward compatibility; Deprecated.
    BasicOrga.deployed_address = "0x829dcfec1532d95c208cce80acbbb5cd36f8c324";
  }

  BasicOrga.generated_with = "1.0.3";
  BasicOrga.contract_name = "BasicOrga";

  return BasicOrga;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.BasicOrga = factory;
}