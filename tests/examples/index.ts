import { BigNumber } from "ethers";
import { Interface } from "ethers/lib/utils";
import { expectBNEqual, CONTRACT, IT, CONSOLE } from "~/utils";
import { redeployContract } from "~/artifacts";

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
      "ERC1155MMock",
      {
        args: [""],
      }
    );
  });

  IT("Should be able to mint", async () => {
    expectBNEqual(BigNumber.from("123"), BigNumber.from("123"));
    // let details = await erc1155mInstance.mint();
  });
}
