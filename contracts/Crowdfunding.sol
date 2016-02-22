contract Crowdfunding {

  struct Contributor
  {
    address addr;
    uint contribution;
  }

  address public beneficiary;
  uint public fundingGoal;
  uint public alreadyRaised;
  uint public deadline;
  Contributor[] contributors;

  event newContribution(address addr, uint amount);
  event endOfCampaign(bool success, uint amount);

  function Crowdfunding(address _beneficiary, uint _fundingGoal, uint _duration) {

    beneficiary = _beneficiary;
    fundingGoal = _fundingGoal;
    deadline = now + (_duration * 1 minutes);
  }

  function () {
  uint i;
    for (i = 0; i < contibutors.length; ++i) {
        if (contributors[i].addr == msg.sender) {
            contributors[i].contribution += msg.value;
            break;
        }
    }
    if (i == contributors.length)
        contributors.push(Contributor({addr:msg.sender, contribution:msg.value}));
    alreadyRaised += msg.value;
    newContribution(msg.sender, amount);
  }

  modifier afterDeadline() { if (now >= deadline) _ }

  function endCampaign() afterDeadline {
    if (alreadyRaised >= fundingGoal) {
      beneficiary.send(alreadyRaised);
      endOfCampaign(true, alreadyRaised);
    }
    else {
      for (uint i = 0; i < contributors.length; ++i)
	contributors[i].addr.send(contributors[i].contribution);
    }
    suicide(beneficiary);
  }
}
