// the solid variable 
const ssABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "logAmounts",
        "type": "uint256"
      }
    ],
    "name": "amountLog",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum escrowSystem.status",
        "name": "logstate",
        "type": "uint8"
      }
    ],
    "name": "logState",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "contractsDetails",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "employer",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "worker",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "judge",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deposit",
        "type": "uint256"
      },
      {
        "internalType": "enum escrowSystem.status",
        "name": "state",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "judgeaddr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deposits",
        "type": "uint256"
      }
    ],
    "name": "pay",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "idContract",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "idContract",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "verify",
        "type": "bool"
      }
    ],
    "name": "confirm",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "bool",
        "name": "verify",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "idContract",
        "type": "uint256"
      }
    ],
    "name": "judgment",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "idContract",
        "type": "uint256"
      }
    ],
    "name": "withdrawWorker",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "idContract",
        "type": "uint256"
      }
    ],
    "name": "withdrawEmployer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
];
const ssAddress = '0x51789737bc70c10C577a633874e9968E7925c67c';
// var web3 = new Web3(window.ethereum);
// // instantiate smart contract instance
// const escrowSystem_obj = new web3.eth.Contract(ssABI, ssAddress);
// escrowSystem_obj.setProvider(window.ethereum);
//buttons
const button_pay = document.getElementById('pay-button');
const button_deposit = document.getElementById('deposit-button');
const button_confirm = document.getElementById('confirm-button');
const button_judge = document.getElementById('judge-button');
const button_withdrawWorker = document.getElementById('withdrawWorker-button');
const button_withdrawEmployer = document.getElementById('withdrawEmployer-button');
const button_connect_to_wallet = document.getElementById('connect');
const gasLimitDefault = 30000;

// events with fucntion
//1.pay function
eventListener();
function eventListener() {
  button_pay.addEventListener('click', payAction);
  button_deposit.addEventListener('click', depositAction);
  button_confirm.addEventListener('click', confirmAction);
  button_judge.addEventListener('click', judgeAction);
  button_withdrawWorker.addEventListener('click', withDrawWorkerAction);
  button_withdrawEmployer.addEventListener('click', withDrawEmployerAction);
  button_connect_to_wallet.addEventListener('click', getAddress);
}


// functions
//this function connect you to address wallet
function getAddress() {
  console.log('this work with get address')
  const addres = ethereum.selectedAddress;
  if (addres == null || addres == "") {
    showAlert('please open your metamask');
  } else {
    document.getElementById('address_bar').value = addres;
  }
}
//this fucntion for pay part
async function payAction() {
  const input_pay_addr = document.getElementById('pay-addr').value;
  const input_pay_deposit = document.getElementById('pay-deposit').value;
  console.log(input_pay_addr);
  console.log(input_pay_deposit);
  var web3 = new Web3(window.ethereum);
  // instantiate smart contract instance
  const escrowSystem_obj = new web3.eth.Contract(ssABI, ssAddress);
  // escrowSystem_obj.setProvider(window.ethereum);
  // var walet =ethereum.request({ method: 'eth_requestAccounts'}).then(result=>{result});
  // var x = await escrowSystem_obj.methods.pay('0x8b71C0749ED77D9459827598EFEEf1032B2BAbcE', 100,).send({ from: '0xBe02B7d67a79c36E83Dba9b53B06eD70672251D6', value: input_pay_deposit ,gas: gasLimitDefault});
  var x = await escrowSystem_obj.methods.pay(input_pay_addr, 100,).send({ from: ethereum.selectedAddress, value: input_pay_deposit, gas: gasLimitDefault });
  console.log("input_pay_deposit");
  console.log(x);
  console.log("input_pay_deposit");
  if (x.status == true) {
    console.log(x.status);
    showAlert('your contract created!');
  } else {
    alert('sorry this action not work!')
  }
}

