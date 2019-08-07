pragma solidity ^0.5.8;

contract Election {

    //Model + Store + Fetch + Store candidate count

    //Model
    //I heard that if we ever want to access its properties... instead of using .id, we have to remember the order
    //then use c[0] to get id for example <- in console and while you are testing in js file
    //Store
    //let's assume that we have 3 candidates, in other normal coding language, if we call the 4th one,
    //it will return a segment memory failed because we exceed the preset limit.
    //But contrast to that, solidity will return a default, blank variable, as if the 4th candidate exists
    //so it will keep looping and looping.
    struct Candidate {
        uint8 id;
        uint voteCount;
        string name;
    }

    mapping (uint => Candidate) public candidates;
    uint8 public candidatesCount;

    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate(string memory _name) private {
        candidates[candidatesCount] = Candidate(candidatesCount + 1, 0, _name);
        candidatesCount++;
    }

    event votedEvent(uint indexed _candidateId);

    function vote(uint8 _candidateId) public {
        require(_candidateId > 0 && _candidateId < candidatesCount, "Candidate must exists");
        candidates[_candidateId].voteCount++;
        emit votedEvent(_candidateId);
    }
}