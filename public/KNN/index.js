// create own NN and train with useruinput
//  NN tries to learn where user inputs which caracter with mouse position

var state = 'collection';
let model; 
let targetLabel = 'white';



function setup() {
  createCanvas(800, 800);
  background(210);
  createModel();
}



