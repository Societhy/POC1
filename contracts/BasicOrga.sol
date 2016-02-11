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

  event newDonation(address addr, uint value);
  event newUser(string name);

  mapping (address => User) members;
  address public creator;
  string public name;

  function BasicOrga(string _name) {
    creator = msg.sender;
  }

  function donate() {
    members[msg.sender].contribution = msg.value;
    newDonation(msg.sender, msg.value);
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

  function getMember(address user) returns (string) {
    return members[user].name;
  }


  function kill() {
    suicide(creator);
  }
}
