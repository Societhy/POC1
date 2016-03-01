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
    Project addr;
  }

  event newDonation(address userAddr, address orgAddr, uint value);
  event userJoinedOrga(address userAddr, address orgAddr, string userName);
  event newProject(address projAddr, address orgAddr, string projName, string projDesc);
  event orgaDeleted(address orgAddr);

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
    newDonation(msg.sender, this, msg.value);
  }

  function register(string _name) {
    if (members[msg.sender].rights.vote) {
      msg.sender.send(msg.value);
      throw;
    }
    members[msg.sender].rights.propose = true;
    members[msg.sender].rights.vote = true;
    members[msg.sender].name = _name;
    members[msg.sender].contribution = 0;
    userJoinedOrga(msg.sender, this, _name);
  }

  function getMember(address user) returns (string) {
    return members[user].name;
  }

  function createProject(string _name, string _description) {
    Project projectAddr = new Project(_name, _description);
    projects.push(ProjectInfo(_name, _description, now, projectAddr));
    newProject(projectAddr, this, _name, _description);
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

  function destroyProject(address addr) onlyOwner {
    for (uint i = 0; i < projects.length; ++i) {
      if (projects[i].addr == addr) {
        projects[i].addr.kill();
      }
    }
  }

  function kill() onlyOwner {
    orgaDeleted(this);
    suicide(owner);
  }
}
