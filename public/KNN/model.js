// creates the model with inputs and lables
// ml5 defines outputs from inputs itself
function createModel() {
  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: "true",
  };

  // NN Object
  model = ml5.neuralNetwork(options);
}

//save dataset (from prjectfolder)
function saveData() {
  model.saveData("DataSet");
}

//load dataset
function loadData() {
  model.loadData("DataSet.json", drawLoadedData);
}
