var MyFavoriteNumber = artifacts.require("./MyFavoriteNumber.sol");

module.exports = function(deployer) {
  deployer.deploy(MyFavoriteNumber, { gas: 4712388 });
};
