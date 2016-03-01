"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Project = (function (_Pudding) {
    _inherits(Project, _Pudding);

    function Project() {
      _classCallCheck(this, Project);

      _get(Object.getPrototypeOf(Project.prototype), "constructor", this).apply(this, arguments);
    }

    return Project;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Project.abi = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "name", "type": "string" }, { "name": "description", "type": "string" }, { "name": "amount", "type": "uint256" }, { "name": "beneficiary", "type": "address" }, { "name": "timeLimit", "type": "uint256" }], "name": "createProposal", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "user", "type": "address" }], "name": "getMember", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "name", "type": "string" }, { "name": "description", "type": "string" }, { "name": "goal", "type": "uint256" }, { "name": "timeLimit", "type": "uint256" }], "name": "createFundraise", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "date", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function" }, { "constant": false, "inputs": [], "name": "checkCampaigns", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "id", "type": "uint256" }, { "name": "vote", "type": "bool" }], "name": "voteForProposal", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "description", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [], "name": "checkProposal", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "register", "outputs": [], "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_description", "type": "string" }], "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "userAddr", "type": "address" }, { "indexed": false, "name": "projAddr", "type": "address" }, { "indexed": false, "name": "userName", "type": "string" }], "name": "userJoinedProject", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "projAddr", "type": "address" }, { "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "description", "type": "string" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "beneficiary", "type": "address" }, { "indexed": false, "name": "timeLimit", "type": "uint256" }], "name": "newProposal", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "projAddr", "type": "address" }, { "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "vote", "type": "bool" }], "name": "newVote", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "fundraiseAddr", "type": "address" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "description", "type": "string" }, { "indexed": false, "name": "goal", "type": "uint256" }, { "indexed": false, "name": "timeLimit", "type": "uint256" }], "name": "newFundraise", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "projAddr", "type": "address" }], "name": "projectDeleted", "type": "event" }];
  Project.binary = "60606040526000600060005055604051611b4b380380611b4b83398101604052805160805190820191018160026000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100b857805160ff19168380011785555b506100e89291505b80821115610141576000815560010161007c565b50504260045560018054600160a060020a0319163317905550506119d6806101756000396000f35b82800160010185558215610074579182015b828111156100745782518260005055916020019190600101906100ca565b50508060036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014557805160ff19168380011785555b5061009092915061007c565b5090565b82800160010185558215610135579182015b8281111561013557825182600050559160200191906001019061015756606060405236156100985760e060020a600035046306fdde03811461009a5780631eff4322146100f55780632ada2596146101bc5780632d5fde2e1461023b578063323046b1146104fc57806341c0e1b5146105055780635111dd0a1461057e5780636505e8e8146106655780637284e4161461078d5780638da5cb5b146107eb578063bacd3d8b146107fd578063f2c298be146108ba575b005b6040805160028054602060018216156101000260001901909116829004601f81018290048202840182019094528383526109329390830182828015610f735780601f10610f4857610100808354040283529160200191610f73565b6100986004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750506040805160208835808b0135601f810183900483028401830190945283835297999860449892975091909101945090925082915084018382808284375094965050933593505060643591505060843560068054600181018083558281838015829011610b5557600802816008028360005260206000209182019101610b559190610c32565b61093260043560408051602081810183526000808352600160a060020a038516815260078252835190849020805460026001821615610100026000190190911604601f81018490048402830184019095528482529293909291830182828015610fa65780601f10610f7b57610100808354040283529160200191610fa6565b6100986004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750949650509335935050606435915050600084848484604051610724806112b28339018080602001806020018581526020018481526020018381038352878181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156103495780820380516001836020036101000a031916815260200191505b508381038252868181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156103a25780820380516001836020036101000a031916815260200191505b509650505050505050604051809103906000f090507fcc103adf0018d8fa2925ba24d8c4d21636f088dd681d588a8461da290827f26e8186868686603c0242016040518086600160a060020a0316815260200180602001806020018581526020018481526020018381038352878181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156104615780820380516001836020036101000a031916815260200191505b508381038252868181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156104ba5780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390a160058054600181018083558281838015829011610f2257818360005260206000209182019101610f229190610b0d565b6109a060045481565b610098600154600160a060020a0390811633919091161415610fb3576040805130600160a060020a0316815290517f5813657f499b4f4ca1f86ecb1cceb2ff5e266f3397eb49f878baa4e073eac25d9181900360200190a1600160009054906101000a9004600160a060020a0316600160a060020a0316ff5b61009860005b600554811015610a83576005805482908110156100025760009182527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db001909054906101000a9004600160a060020a0316600160a060020a03166371aac7f96040518160e060020a0281526004018090506020604051808303816000876161da5a03f1156100025750506040515115905061065d57600580548290811015610002576000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0018054600160a060020a03191690555b600101610584565b610098600435602435600160a060020a033316600090815260076020526040812060020154610100900460ff1660011415611044575b60065481101561104457600680548290811015610002576000919091526008027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f01548314801561073a57506006805482908110156100025733600160a060020a031660009081526008919091027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d4601602052604081205460ff161490505b15611049578115610fb55760016006600050848154811015610002576000919091526008027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d450180549091019055610ffa565b6040805160038054602060026001831615610100026000190190921691909104601f81018290048202840182019094528383526109329390830182828015610f735780601f10610f4857610100808354040283529160200191610f73565b6109b2600154600160a060020a031681565b61009860005b600654811015610a835761105160066000508281548110156100025760009182526008027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0190506040805160e081018252825481528151600184810180546020600293821615610100026000190190911692909204601f810183900483028401830190955284835292949385820193918301828280156111415780601f1061111657610100808354040283529160200191611141565b6100986004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650505050505050600160a060020a033316600090815260076020526040902060020154610100900460ff1615610a8657610002565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156109925780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b50507f43b56c0785114ec379b3cde38a858c49e24eda8e4548087aec51c9530bf006d13330836040518084600160a060020a0316815260200183600160a060020a03168152602001806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610a735780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a15b50565b600160a060020a033316600090815260076020908152604082206002818101805462ff00001916620100001761ff0019166101009081179091558551835484875295859020939560018116159092026000190190911691909104601f908101849004830193919291860190839010610b2157805160ff19168380011785555b506109cf9291505b80821115610b515760008155600101610b0d565b82800160010185558215610b05579182015b82811115610b05578251826000505591602001919060010190610b33565b5090565b505050919090600052602060002090600802016000506040805160e0810182526000805480835260208381018c90529383018a90526060830189905260808301889052603c8702420160a084015260c083018290528455895160018581018054818552938690209496959094600292851615610100026000190190941691909104601f908101829004840193918d0190839010610cd157805160ff19168380011785555b50610d01929150610b0d565b5050600060038201819055600482018054600160a060020a03191690556005820181905560068201556001015b80821115610b51576000808255600182810180548382559091600290821615610100026000190190911604601f819010610c9557505b5060028201600050805460018160011615610100020316600290046000825580601f10610cb35750610c05565b601f016020900490600052602060002090810190610c689190610b0d565b601f016020900490600052602060002090810190610c059190610b0d565b82800160010185558215610bf9579182015b82811115610bf9578251826000505591602001919060010190610ce3565b50506040820151816002016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610d6057805160ff19168380011785555b50610d90929150610b0d565b82800160010185558215610d54579182015b82811115610d54578251826000505591602001919060010190610d72565b50506060820151816003016000505560808201518160040160006101000a815481600160a060020a030219169083021790555060a0820151816005016000505560c082015181600601600050555050507fae0291b0990f7f317469cd4ee97f18b18f14e51d8f0dfd6d611a8566f301d739306000600081815054809291906001019190505587878787876040518088600160a060020a03168152602001878152602001806020018060200186815260200185600160a060020a031681526020018481526020018381038352888181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610eae5780820380516001836020036101000a031916815260200191505b508381038252878181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f168015610f075780820380516001836020036101000a031916815260200191505b50995050505050505050505060405180910390a15050505050565b5050506000928352506020909120018054600160a060020a031916909117905550505050565b820191906000526020600020905b815481529060010190602001808311610f5657829003601f168201915b505050505081565b820191906000526020600020905b815481529060010190602001808311610f8957829003601f168201915b505050505090505b919050565b565b60016006600050848154811015610002575060005250600883027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d450180546000190190555b6040805130600160a060020a031681526020810185905280820184905290517fc495e23907c31b7f898a8c903cda0057f21fb529a788707c8d5c5a3f832004af9181900360600190a15b505050565b60010161069b565b1561110e576006805482908110156100025760009182526008027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f01906000808355600183810180549281559160029181161561010002600019011604601f81901061126657505b5060028201600050805460018160011615610100020316600290046000825580601f1061128457505b5050600060038201819055600482018054600160a060020a031916905560058201819055600691909101555b600101610803565b820191906000526020600020905b81548152906001019060200180831161112457829003601f168201915b5050509183525050604080516002848101805460206001821615610100026000190190911692909204601f8101839004830284018301909452838352938101939192908301828280156111d55780601f106111aa576101008083540402835291602001916111d5565b820191906000526020600020905b8154815290600101906020018083116111b857829003601f168201915b5050509183525050600382015460208201526004820154600160a060020a0316604082015260058201546060820152600691909101546080919091015260008160a0015180421015156112a25760008360c0015111156112a8578260800151600160a060020a031660008460600151604051809050600060405180830381858888f150505050506001915050610fae565b601f0160209004906000526020600020908101906110b99190610b0d565b601f0160209004906000526020600020908101906110e29190610b0d565b50919050565b6000915050610fae56606060405260405161072438038061072483398101604052805160805160a05160c05192840193919091019160018054600160a060020a03191633178155845160028054600082905290926020908216156101000260001901909116839004601f9081018290047f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace908101939290919089019083901061010557805160ff19168380011785555b506101359291505b8082111561018e57600081556001016100ae565b50506005829055603c810242016004556007805460ff19169055600060068190558054600160a060020a0319163317905550505050610562806101c26000396000f35b828001600101855582156100a6579182015b828111156100a6578251826000505591602001919060010190610117565b50508260036000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019257805160ff19168380011785555b506100c29291506100ae565b5090565b82800160010185558215610182579182015b828111156101825782518260005055916020019190600101906101a456606060405236156100825760e060020a600035046306fdde03811461008457806329dcb0cf146100df57806338af3eed146100e857806340193883146100fa57806371aac7f9146101035780637284e4161461018b57806375d77691146101e95780638da5cb5b146101f2578063acc8ced314610204578063ed88c68e14610210575b005b6040805160028054602060018216156101000260001901909116829004601f810182900482028401820190945283835261033e93908301828280156104ad5780601f10610482576101008083540402835291602001916104ad565b6103ac60045481565b6103be600154600160a060020a031681565b6103ac60055481565b6103ac600454600090819042106103db5760065460055490106103df57600154604051600654600160a060020a039290921691839182818181858883f150600181526020810191909152604080517f4181430b0977e558b5611a9975a69a2552e7c647428e5a66cff73b20c15426d6945091829003019150a15b600154600160a060020a0316ff5b6040805160038054602060026001831615610100026000190190921691909104601f810182900482028401820190945283835261033e93908301828280156104ad5780601f10610482576101008083540402835291602001916104ad565b6103ac60065481565b6103be600054600160a060020a031681565b6103ac60075460ff1681565b61008260005b6008548110156102b35733600160a060020a03166008600050828154811015610002576000919091526002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30154600160a060020a031614156104b557346008600050828154811015610002576002027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee4018054909201909155505b60085481141561051057600880546001810180835582818380158290116104bd5760008390526104bd9060029081027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee3908101918402015b808211156103db57805473ffffffffffffffffffffffffffffffffffffffff19168155600060019190910190815561030b565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f16801561039e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b5090565b5060005b60085481101561017d5760088054829081101561000257600082815282546002929092027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30154600160a060020a03169290918490811015610002576040516002919091027ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee40154915082818181858883f150505050506001016103e3565b820191906000526020600020905b81548152906001019060200180831161049057829003601f168201915b505050505081565b600101610216565b50505091909060005260206000209060020201600050604080518082019091523380825234602092909201829052825473ffffffffffffffffffffffffffffffffffffffff191617825560019190910155505b600680543490810190915560408051600160a060020a0333168152602081019290925280517f2990aa85754a2dc2ed3761d2f1ad1620e25fc80d232b2d032eceb204ba4b87be9281900390910190a15056";

  if ("" != "") {
    Project.address = "";

    // Backward compatibility; Deprecated.
    Project.deployed_address = "";
  }

  Project.generated_with = "1.0.3";
  Project.contract_name = "Project";

  return Project;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Project = factory;
}