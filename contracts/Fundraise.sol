contract Fundraise {

  address public owner;
  address public beneficiary;
  string public name;
  string public description;
  uint public deadline;
  uint public goal;
  uint public actual;
  bool public isRaising;

  struct Contributor {
    address addr;
    uint contribution;
  }

  Contributor[] contributors;

  event newDonation(address addr, uint value);

  function Fundraise(address _beneficiary, string _name, string _description, uint _goal, uint _duration) {
    beneficiary = _beneficiary;
    name = _name;
    description = _description;
    goal = _goal;
    deadline = now + _duration * 1 minutes;
    isRaising = false;
    actual = 0;
    owner = msg.sender;
  }

  function donate() {
    uint i;
    for (i = 0; i < contibutors.length; ++i) {
        if (contributors[i].addr == msg.sender) {
            contributors[i].contribution += msg.value;
            break;
        }
    }
    if (i == contributors.length)
        contributors.push(Contributor({addr:msg.sender, contribution:msg.value}));
    actual += msg.value;
    newDonation(msg.sender, msg.value);
  }

  function endCampaign() returns (boolean) {
    if (now > deadline {
        if (alreadyRaised >= fundingGoal) {
          beneficiary.send(alreadyRaised);
          endOfCampaign(true, alreadyRaised);
        }
        else {
          for (uint i = 0; i < contributors.length; ++i)
            contributors[i].addr.send(contributors[i].contribution);
        }
        suicide(beneficiary);
        return true;
    }
    else
        return false;
  }
}
