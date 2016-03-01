contract Fundraise {

  address public owner;
  address public beneficiary;
  string public name;
  string public description;
  uint public deadline;
  uint public goal;
  uint public alreadyRaised;
  bool public isRaising;

  struct Contributor {
    address addr;
    uint contribution;
  }

  Contributor[] contributors;

  event newDonationToFundraise(address fundraiseAddr, address userAddr, uint amount);
  event endFundraise(address fundraiseAddr, bool outcome);

  function Fundraise(string _name, string _description, uint _goal, uint _timeLimit) {
    beneficiary = msg.sender;
    name = _name;
    description = _description;
    goal = _goal;
    deadline = now + _timeLimit * 1 minutes;
    isRaising = true;
    alreadyRaised = 0;
    owner = msg.sender;
  }

  function donate() {
    uint i;
    for (i = 0; i < contributors.length; ++i) {
        if (contributors[i].addr == msg.sender) {
            contributors[i].contribution += msg.value;
            break;
        }
    }
    if (i == contributors.length)
        contributors.push(Contributor({addr:msg.sender, contribution:msg.value}));
    alreadyRaised += msg.value;
    newDonationToFundraise(this, msg.sender, msg.value);
  }

  modifier deadlineReached { if (now >= deadline) _ }

  function endCampaign() public deadlineReached returns (bool) {
        if (alreadyRaised >= goal) {
          beneficiary.send(alreadyRaised);
          endFundraise(this, true);
        }
        else {
          endFundraise(this, false);
          for (uint i = 0; i < contributors.length; ++i)
            contributors[i].addr.send(contributors[i].contribution);
        }
        suicide(beneficiary);
        return true;
    }
}
