// classification
function classifyInputs(inputs) {
  model.classify(inputs, gotResults);
}

function gotResults(error, results) {
  let label = results[0].label;
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  console.log(results[0].label);
  drawDataCircle(label, mouseX, mouseY, "result");
}
