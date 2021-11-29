pragma solidity 0.5.17;
/// @title Contract for between two people as escrow
/// @author noorullah karimi
/// @notice Allows to users make contract with third party for judgement about result
contract escrowSystem {

//start the variable 
 ///@notice list of contracts with details
 ///@dev mapping save data of contract and can call with id contract
  mapping (uint256=>details) public contractsDetails;

  ///@notice enum for the status 
  ///@dev is is define the state of every contract in every function
  enum status {
   notStarted,
   started,
   inWait,
   done,
   failed
   }
  ///@notice Fallback function - Called if other functions don't match call or
    ///@dev sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
   function () external payable {
        revert();
    }

  ///@notice the struct variable for details 
  ///@dev contains employer/worker/judgement/price/deposit(for lose or destry)
  struct details {
    address payable employer;
    address payable worker;
    address judge;
    uint256 price;
    uint256 deposit;
    status state;
  }
  ///@notice for how many contract created 
  uint256 numberContract;

  ///@notice for the who deployed this contract
  address public owner;

  ///@notice initial the owner 
  constructor()public{
    //initialize the owner
   owner=msg.sender;
  }


  ///@notice events 
  ///@dev this event get some data and log on 
  ///@param what level is the contract 
  event logState(status logstate);
  ///@param amoutes of money 
  event amountLog(uint256 logAmounts);

///@notice function response of the create contract
///@dev this fucntion get some param and make the contract with this param 
///@param address's wallet of judgement as first param
///@param dpo money for when lose project or destroy contract/work ,it's getting with employer 
///@return the true will returned to user to find out the function is work 
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
  ///@notice the function for worker
  ///@dev should worker call this function 
  ///@dev should send money if worker loss the work pay for damage contract
  ///@dev should money given by employer
  ///@return the true will sended to user if every thing done
  function Deposit(uint256 idContract)public payable returns(bool){
 
    require(msg.value==contractsDetails[idContract].deposit);
    require(contractsDetails[idContract].state==status.notStarted);
  
    contractsDetails[idContract].worker=msg.sender;    
    contractsDetails[idContract].state=status.started;

    emit logState(contractsDetails[idContract].state);
    return true;
  }

  ///@notice this employer will choose the work is done or not 
  ///@dev should employer can call it 
  ///@dev should status be started 
  ///@return return true if function work fine
  function confirm(uint256 idContract,bool verify)public returns(bool){

    require(contractsDetails[idContract].employer==msg.sender);
    require(contractsDetails[idContract].state==status.started);
    
    if(verify==true){
      contractsDetails[idContract].state=status.done;
      emit logState(contractsDetails[idContract].state);
      return true;
    }else{
      contractsDetails[idContract].state=status.inWait;
      emit logState(contractsDetails[idContract].state);
        return true;
    }
  }
  
  ///@notice this judgement will choose the work is done or not after reject employer
  ///@dev should judgement can call it 
  ///@dev should status be inwait 
  ///@return return true if function work fine
  function judgment(bool verify,uint256 idContract)public returns(bool){

    require(msg.sender==contractsDetails[idContract].judge);
    require(contractsDetails[idContract].state==status.inWait);

    if(verify==true){
      contractsDetails[idContract].state=status.done;
      emit logState(contractsDetails[idContract].state);
      return true;
    }else{
      contractsDetails[idContract].state=status.failed;
      emit logState(contractsDetails[idContract].state);
      return true;
    }
  }

  ///@notice this transfer money to worker 
  ///@dev should worker can call it 
  ///@dev should status be done
  ///@return return true if function work fine
  function withdrawWorker(uint256 idContract)public returns(bool){
    
    require(msg.sender==contractsDetails[idContract].worker);
    require(contractsDetails[idContract].state==status.done);

    emit logState(contractsDetails[idContract].state);

    contractsDetails[idContract].worker.transfer(contractsDetails[idContract].deposit);
    contractsDetails[idContract].worker.transfer(contractsDetails[idContract].price);
    return true;
  }
  
  ///@notice this transfer money to employer 
  ///@dev require employer can call it 
  ///@dev require status be done
  ///@return return true if function work fine
  function withdrawEmployer(uint256 idContract)public payable returns(bool){

    require(msg.sender==contractsDetails[idContract].employer);
    require(contractsDetails[idContract].state==status.failed);

    contractsDetails[idContract].employer.transfer(contractsDetails[idContract].price);
    contractsDetails[idContract].employer.transfer(contractsDetails[idContract].deposit);
    return true;
  }

}
