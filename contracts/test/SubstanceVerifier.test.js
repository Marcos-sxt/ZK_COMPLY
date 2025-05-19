const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SubstanceVerifier", function () {
  let verifier;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const SubstanceVerifier = await ethers.getContractFactory("SubstanceVerifier");
    verifier = await SubstanceVerifier.deploy();
  });

  describe("Registration", function () {
    it("Should register a new substance", async function () {
      const substanceId = ethers.keccak256(ethers.toUtf8Bytes("test-substance"));
      const commitment = ethers.keccak256(ethers.toUtf8Bytes("test-commitment"));

      await verifier.registerSubstance(substanceId, commitment);
      const storedCommitment = await verifier.getCommitment(substanceId);

      expect(storedCommitment).to.equal(commitment);
    });
  });

  describe("Verification", function () {
    it("Should verify a substance's composition", async function () {
      const substanceId = ethers.keccak256(ethers.toUtf8Bytes("test-substance"));
      const commitment = ethers.keccak256(ethers.toUtf8Bytes("test-commitment"));

      await verifier.registerSubstance(substanceId, commitment);
      await verifier.verifyProof(substanceId, 0, 10000);

      const history = await verifier.getVerificationHistory(substanceId);
      expect(history.length).to.equal(1);
      expect(history[0].compositionIndex).to.equal(0);
      expect(history[0].threshold).to.equal(10000);
      expect(history[0].verified).to.be.true;
    });

    it("Should fail for non-existent substance", async function () {
      const substanceId = ethers.keccak256(ethers.toUtf8Bytes("non-existent"));
      
      await expect(
        verifier.verifyProof(substanceId, 0, 10000)
      ).to.be.revertedWithCustomError(verifier, "SubstanceNotFound");
    });

    it("Should fail for invalid composition index", async function () {
      const substanceId = ethers.keccak256(ethers.toUtf8Bytes("test-substance"));
      const commitment = ethers.keccak256(ethers.toUtf8Bytes("test-commitment"));

      await verifier.registerSubstance(substanceId, commitment);
      
      await expect(
        verifier.verifyProof(substanceId, 30, 10000)
      ).to.be.revertedWithCustomError(verifier, "InvalidCompositionIndex");
    });
  });
}); 