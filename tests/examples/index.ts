import { Interface } from "ethers/lib/utils";
import { expectEvent, CONTRACT, IT, CONSOLE } from "~/utils";
import { redeployContract } from "~/artifacts";
const hre = require("hardhat");
import { BigNumber } from "ethers";

import {
  ERC1155MMintABI,
  ERC1155MMintArtifact,
  ERC1155MMintContract,
} from "~/abi/ERC1155MMint";

export function runTests() {
  CONTRACT("1155M mint example", test_mintToken);
}

function test_mintToken() {
  let erc1155mInstance: ERC1155MMintContract;

  beforeEach(async () => {
    CONSOLE.log(new Interface(ERC1155MMintABI).getSighash("mint"));
    erc1155mInstance = await redeployContract<ERC1155MMintArtifact>(
      "ERC1155MMint",
      {
        args: [""],
      }
    );
  });

  IT("Should be able to mint if payment at least 0.01 ether", async () => {
    const [owner] = await hre.ethers.getSigners();
    const tokenId = hre.ethers.BigNumber.from("0");

    let receipt = await erc1155mInstance.mint(
      owner.address,
      tokenId,
      hre.ethers.constants.HashZero,
      {
        value: hre.ethers.utils.parseEther("0.01"),
      }
    );

    expectEvent(receipt, "TransferSingle");
  });

  IT("Should revert mint if not enough funds", async () => {
    const [owner] = await hre.ethers.getSigners();
    const tokenId = hre.ethers.BigNumber.from("0");

    try {
      await erc1155mInstance.mint(
        owner.address,
        tokenId,
        hre.ethers.constants.HashZero
      );
    } catch (e) {
      const err = e as Error;
      console.log("WIP", err.message);
    }
  });

  IT("Should withdraw funds if owner", async () => {
    const [owner] = await hre.ethers.getSigners();
    const tokenId = hre.ethers.BigNumber.from("0");

    await erc1155mInstance.mint(
      owner.address,
      tokenId,
      hre.ethers.constants.HashZero,
      {
        value: hre.ethers.utils.parseEther("22"),
      }
    );

    // TODO: Requires switch users. hardhat connect() not available.

    // const ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    // const contractBalance = await hre.ethers.provider.getBalance(
    //   erc1155mInstance.address
    // );

    await erc1155mInstance.withdraw();

    // const ownerBalanceAfter = await hre.ethers.provider.getBalance();
    const contractBalanceAfter = await hre.ethers.provider.getBalance(
      erc1155mInstance.address
    );

    assert.strictEqual(
      contractBalanceAfter.toString(),
      BigNumber.from(0).toString()
    );
    // assert.strictEqual(
    //   ownerBalanceAfter,
    //   ownerBalance.add(contractBalance))
    // );
  });

  // IT("Should fail to withdraw funds if not proper role", async () => {
  //   await erc1155mInstance.withdraw();
  // });
}
