//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Token {
    string public name = "Practical Learning Token";
    string public symbol = "PLE";
    uint public totalSupply = 1000;
    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balancesOf(address account) external view returns (uint) {
        return balances[account];
    }
}




