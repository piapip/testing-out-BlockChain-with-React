var Election = artifacts.require("../contracts/Election.sol");

contract("Election", function (accounts) {

  it("initializes with two candidates properly", async () => {
    let electionInstance = await Election.deployed();

    let count = await electionInstance.candidatesCount();
    assert.equal(count, 2, "Expected 2 candidates");

    let candidate1 = await electionInstance.candidates(0);
    assert.equal(candidate1[0], 1, "Wrong id");
    assert.equal(candidate1[1], 0, "Wrong vote count");
    assert.equal(candidate1[2], "Candidate 1", "Wrong name");

    let candidate2 = await electionInstance.candidates(1);
    assert.equal(candidate2[0], 2, "Wrong id");
    assert.equal(candidate2[1], 0, "Wrong vote count");
    assert.equal(candidate2[2], "Candidate 2", "Wrong name");
  });

  it("allow to cast vote and vote properly", async() => {
    let electionInstance = await Election.deployed();
    candidateId = 1;

    let receipt = await electionInstance.vote(candidateId, { from: accounts[0] });
    assert.equal(receipt.logs.length, 1, "there should be a triggered event");
    assert.equal(receipt.logs[0].event, "votedEvent", "Event type is not correct");
    assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "Wrong _candidateId");
  });
})