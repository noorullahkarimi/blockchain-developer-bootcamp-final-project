const escrowSystem = artifacts.require("escrowSystem");
let instances;

before(async () => {
  instances = await escrowSystem.new();
});

contract("escrowSystem tests", function (accounts) {
  //variables
  const [owner, employer, worker, judge] = accounts;
  const price = 1000;
  const deposit = 200;
  var addrEmployer = accounts[1];
  var addrWorker = accounts[2];
  var addrJuge = accounts[3];
  //functions
  it("should assert true", async function () {
    await escrowSystem.deployed();
    return assert.isTrue(true);
  });

  it("1.should have an owner ", async () => {
    var manager_dep = await instances.owner.call();
    var msd = accounts[0];
    assert.equal(manager_dep, msd, "this is not have an owner");
  })

  it("2.the function pay will set all data and return true  ", async () => {
    var resultPay = await instances.pay.call(addrJuge, deposit, { from: addrEmployer, value: price });
    assert.equal(resultPay, true, `${resultPay}true not returned and data not set`);
  })
  it("3.should send back the status", async () => {
    // await instances.pay.call(addrWorker, addrJuge, deposit,{from:addrEmployer,value:price});
    var resultPay = await instances.pay(addrJuge, deposit, { from: addrEmployer, value: price });
    const logResult = resultPay.logs[0].args.logstate;
    assert.equal(logResult, 0, `${logResult}--->>>the log is not send back the true status`);
  });

  it("4.should send back the amounts ", async () => {
    var resultPay = await instances.pay(addrJuge, deposit, { from: addrEmployer, value: price });
    const logResult = resultPay.logs[1].args.logAmounts;
    assert.equal(logResult, 1000, `${logResult}+++>>>the log is not send back the true amounts`);
  });

  it("5.should send back true from deposite function", async () => {
    //for the change the status
    await instances.pay.call(addrJuge, deposit, { from: addrEmployer, value: price });
    var resultDeposite = await instances.Deposit.call(0, { form: addrWorker, value: 200 });
    assert.equal(resultDeposite, true, `${resultDeposite} data from this function is not true `);
  });

  it("6.should log return true status", async () => {
    await instances.pay.call(addrJuge, deposit, { from: addrEmployer, value: price });
    var resultDepositeLogStatus = await instances.Deposit(0, { form: addrWorker, value: 200 });
    var resultDepositeLogStatusToRead = resultDepositeLogStatus.logs[0].args.logstate;
    assert.equal(resultDepositeLogStatusToRead, 1, `${resultDepositeLogStatusToRead}the status is not true value`);
  });

  it("7.should return true when send true to confirm function ", async () => {
    var resultConfirmTrue = await instances.confirm.call(0, true, { from: addrEmployer });
    assert.equal(resultConfirmTrue, true, `${resultConfirmTrue}--->true not returned from confirm`);
  });

  it("8.should return false when false send to confirm function ", async () => {
    var resultConfirmFalse = await instances.confirm.call(0, false, { from: addrEmployer });
    assert.equal(resultConfirmFalse, false, `${resultConfirmFalse}--->false not returned from confirm`)
  });

  it("9.should log return true status", async () => {
    var resultConfirmTrueState = await instances.confirm(0, true, { from: addrEmployer });
    var resultConfirmTrueStateToLog = resultConfirmTrueState.logs[0].args.logstate;
    assert.equal(resultConfirmTrueStateToLog, 3, `${resultConfirmTrueStateToLog}--->true not returned from confirm`);
  });

  it("10.should log return false status", async () => {
    await instances.pay.call(addrJuge, deposit, { from: addrEmployer, value: price });
    await instances.Deposit(1, { form: addrWorker, value: 200 });
    var resultConfirmFalseState = await instances.confirm(1, false, { from: addrEmployer });
    var resultConfirmFalseStateToLog = resultConfirmFalseState.logs[0].args.logstate;
    assert.equal(resultConfirmFalseStateToLog, 2, `${resultConfirmFalseStateToLog}--->false not returned from confirm`);
  });
  
  it("11.should return true when send true with worker address", async () => {
    var resultJudgment = await instances.judgment.call(false, 1, { from: addrJuge });
    assert.equal(resultJudgment, false, `${resultJudgment}**true not returned`);
  });

  it("12.should return true when send true with worker address", async () => {
    var resultJudgment = await instances.judgment.call(true, 1, { from: addrJuge });
    assert.equal(resultJudgment, true, `${resultJudgment}**true not returned`);
  });
  
  it("13.should return status true when send true with judge address", async () => {
    // await instances.pay.call(addrJuge, deposit, { from: addrEmployer, value: price });
    // await instances.Deposit.call(0, { form: addrWorker, value: 200 });
    // //false because we want to have inwait status
    // await instances.confirm.call(0, false, { from: addrEmployer });
    var resultJudgmentStateFalse = await instances.judgment(false, 0, { from: addrJuge });
    var resultJudgmentToReadFalse = resultJudgmentStateFalse.logs[0].args.logstate;
    assert.equal(resultJudgmentToReadFalse, 4, `${resultJudgmentToReadFalse}**true not returned`);
  });

  it("14.should return status true when send true with judge address", async () => {
    // await instances.pay.call(addrJuge, deposit, { from: addrEmployer, value: price });
    // await instances.Deposit.call(0, { form: addrWorker, value: 200 });
    // //false because we want to have inwait status
    // await instances.confirm.call(0, false, { from: addrEmployer });
    var resultJudgmentState = await instances.judgment(true, 0, { from: addrJuge });
    var resultJudgmentToRead = resultJudgmentState.logs[0].args.logstate;
    assert.equal(resultJudgmentToRead, 3, `${resultJudgmentToRead}**true not returned`);
  });


  // it("15.should get the true answer form withdrawworker ", async () => {
  //   await instances.pay(addrJuge, deposit, { from: addrEmployer, value: price });
  //    instances.Deposit(0, { form: addrWorker, value: 200 });
  //    instances.confirm(0, false, { from: addrEmployer });
  //    instances.judgment(true, 0, { from: addrJuge });
  //   var resultWithdrawWorker = await instances.withdrawWorker.call(1,{from:addrWorker});
  //   assert.equal(resultWithdrawWorker, true, `${resultWithdrawWorker}---true not come from function`);
  // });  

  // it("16.should get the true answer form withdrawEmployer ", async () => {
    // await instances.pay.call(addrJuge, deposit, { from: addrEmployer, value: price });
    // var resultWithdrawWorker=await instances.Deposit.call(0, { form: addrWorker, value: 200 });
    // var resultWithdrawWorker=await instances.confirm.call(0, false, { from: addrEmployer });
    // var resultWithdrawWorker=await instances.judgment.call(true, 0, { from: addrJuge });
  //   var resultWithdrawEmployer = await instances.withdrawEmployer.call(0,{from:addrEmployer});
  //   assert.equal(resultWithdrawEmployer, true, `${resultWithdrawEmployer}---true not come from function`);
  // });  

  describe("this is test for the enum Status", () => {
    let enumState;
    before(() => {
      enumState = escrowSystem.enums.status;
      assert(
        enumState,
        "The contract should define an Enum called State"
      );
    });

    it("16.should have the noStarted ", () => {
      assert(
        enumState.hasOwnProperty('notStarted'),
        "The enum does not have a notStarted value"
      );
    });

    it("17.should have the started ", () => {
      assert(
        enumState.hasOwnProperty('started'),
        "The enum does not have a started value"
      );
    });

    it("18.should have the inWait ", () => {
      assert(
        enumState.hasOwnProperty('inWait'),
        "The enum does not have a inWait value"
      );
    });

    it("19.should have the done ", () => {
      assert(
        enumState.hasOwnProperty('done'),
        "The enum does not have a done value"
      );
    });

    it("20.should have the failed ", () => {
      assert(
        enumState.hasOwnProperty('failed'),
        "The enum does not have a failed value"
      );
    });
  })
  // describe("detail struct ",()=>{
  //   let structElement;
  //   before(()=>{
  //     structElement =detailsStruct(escrowSystem);
  //     assert(structElement!==null,
  //       "the contract should have an struct with name details"
  //       );
  //   });
  //   it("should have a employer", () => {
  //     assert(
  //       isDefined(structElement)("employer"), 
  //       "16.Struct Item should have a employer member"
  //     );
  //     assert(
  //       isType(subjectStruct)("employer")("address"), 
  //       "employer should be of type address"
  //     );
  //   });



  // });



});

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
*/