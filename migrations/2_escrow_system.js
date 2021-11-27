var escrowSystem = artifacts.require("escrowSystem");

module.exports = function(deployer) {
  deployer.deploy(escrowSystem);
};