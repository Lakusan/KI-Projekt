function drawDataCircle(data, mouseX, mouseY, type) {
  let dataColor;
  if (type == "result") {
    fill(data);
    ellipse(mouseX, mouseY, 50);
  } else {
    switch (data) {
      case "white":
        dataColor = color(255);
        dataColor.setAlpha(80);
        break;
      case "blue":
        dataColor = color(0, 0, 255);
        dataColor.setAlpha(80);
        break;
      case "green":
        dataColor = color(0, 255, 0);
        dataColor.setAlpha(80);
        break;
      default:
        console.log("exit");
        dataColor = data;
        break;
    }
    fill(dataColor);
    tint(255, 127);
    ellipse(mouseX, mouseY, 50);
  }
}

function drawLoadedData() {
  let data = model.data.data.raw;

  for (let i = 0; i < data.length; i++) {
    var inputs = data[i].xs;
    var target = data[i].ys;

    stroke(0);

    noFill();
    ellipse(inputs.x, inputs.y, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(target.label, inputs.x, inputs.y);
  }
  startTraining();
}

