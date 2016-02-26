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
  BasicOrga.abi = [{ "constant": false, "inputs": [{ "name": "projectAddr", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFundToProject", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_description", "type": "string" }, { "name": "_date", "type": "uint256" }], "name": "createProject", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "user", "type": "address" }], "name": "getMember", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "register", "outputs": [], "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "addr", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "newDonation", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "name", "type": "string" }], "name": "newUser", "type": "event" }];
  BasicOrga.binary = "606060405260405161235b38038061235b8339810160405280510160605160028054600160a060020a03191633178155825160038054600082905290936020601f60001960018516156101000201909316949094048201939093047fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b90810193909160809091019083901060c457805160ff19168380011785555b5060b39291505b8082111560f1576000815560010160a1565b505050612266806100f56000396000f35b82800160010185558215609a579182015b82811115609a57825182600050559160200191906001019060d5565b509056606060405236156100605760e060020a6000350462a3669681146100c157806306fdde031461010f57806323c554481461016d5780632ada25961461033457806341c0e1b5146103b35780638da5cb5b146103dd578063f2c298be146103ef575b610467600160a060020a0333166000818152602081815260409182902060010180543490810190915582519384529083015280517f2990aa85754a2dc2ed3761d2f1ad1620e25fc80d232b2d032eceb204ba4b87be9281900390910190a15b565b610467600435602435600160a060020a0333166000908152602081905260408120600201546301000000900460ff161580610105575030600160a060020a03163182115b1561095057610002565b6040805160038054602060026001831615610100026000190190921691909104601f8101829004820284018201909452838352610469939083018282801561051f5780601f106104f45761010080835404028352916020019161051f565b6104d76004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750506040805160208835808b0135601f810183900483028401830190945283835297999860449892975091909101945090925082915084018382808284375094965050933593505050506000600084848460405161185180610a158339018080602001806020018481526020018381038352868181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102725780820380516001836020036101000a031916815260200191505b508381038252858181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102cb5780820380516001836020036101000a031916815260200191505b5095505050505050604051809103906000f09050600160005080548060010182818154818355818115116106fb5760008390526106fb9060049081027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6908101918402016107b6565b61046960043560408051602081810183526000808352600160a060020a03851681528082528390208054845160026001831615610100026000190190921691909104601f8101849004840282018401909552848152929390918301828280156106ef5780601f106106c4576101008083540402835291602001916106ef565b610467600254600160a060020a03908116339190911614156100bf57600254600160a060020a0316ff5b6104d7600254600160a060020a031681565b6104676004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650505050505050600160a060020a033316600090815260208190526040902060020154610100900460ff161561052757610002565b005b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156104c95780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051600160a060020a03929092168252519081900360200190f35b820191906000526020600020905b81548152906001019060200180831161050257829003601f168201915b505050505081565b600160a060020a03331660009081526020818152604082206002818101805462ff00001916620100001761ff0019166101009081179091558551835484875295859020939560018116159092026000190190911691909104601f9081018490048301939192918601908390106105c057805160ff19168380011785555b506105f09291505b8082111561068457600081556001016105ac565b828001600101855582156105a4579182015b828111156105a45782518260005055916020019190600101906105d2565b5050600160a060020a03331660009081526020818152604080832060018181019490945581518381528154600295811615610100026000190116949094049284018390527f1eed1192a0867d5011d38be86e85233d19c6d7113b8f342323d8c3fc2d8de9b79390929091829190820190849080156106b35780601f10610688576101008083540402835291602001916106b3565b5090565b820191906000526020600020905b81548152906001019060200180831161069657829003601f168201915b50509250505060405180910390a150565b820191906000526020600020905b8154815290600101906020018083116106d257829003601f168201915b50505050509050919050565b5050509190906000526020600020906004020160005060408051608081018252888152602081810189905291810187905260608101859052885183546000858152849020929493849360026001841615610100026000190190931692909204601f90810182900483019392918d019083901061085157805160ff19168380011785555b506108819291506105ac565b50506000600282015560038101805473ffffffffffffffffffffffffffffffffffffffff191690556001015b8082111561068457600060008201600050805460018160011615610100020316600290046000825580601f1061081557505b5060018201600050805460018160011615610100020316600290046000825580601f10610833575061078a565b601f0160209004906000526020600020908101906107e891906105ac565b601f01602090049060005260206000209081019061078a91906105ac565b8280016001018555821561077e579182015b8281111561077e578251826000505591602001919060010190610863565b50506020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106108e057805160ff19168380011785555b506109109291506105ac565b828001600101855582156108d4579182015b828111156108d45782518260005055916020019190600101906108f2565b50506040820151600282015560609190910151600391909101805473ffffffffffffffffffffffffffffffffffffffff1916909117905550949350505050565b5060005b6001548114610a105782600160a060020a03166001600050828154811015610002576000919091526004027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf90154600160a060020a03161415610a0857600180548290811015610002576040516004919091027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf90154600160a060020a03169150600090349082818181858883f150505050505b600101610954565b505050566060604052600060006000505560405161185138038061185183398101604052805160805160a0519183019201908260026000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009457805160ff19168380011785555b506100c49291505b8082111561011d5760008155600101610080565b82800160010185558215610078579182015b828111156100785782518260005055916020019190600101906100a6565b50508160036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061012157805160ff19168380011785555b50610151929150610080565b5090565b82800160010185558215610111579182015b82811115610111578251826000505591602001919060010190610133565b5050600455505060018054600160a060020a031916331790556116d9806101786000396000f3606060405236156100985760e060020a600035046306fdde03811461009a5780632ada2596146100f5578063323046b11461017457806333423c061461017d57806341c0e1b5146102e55780635111dd0a1461030f5780636505e8e8146104035780637284e416146104ce5780637991502e1461052c5780638da5cb5b1461053a578063bacd3d8b1461054c578063f2c298be14610636575b005b6040805160028054602060018216156101000260001901909116829004601f81018290048202840182019094528383526106ae93908301828280156107765780601f1061074b57610100808354040283529160200191610776565b6106ae60043560408051602081810183526000808352600160a060020a038516815260078252835190849020805460026001821615610100026000190190911604601f81018490048402830184019095528482529293909291830182828015610e665780601f10610e3b57610100808354040283529160200191610e66565b61071c60045481565b6100986004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750949650509335935050606435915050608435604080516020818101808452600080845280825283850181815260608581018381528751808901808a528188018681528083528a51808a018c5287815290528590528083018590526080818101869052888101828152865460018181018955908b52603c808e0242908101909a529688905293879052918f905281519097018d905280519098018b90528751928a02909401910152935190910192909252600680549283018082559192909182818380158290116109165760090281600902836000526020600020918201910161091691906109dc565b610098600154600160a060020a0390811633919091161415610e7257600154600160a060020a0316ff5b61009860005b6005548110156107b8576005805482908110156100025760009182527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001909054906101000a9004600160a060020a0316600160a060020a03166371aac7f96040518160e060020a0281526004018090506020604051808303816000876161da5a03f115610002575050604051511590506103fb57600580548290811015610002576000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001805473ffffffffffffffffffffffffffffffffffffffff191690555b600101610315565b610098600435602435600160a060020a033316600090815260076020526040812060020154610100900460ff1660011415610bcf575b600654811015610bcf57600680548290811015610002576000919091526009027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0154831415610bd4578115610b8c5760016006600050848154811015610002575050600984027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d410180549091019055610bcf565b6040805160038054602060026001831615610100026000190190921691909104601f81018290048202840182019094528383526106ae93908301828280156107765780601f1061074b57610100808354040283529160200191610776565b61071c60043560015b919050565b61072e600154600160a060020a031681565b61009860005b6006548110156107b857610bdc60066000508281548110156100025760009182526009027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0190506040805160a08181018352835482526001848101546020848101919091526002868101548587015260038701546060860152855160048801805494851615610100026000190190941691909104601f8101839004909202810160c0908101909652928301818152939594608087019484929091849190840182828015610cbd5780601f10610c9257610100808354040283529160200191610cbd565b6100986004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650505050505050600160a060020a033316600090815260076020526040902060020154610100900460ff16156107bb57610002565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561070e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b820191906000526020600020905b81548152906001019060200180831161075957829003601f168201915b505050505081565b820191906000526020600020905b81548152906001019060200180831161078c57829003601f168201915b50509250505060405180910390a15b50565b33600160a060020a0316600090815260076020908152604082206002818101805462ff00001916620100001761ff001916610100908117909155825486518487529585902093956001821615909202600019011691909104601f90810184900483019391929186019083901061085457805160ff19168380011785555b506108849291505b808211156109125760008155600101610840565b82800160010185558215610838579182015b82811115610838578251826000505591602001919060010190610866565b5050600160a060020a03331660009081526007602090815260408051928190208284528054600260018216156101000260001901909116049284018390527f1eed1192a0867d5011d38be86e85233d19c6d7113b8f342323d8c3fc2d8de9b79390929091829190820190849080156107a95780601f1061077e576101008083540402835291602001916107a9565b5090565b505050919090600052602060002090600902016000508251815560208381015160018381019190915560408501516002848101919091556060860151600385015560048401805460808801518051805160008581528890208b9998939795968796861615610100026000190190951694909404601f9081018490048501949193919290910190839010610a9357805160ff19168380011785555b50610ac3929150610840565b50506000600282018190556003820155600401805460ff19169055506001015b80821115610912576000808255600182810182905560028381018390556003840183905560048401805484825590928492849291821615610100026000190190911604601f819010610a5757505b5060018201600050805460018160011615610100020316600290046000825580601f10610a7557506109bc565b601f016020900490600052602060002090810190610a2a9190610840565b601f0160209004906000526020600020908101906109bc9190610840565b828001600101855582156109b0579182015b828111156109b0578251826000505591602001919060010190610aa5565b50506020820151816001016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610b2257805160ff19168380011785555b50610b52929150610840565b82800160010185558215610b16579182015b82811115610b16578251826000505591602001919060010190610b34565b5050604082015160028201556060820151600382015560040180546080929092015160ff1992909216919091179055505050505050505050565b600160066000508481548110156100025750600052600984027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4201805490910190555b505050565b600101610439565b15610c8a57600680548290811015610002579060005260206000209060090201600060008083556001838101829055600284810183905560038501839055600485018054848255909392849290821615610100026000190190911604601f819010610dff57505b5060018201600050805460018160011615610100020316600290046000825580601f10610e1d57505b50506000600282018190556003820155600401805460ff1916905550505b600101610552565b820191906000526020600020905b815481529060010190602001808311610ca057829003601f168201915b505050918352505060408051600184810180546020600293821615610100026000190190911692909204601f810183900483028401830190945283835293810193919290830182828015610d525780601f10610d2757610100808354040283529160200191610d52565b820191906000526020600020905b815481529060010190602001808311610d3557829003601f168201915b505050918352505060028201546020820152600382015460408201526004919091015460ff1660609190910152905250600081602001518042101515610e7457826060015183604001511115610e7a57610e848360808181015160019101819052600580549182018082559091908281838015829011610e8e57828a52610e8e907f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0908101908301610840565b601f016020900490600052602060002090810190610c439190610840565b601f016020900490600052602060002090810190610c6c9190610840565b820191906000526020600020905b815481529060010190602001808311610e4957829003601f168201915b50505050509050610535565b565b50919050565b6000915050610535565b6001915050610535565b50505091909060005260206000209001600060408051608086015180516020820151938201516060929092015190939261071780610fc28339018080602001806020018581526020018481526020018381038352878181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610f355780820380516001836020036101000a031916815260200191505b508381038252868181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610f8e5780820380516001836020036101000a031916815260200191505b509650505050505050604051809103906000f0909190916101000a815481600160a060020a0302191690830217905550505056606060405260405161071738038061071783398101604052805160805160a05160c05192840193919091019160018054600160a060020a03191633178155845160028054600082905290926020908216156101000260001901909116839004601f9081018290047f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace908101939290919089019083901061010557805160ff19168380011785555b506101359291505b8082111561018e57600081556001016100ae565b50506005829055603c810242016004556007805460ff19169055600060068190558054600160a060020a0319163317905550505050610555806101c26000396000f35b828001600101855582156100a6579182015b828111156100a6578251826000505591602001919060010190610117565b50508260036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019257805160ff19168380011785555b506100c29291506100ae565b5090565b82800160010185558215610182579182015b828111156101825782518260005055916020019190600101906101a456606060405236156100775760e060020a600035046306fdde0381146101a557806329dcb0cf1461020057806338af3eed14610209578063401938831461021b57806371aac7f9146102245780637284e416146102ac57806375d776911461030a5780638da5cb5b14610313578063acc8ced314610325575b61033160005b60085481101561011a5733600160a060020a03166008600050828154811015610002576000919091526002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30154600160a060020a0316141561033357346008600050828154811015610002576002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee4018054909201909155505b60085481141561038e576008805460018101808355828183801582901161033b57600083905261033b9060029081027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee3908101918402015b808211156103e057805473ffffffffffffffffffffffffffffffffffffffff191681556000600191909101908155610172565b6040805160028054602060018216156101000260001901909116829004601f81018290048202840182019094528383526103e493908301828280156104ac5780601f10610481576101008083540402835291602001916104ac565b61045260045481565b610464600154600160a060020a031681565b61045260055481565b610452600454600090819042106103e05760065460055490106104b457600154604051600654600160a060020a039290921691839182818181858883f150600181526020810191909152604080517f4181430b0977e558b5611a9975a69a2552e7c647428e5a66cff73b20c15426d6945091829003019150a15b600154600160a060020a0316ff5b6040805160038054602060026001831615610100026000190190921691909104601f81018290048202840182019094528383526103e493908301828280156104ac5780601f10610481576101008083540402835291602001916104ac565b61045260065481565b610464600054600160a060020a031681565b61045260075460ff1681565b005b60010161007d565b50505091909060005260206000209060020201600050604080518082019091523380825234602092909201829052825473ffffffffffffffffffffffffffffffffffffffff191617825560019190910155505b600680543490810190915560408051600160a060020a0333168152602081019290925280517f2990aa85754a2dc2ed3761d2f1ad1620e25fc80d232b2d032eceb204ba4b87be9281900390910190a150565b5090565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156104445780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b820191906000526020600020905b81548152906001019060200180831161048f57829003601f168201915b505050505081565b5060005b60085481101561029e5760088054829081101561000257600082815282546002929092027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30154600160a060020a03169290918490811015610002576002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee4015460405190915082818181858883f150505050506001016104b856";

  if ("0x3d791aa41f6d82486fe328d264991377fe962510" != "") {
    BasicOrga.address = "0x3d791aa41f6d82486fe328d264991377fe962510";

    // Backward compatibility; Deprecated.
    BasicOrga.deployed_address = "0x3d791aa41f6d82486fe328d264991377fe962510";
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