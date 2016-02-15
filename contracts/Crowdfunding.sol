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
    uint amount = msg.value;
    address sender = msg.sender;

    contributors.push(Contributor({addr:sender, contribution:amount}));
    alreadyRaised += amount;
    newContribution(sender, amount);
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
