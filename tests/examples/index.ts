import { Interface } from "ethers/lib/utils";
import { expectEvent, CONTRACT, IT, CONSOLE } from "~/utils";
import { redeployContract } from "~/artifacts";
const hre = require("hardhat");

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

  before(async () => {
    CONSOLE.log(new Interface(ERC1155MMintABI).getSighash("mint"));
    erc1155mInstance = await redeployContract<ERC1155MMintArtifact>(
      "ERC1155MMint",
      {
        args: [""],
      }
    );
  });

  IT("Should be able to mint", async () => {
    const [owner] = await hre.ethers.getSigners();
    const tokenId = hre.ethers.BigNumber.from("0");

    let receipt = await erc1155mInstance.mint(
      owner.address,
      tokenId,
      hre.ethers.BigNumber.from("1"),
      hre.ethers.constants.HashZero
    );

    expectEvent(receipt, "TransferSingle");
  });

  //   IT("Should requirement payment of 0.01 ETH", async () => {
  //     const [owner] = await hre.ethers.getSigners();
  //     const tokenId = hre.ethers.BigNumber.from("0");

  //     let receipt = await erc1155mInstance.mint(
  //       owner.address,
  //       tokenId,
  //       hre.ethers.BigNumber.from("1"),
  //       hre.ethers.constants.HashZero,
  //       {
  //         value: hre.ethers.utils.parseEther("9.0"),
  //       }
  //     );

  //     expectEvent(receipt, "TransferSingle");
  //   });
}
