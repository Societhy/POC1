import "Fundraise";

contract Project {

  uint maxid = 0;
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
    string name;
    string description;
    uint goal;
    uint timeLimit;
    bool isActive;
  }

  struct Proposal {
    uint id;
    uint timeLimit;
    uint positive;
    uint against;
    FundraiseInfo info;
  }

  Fundraise[] activeCampaigns;
  Proposal[] proposal;
  mapping (address => User) members;

  event newUser(string name);

modifier onlyOwner() { if (msg.sender == owner) _ }

  function Project(string _name, string _description, uint _date) {
    name = _name;
    description = _description;
    date = _date;
    owner = msg.sender;
  }

  function register(string _name) {
    if (members[msg.sender].rights.vote) {
      throw;
    }
    members[msg.sender].rights.propose = true;
    members[msg.sender].rights.vote = true;
    members[msg.sender].name = _name;
    newUser(members[msg.sender].name);
  }

  function createProposal(string name, string description, uint goal, uint timeLimit, uint proposalLimit)
  {
    Proposal memory buff;
    buff.id = maxid++;
    buff.timeLimit = now + proposalLimit * 1 minutes;
    buff.positive = 0;
    buff.against = 0;
    buff.info.name = name;
    buff.info.description = description;
    buff.info.goal = goal;
    buff.info.timeLimit = now + timeLimit * 1 minutes;
buff.info.isActive = false;
    proposal.push(buff);
  }

  function createFundraise(Proposal proposal) private {
proposal.info.isActive = true;
    activeCampaigns.push(new Fundraise(proposal.info.name, proposal.info.description, proposal.info.goal, proposal.info.timeLimit));
  }

  function voteForProposal(uint id, bool vote)
  {
    if (members[msg.sender].rights.vote == true) {
        for (uint i = 0; i < proposal.length; ++i) {
            if (id == proposal[i].id) {
                if (vote)
                    proposal[id].positive += 1;
                else
                    proposal[id].against += 1;
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
    if (pro.positive > pro.against)
        createFundraise(pro);
    else
        return false;
    return true;
  }

  function getMember(address user) returns (string) {
    return members[user].name;
  }

  function getProposals(address fundraise) returns (bool) {
return true;
  }

  function kill() onlyOwner {
        suicide(owner);
  }
}
