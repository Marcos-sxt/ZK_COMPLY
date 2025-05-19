const hre = require("hardhat");

async function main() {
  const SubstanceVerifier = await hre.ethers.getContractFactory("SubstanceVerifier");
  const verifier = await SubstanceVerifier.deploy();

  await verifier.waitForDeployment();

  console.log("SubstanceVerifier deployed to:", await verifier.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 