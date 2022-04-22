// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const erc20Abi = require("../abis/erc20.json");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // START PHIL'S CODE

  // Init some ERC-20 Contracts (will create connected versions later)
  // Might be helpful to do the same thing w/the UMA contracts
  const daiContract = new hre.ethers.Contract(
    "0x6b175474e89094c44da98b954eedeac495271d0f",
    erc20Abi
  );
  const usdcContract = new hre.ethers.Contract(
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    erc20Abi
  );


  // This is Wintermute 1, they're a massive MM that we'll be impersonating
  const whaleAddress = "0x431e81E5dfB5A24541b5Ff8762bDEF3f32F96354";
  const impersonateRes = await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [whaleAddress],
  });
  console.log(impersonateRes);

  // Get the impersonated signer
  const whaleSigner = await hre.ethers.getSigner(whaleAddress);

  // Get the connected versions of the Ether's Contract objects
  // const whaleDai = await daiContract.connect(whaleSigner);
  // const whaleUsdc = await usdcContract.connect(whaleSigner);
  //
  // // The Balance we're gonna steal
  // const whaleUSDCBalance = await whaleUsdc.balanceOf(whaleAddress);
  // console.log("whale USDC balance is", whaleUSDCBalance.toString());
  //
  // const whaleDAIBalance = await whaleDai.balanceOf(whaleAddress);
  // console.log("whale DAI balance is", whaleDAIBalance.toString());

  const whaleFtmBalance = await whaleSigner.getBalance();
  console.log("whale FTM balance is", whaleEthBalance.toString());

  // The Recipient
  const recipient = "0xEA5A52f732BE2eCD218224f896431660FBa8512D"; // this is philipliao.eth :P

  // using the whaleUsdc Contract object because I'm lazy, but I just need a way to do a read only call. sorry for the confusion
  const balanceBeforeUSDC = await whaleUsdc.balanceOf(recipient);
  console.log("recipient USDC balance is", balanceBeforeUSDC.toString());

  const balanceBeforeDAI = await whaleDai.balanceOf(recipient);
  console.log("recipient DAI balance is", balanceBeforeDAI.toString());

  await whaleUsdc.transfer(recipient, whaleUSDCBalance.toString());

  await whaleDai.transfer(recipient, whaleDAIBalance.toString());

  await whaleSigner.sendTransaction({to: recipient.toString(), value: hre.ethers.utils.parseEther("6000")});

  const balanceAfterUSDC = await whaleUsdc.balanceOf(recipient);
  console.log("recipient USDC balance is", balanceAfterUSDC.toString());

  const balanceAfterDAI = await whaleDai.balanceOf(recipient);
  console.log("recipient DAI balance is", balanceAfterDAI.toString());

  const balanceAfterEth = await whaleSigner.getBalance();
  console.log("recipient ETH balance is", balanceAfterEth.toString());
  console.log(
    "Congrats! You have successfully transferred tokens to yourself!"
  );


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
