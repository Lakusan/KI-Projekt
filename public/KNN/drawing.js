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

    let targetColor;

    switch (target.label) {
      case "white":
        targetColor = color(255);
        targetColor.setAlpha(80);
        break;
      case "blue":
        targetColor = color(0, 0, 255);
        targetColor.setAlpha(80);
        break;
      case "green":
        targetColor = color(0, 255, 0);
        targetColor.setAlpha(80);
        break;
      default:
        console.log("exit");
        targetColor = "pink";
        break;
    }
    fill(targetColor);
    ellipse(inputs.x, inputs.y, 50);
  }
  startTraining();
}