//function for the confirm f
async function depositAction() {
  const input_deposit_number_contract = document.getElementById('deposit-number-contract').value;
  const deposit_money_contract = document.getElementById('deposit-money-contract').value;
  console.log(input_deposit_number_contract);
  console.log(deposit_money_contract);
  var web3 = new Web3(window.ethereum);
  // instantiate smart contract instance
  const escrowSystem_obj = new web3.eth.Contract(ssABI, ssAddress);
  escrowSystem_obj.setProvider(window.ethereum);
  var x = await escrowSystem_obj.methods.Deposit(input_deposit_number_contract).send({ from: ethereum.selectedAddress, value: deposit_money_contract, gas: gasLimitDefault });
  if (x.status == true) {
    showAlert('contract start!');
  } else {
    alert('this action is not work!');
  }
}
//function confirm 
async function confirmAction() {
  const input_confirm_number_contract = document.getElementById('confirm-number-contract').value;
  const input_confirm_verify = document.getElementById('confirm-verify').value;
  console.log(input_confirm_number_contract);
  console.log(input_confirm_verify);
  var web3 = new Web3(window.ethereum);
  // instantiate smart contract instance
  const escrowSystem_obj = new web3.eth.Contract(ssABI, ssAddress);
  escrowSystem_obj.setProvider(window.ethereum);
  var x = await escrowSystem_obj.methods.confirm(input_confirm_number_contract, input_confirm_verify).send({ from: ethereum.selectedAddress, gas: gasLimitDefault });
  if (x.status == true) {
    showAlert('contract finished successfully!');
  } else if (x.status == false) {
    showAlert('contract failed by employer successfully!');
  } else {
    alert('confirm action is not work ');
  }
}
//function judgement
async function judgeAction() {
  const input_judge_number_contract = document.getElementById('judge-number-contract').value;
  const input_judge_verify = document.getElementById('judge-verify').value;
  console.log(input_judge_number_contract);
  console.log(input_judge_verify);
  var web3 = new Web3(window.ethereum);
  // instantiate smart contract instance
  const escrowSystem_obj = new web3.eth.Contract(ssABI, ssAddress);
  escrowSystem_obj.setProvider(window.ethereum);
  var x = await escrowSystem_obj.methods.judgment(input_judge_verify, input_judge_number_contract).send({ from: ethereum.selectedAddress, gas: gasLimitDefault });
  if (x.status == true) {
    showAlert('contract finished successfully!');
  } else if (x.status == false) {
    showAlert('contract failed by judgement successfully!');
  } else {
    alert('confirm action is not work ');
  }
}
//function for the withdrawworker
async function withDrawWorkerAction() {
  const input_withdrawWorker_number_contract = document.getElementById('withdrawWorker-number-contract').value;
  console.log(input_withdrawWorker_number_contract);
  var web3 = new Web3(window.ethereum);
  // instantiate smart contract instance
  const escrowSystem_obj = new web3.eth.Contract(ssABI, ssAddress);
  escrowSystem_obj.setProvider(window.ethereum);
  var x = await escrowSystem_obj.methods.withdrawWorker(input_withdrawWorker_number_contract).send({ from: ethereum.selectedAddress, gas: gasLimitDefault });
  if (x.status == true) {
    showAlert('the transaction done!');
  } else {
    alert('this action is not work ');
  }
}
async function withDrawEmployerAction() {
  const input_withdrawEmployer_number_contract = document.getElementById('withdrawEmployer-number-contract').value;
  console.log(input_withdrawEmployer_number_contract);
  var web3 = new Web3(window.ethereum);
  // instantiate smart contract instance
  const escrowSystem_obj = new web3.eth.Contract(ssABI, ssAddress);
  escrowSystem_obj.setProvider(window.ethereum);
  var x = await escrowSystem_obj.methods.withdrawEmployer(input_withdrawEmployer_number_contract).send({ from: ethereum.selectedAddress, gas: gasLimitDefault });
  if (x.status == true) {
    showAlert('the transaction done!');
  } else {
    alert('this action is not work');
  }
}
//fucntion for the show message 
function showAlert(textAlert) {
  let alertBox = document.querySelector('.alert');
  console.log(alertBox);
  alertBox.style.display = "block";
  alertBox.textContent = textAlert;
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 4000);
}