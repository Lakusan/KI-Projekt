function startTraining(ep, lr) {
  state = "training";

  console.log("Training started. ");

  //normalization
  model.normalizeData();

  //options for trainig
  let trainingOptions = {
    epochs: 300, //default 200
    learningRate: 0.01, //default :0.01
    //batchSize: 100 //Size of data chunk
  };
  // CallBacks
  // while Training - Every Epoch
  // finishedTraining once at the end of training (callback)
  model.train(trainingOptions, whileTraining, finishedTraining);
}

function whileTraining(epoch, loss) {
  // console.log(epoch);
  // console.log(loss);
}

function finishedTraining() {
  console.log("Training finished.");
  state = "prediction";
}
