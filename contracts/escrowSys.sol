pragma solidity 0.5.17;
//this contract is an escrow system 
//means that you and another person make a contract for work or another things
contract escrowSystem {

//start the variable 
 
  mapping (uint256=>details) public contractsDetails;

  enum status {
   notStarted,
   started,
   inWait,
   done,
   failed
   }

   function () external payable {
        revert();
    }

  struct details {
    address payable employer;
    address payable worker;
    address judge;
    uint256 price;
    uint256 deposit;
    status state;
  }
  uint256 numberContract;
  address public owner;

  constructor()public{
    //initialize the address of worker , employer , third person who make judge ,time of project ,first status
   owner=msg.sender;
  }
  //this function will pay the money to contract 
  event logState(status logstate);
  event amountLog(uint256 logAmounts);

  function pay(
    address judgeaddr,
    uint256 deposits)public payable returns(bool){
    contractsDetails[numberContract] = details({
            employer:msg.sender,
            worker:address(0),
            judge:judgeaddr,
            price: msg.value,
            deposit:deposits,
            state:status.notStarted
        });
    emit logState(contractsDetails[numberContract].state);
    emit amountLog(contractsDetails[numberContract].price);

    numberContract++;

    return true;
  }
  //it is for start project 
  function Deposit(uint256 idContract)public payable returns(bool){
    //1. should worker call this function 
    //2. should send money if worker loss the work pay for damage contract
    //3. should money given by employer 
    // require(msg.sender==contractsDetails[idContract].worker);
    require(msg.value==contractsDetails[idContract].deposit);
    require(contractsDetails[idContract].state==status.notStarted);
        //status change
    contractsDetails[idContract].worker=msg.sender;    
    contractsDetails[idContract].state=status.started;
    emit logState(contractsDetails[idContract].state);
    return true;
  }
  //confirm the contract if it is ok or not 
  function confirm(uint256 idContract,bool verify)public returns(bool){
    //1. should employer can call it 
    //2. should status be started 
    require(contractsDetails[idContract].employer==msg.sender);
    require(contractsDetails[idContract].state==status.started);
    //if work is ok 
    if(verify==true){
      contractsDetails[idContract].state=status.done;
      emit logState(contractsDetails[idContract].state);
      return true;
    }else{
      contractsDetails[idContract].state=status.inWait;
      emit logState(contractsDetails[idContract].state);
        return false;
    }//else
  }
  //if not confirm it will use
  function judgment(bool verify,uint256 idContract)public returns(bool){
    //1. should status be suspended 
    //2. just third person can call this fucntion
    require(msg.sender==contractsDetails[idContract].judge);
    // require(contractsDetails[idContract].state==status.inWait);
    //if third person say work done
    if(verify==true){
      contractsDetails[idContract].state=status.done;
      emit logState(contractsDetails[idContract].state);
      return true;
    }else{
      contractsDetails[idContract].state=status.failed;
      emit logState(contractsDetails[idContract].state);
      return false;
    }
  }
  //get the money with employer
  function withdrawWorker(uint256 idContract)public returns(bool){
    //1. should just worker call it 
    //2. should status be ended
    require(msg.sender==contractsDetails[idContract].worker);
    require(contractsDetails[idContract].state==status.done);
    emit logState(contractsDetails[idContract].state);
    //transfer the money to worker (money for work and his money for guaranty)
    contractsDetails[idContract].worker.transfer(contractsDetails[idContract].deposit);
    contractsDetails[idContract].worker.transfer(contractsDetails[idContract].price);
    return true;
  }
  //get the money with employer
  function withdrawEmployer(uint256 idContract)public payable returns(bool){
    //1. just employer can call it 
    //2. status should be failed 
    require(msg.sender==contractsDetails[idContract].employer);
    require(contractsDetails[idContract].state==status.failed);
    //transfer the money to employer (money for worker and money for damage worker to contract)
    contractsDetails[idContract].employer.transfer(contractsDetails[idContract].price);
    contractsDetails[idContract].employer.transfer(contractsDetails[idContract].deposit);
    return true;
  }

}
