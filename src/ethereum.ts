import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const privateKey = process.env.PRIVATE_KEY || ''; // Wallet private key for signing transactions
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = process.env.CONTRACT_ADDRESS || '';
const abi = [
  "function getValue() view returns (uint256)",
  "function setValue(uint256 _value) public",
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

/**
 * Fetch the current value from the smart contract.
 */
export const getValue = async (): Promise<number> => {
  try {
    const value = await contract.getValue();
    return value.toNumber();
  } catch (error) {
    console.error("Error fetching value:", error);
    throw error;
  }
};

/**
 * Update the value in the smart contract.
 * @param {number} value - The new value to set.
 */
export const setValue = async (newValue: number): Promise<void> => {
  try {
    const tx = await contract.setValue(newValue);
    await tx.wait();
    console.log(`Transaction successful: ${tx.hash}`);
  } catch (error) {
    console.error("Error setting value:", error);
    throw error;
  }
};
