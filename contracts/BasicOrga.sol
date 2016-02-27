import "Project";

contract BasicOrga {

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

  struct ProjectInfo {
    string name;
    string description;
    uint startDate;
address addr;
  }

  event newDonation(address addr, uint value);
  event newUser(string name);

  mapping (address => User) members;
  ProjectInfo[] projects;
  address public owner;
  string public name;

modifier onlyOwner() { if (msg.sender == owner) _ }

  function BasicOrga(string _name) {
    owner = msg.sender;
    name = _name;
  }

  function donate() {
    members[msg.sender].contribution += msg.value;
    newDonation(msg.sender, msg.value);
  }

  function register(string _name) {
    if (members[msg.sender].rights.vote) {
      throw;
    }
    members[msg.sender].rights.propose = true;
    members[msg.sender].rights.vote = true;
    members[msg.sender].name = _name;
    members[msg.sender].contribution = 0;
    newUser(members[msg.sender].name);
  }

  function getMember(address user) returns (string) {
    return members[user].name;
  }

  function createProject(string _name, string _description) returns (address addr) {
address projectAddr = new Project(_name, _description);
    projects.push(ProjectInfo(_name, _description, now, projectAddr));
    return projectAddr;
  }

function transferFundToProject(address projectAddr, uint amount) {
if (!members[msg.sender].rights.spend
|| amount > this.balance)
throw;

for (uint i = 0; i != projects.length; ++i) {
if (projects[i].addr == projectAddr) {
projects[i].addr.send(msg.value);
}
}
}

  function kill() onlyOwner {
    suicide(owner);
  }
}
