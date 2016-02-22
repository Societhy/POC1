import "Project"

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

  struct Project {
    string name;
    string description;
    uint startDate;
  }

  event newDonation(address addr, uint value);
  event newUser(string name);

  mapping (address => User) members;
  address[] projects;
  address public creator;
  string public name;

  function BasicOrga(string _name) {
    creator = msg.sender;
    name = _name;
  }

  function donation() {
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

  function createProject(string _name, string _description, uint _date) {
    projects.push(new Project(name : _name, description : _description, date : _date));
  }

  function kill() {
    suicide(creator);
  }
}
