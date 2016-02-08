contract BasicOrga {

struct Rights {
bool destroy;
bool vote;
bool propose;
bool spend;
}

struct User {
string name;
Rights rights;
}

mapping (address => User) members;
address public creator;
string public name;

function BasicOrga(string _name) {
creator = msg.sender;
}

function register(string _name) {
User memory newMember = members[msg.sender];

if (newMember.rights.vote) {
throw;
}
newMember.rights.vote = true;
newMember.rights.propose = true;
newMember.name = _name;
members[msg.sender] = newMember;
}

function getMember(address user) returns (string) {
return members[user].name;
}

}