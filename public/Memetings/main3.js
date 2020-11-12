// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/6uHrRCLlL/';

// Video
let video;
let flippedVideo;
//labels
let label = '';
//assets fade out
let question;
let questionFade = 0;
let yes;
let yesFade = 0;
let no;
let noFade = 0;

// var c = document.getElementById("canvas");
// var ctx = c.getContext("2d");
// var img = document.getElementById("image");
function preload() {
  //model 
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  //assets
  question = loadImage('assets/question.png');
  yes = loadImage('assets/yes.png');
  no = loadImage('assets/no.png');
}

function setup() {
  //canvas -> drawing
  let canvas = createCanvas(800, 600);
  canvas.position(0,0);
  // video
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.position(0,0);
  video.hide();

  // graphics = createGraphics(800,600);
  // graphics.background(0,255,0);
  


  flippedVideo = ml5.flipImage(video);
  
  //start with first frame after loading time
  loading();
}

//  loading stuff
async function loading(){
  await sleep(2000);
  console.log('Loading done...')
  classifyVideo();
}

// sleep function as promise
function sleep(ms) {
  console.log("Loading...")
  return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
  //background(0,255,0);
  
  // image(graphics,0,0);
  
  if (label == 'question') {
    questionFade = 255;
  //ctx.drawImage(img,10,10);
  } else if (label == 'yes') {
    yesFade = 255;
  } else if (label == 'no') {
    noFade = 255;
  } else if(label == 'idle'){

  }



  if (questionFade > 0) {
    tint(255, questionFade);
    image(question, 0, 0);
    questionFade -= 5;
  }

  if (yesFade > 0) {
    tint(255, yesFade);
    image(yes, 0, 0);
    yesFade -= 5;
  }
  
  if (noFade > 0) {
    tint(255, noFade);
    image(no, 0, 0);
    noFade -= 5;
  }
  // image(video,0,0);
}

// Get a prediction for the current video frame
// WHY FLIPPED VIDEO?
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  console.log(results[0].label)
  // next frame   
  classifyVideo();
}