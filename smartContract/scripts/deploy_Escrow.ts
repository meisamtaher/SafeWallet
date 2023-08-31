import hre, { ethers } from "hardhat";
async function main() {
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy();
  await escrow.deployed();
  console.log("Escrow Contract deployed at: ", escrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
