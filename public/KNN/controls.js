function keyPressed() {
  if (key == "t") {
    startTraining();
  } else if (key == "s") {
    saveData();
  } else if (key == "l") {
    loadData();
  } else if (key == "p") {
    drawAreas();
  } else if (key == "a") {
    targetLabel = "white";
  } else if (key == "b") {
    targetLabel = "blue";
  } else if (key == "c") {
    targetLabel = "green";
  }
}

function mousePressed() {
  // set inputs mouse pos
  let inputs = {
    x: mouseX,
    y: mouseY,
  };
  // outputs
  if (state == "collection") {
    let target = {
      label: targetLabel,
    };
    // add trainingdata to model
    model.addData(inputs, target);
    drawDataCircle(targetLabel, mouseX, mouseY);
  } else {
    classifyInputs(inputs);
  }
}
