let video;
//classifier
const knnClassifier = ml5.KNNClassifier();
let featureExtractor;

async function setup() {
  // featureExtractor - get features from MobileNet
  featureExtractor = ml5.featureExtractor("MobileNet", modelReady);

  video = document.getElementById("video");

  // webcam
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  video.srcObject = stream;
  video.play();
  // Create UI
  createButtons();
}

setup();

function modelReady() {
  //console.log(featureExtractor)
  document.querySelector("#status").textContent =
    "FeatureExtractor und mobileNet model bereit";
}

// current frame from video to classifier
function addExample(label) {
  // Get features from video
  const features = featureExtractor.infer(video);
  // Add an example with a label to the classifier
  knnClassifier.addExample(features, label);
  updateCounts();
}

// Predict the current frame.
function classify() {
  // Get the total number of labels from knnClassifier
  const numLabels = knnClassifier.getNumLabels();
  if (numLabels <= 0) {
    console.error("Keine Daten");
    return;
  }
  // Get the features of the input video
  const features = featureExtractor.infer(video);

  // classify which label these features belongs to
  // optionak pass K value (default 3) knnClassifier.classify(features, 3, gotResults);
  knnClassifier.classify(features, gotResults);
}

//create UI
function createButtons() {
  buttonA = document.querySelector("#addClassOne");
  buttonA.addEventListener("click", function () {
    addExample("One");
  });

  buttonB = document.querySelector("#addClassTwo");
  buttonB.addEventListener("click", function () {
    addExample("Two");
  });

  buttonC = document.querySelector("#addClassThree");
  buttonC.addEventListener("click", function () {
    addExample("Three");
  });

  // Reset buttons
  resetBtnA = document.querySelector("#resetOne");
  resetBtnA.addEventListener("click", function () {
    clearLabel("One");
  });

  resetBtnB = document.querySelector("#resetTwo");
  resetBtnB.addEventListener("click", function () {
    clearLabel("Two");
  });

  resetBtnC = document.querySelector("#resetThree");
  resetBtnC.addEventListener("click", function () {
    clearLabel("Three");
  });

  // Predict button
  buttonPredict = document.querySelector("#buttonPredict");
  buttonPredict.addEventListener("click", classify);

  // Clear all classes button
  buttonClearAll = document.querySelector("#clearAll");
  buttonClearAll.addEventListener("click", clearAllLabels);

  // Load saved classifier dataset
  buttonSetData = document.querySelector("#load");
  buttonSetData.addEventListener("click", loadMyKNN);

  // Get classifier dataset
  buttonGetData = document.querySelector("#save");
  buttonGetData.addEventListener("click", saveMyKNN);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }

  if (result.confidencesByLabel) {
    const confidences = result.confidencesByLabel;
    // result.label is the label that has the highest confidence
    if (result.label) {
      document.querySelector("#result").textContent = result.label;
      document.querySelector("#confidence").textContent = `${
        confidences[result.label] * 100
      } %`;
    }

    document.querySelector("#confidenceOne").textContent = `${
      confidences.One ? confidences.One * 100 : 0
    } %`;
    document.querySelector("#confidenceTwo").textContent = `${
      confidences.Two ? confidences.Two * 100 : 0
    } %`;
    document.querySelector("#confidenceThree").textContent = `${
      confidences.Three ? confidences.Three * 100 : 0
    } %`;
  }

  classify();
}

// Update the example count for each label
function updateCounts() {
  const counts = knnClassifier.getCountByLabel();

  document.querySelector("#exampleOne").textContent = counts.One || 0;
  document.querySelector("#exampleTwo").textContent = counts.Two || 0;
  document.querySelector("#exampleThree").textContent = counts.Three || 0;
}

// Clear the examples in one label
function clearLabel(label) {
  knnClassifier.clearLabel(label);
  updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  knnClassifier.clearAllLabels();
  updateCounts();
}

// Save dataset
function saveModel() {
  knnClassifier.save("Dataset");
}

// Load dataset
function loadModel() {
  knnClassifier.load("./Dataset.json", updateCounts);
}
