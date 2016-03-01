import "Fundraise";

contract Project {

  uint maxId = 0;
  address public owner;
  string public name;
  string public description;
  uint public date;

  struct Rights {
    bool destroy;
    bool vote;
    bool propose;
    bool spend;
  }

  struct User {
    string name;
    uint contribution;
    Rights rights;
  }

  struct FundraiseInfo {
    address addr;
    string name;
    string description;
    uint goal;
    uint timeLimit;
  }

  struct Proposal {
    uint id;
    string name;
    string description;
    uint amount;
    address beneficiary;
    uint timeLimit;
    uint votes;
    mapping (address => bool) voters;
  }

  Fundraise[] activeCampaigns;
  Proposal[] proposal;
  mapping (address => User) members;

  event userJoinedProject(address userAddr, address projAddr, string userName);
  event newProposal(address projAddr, uint id, string name, string description, uint amount, address beneficiary, uint timeLimit);
  event newVote(address projAddr, uint id, bool vote);
  event newFundraise(address fundraiseAddr, string name, string description, uint goal, uint timeLimit);
  event projectDeleted(address projAddr);

modifier onlyOwner() { if (msg.sender == owner) _ }

  function Project(string _name, string _description) {
    name = _name;
    description = _description;
    date = now;
    owner = msg.sender;
  }

  function register(string _name) {
    if (members[msg.sender].rights.vote) {
      throw;
    }
    members[msg.sender].rights.propose = true;
    members[msg.sender].rights.vote = true;
    members[msg.sender].name = _name;
    userJoinedProject(msg.sender, this, _name);
  }

  function createProposal(string name, string description, uint amount, address beneficiary, uint timeLimit) {
    proposal.push(Proposal(maxId, name, description, amount, beneficiary, now + timeLimit * 1 minutes, 0));
    newProposal(this, maxId++, name, description, amount, beneficiary, timeLimit);
  }

  function createFundraise(string name, string description, uint goal, uint timeLimit) {
    Fundraise addr = new Fundraise(name, description, goal, timeLimit);
    newFundraise(addr, name, description, goal, now + timeLimit * 1 minutes);
    activeCampaigns.push(addr);
  }

  function voteForProposal(uint id, bool vote) {
    if (members[msg.sender].rights.vote == true) {
        for (uint i = 0; i < proposal.length; ++i) {
            if (id == proposal[i].id
                && proposal[i].voters[msg.sender] == false) {
                if (vote)
                    proposal[id].votes += 1;
                else
                    proposal[id].votes -= 1;
                newVote(this, id, vote);
                break;
            }
        }
    }
  }

  function checkProposal() {
      for (uint i = 0; i < proposal.length; ++i) {
          if (endProposal(proposal[i]))
              delete proposal[i];
      }
  }

  function checkCampaigns() {
      for (uint i = 0; i < activeCampaigns.length; ++i) {
          if (activeCampaigns[i].endCampaign())
            delete activeCampaigns[i];
      }
  }

  modifier deadlineReached(uint deadline) { if (now >= deadline) _ }

  function endProposal(Proposal pro) internal deadlineReached(pro.timeLimit) returns (bool) {
    if (pro.votes > 0)
      pro.beneficiary.send(pro.amount);
    else
        return false;
    return true;
  }

  function getMember(address user) returns (string) {
    return members[user].name;
  }

  function kill() onlyOwner {
    projectDeleted(this);
    suicide(owner);
  }
}
