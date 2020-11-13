// Classifier Variable
let classifier;
// Model URL von https://teachablemachine.withgoogle.com/
let imageModelURL = "https://teachablemachine.withgoogle.com/models/BSLsOw48Q/";

// Video
let video;
let flippedVideo;
//labels
let label = "";
//assets fade out
let question;
let questionFade = 0;
let yes;
let yesFade = 0;
let no;
let noFade = 0;
let afk;
let afkFade = 0;

function preload() {
  //model
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  //assets
  question = loadImage("assets/question.png");
  yes = loadImage("assets/yes.png");
  no = loadImage("assets/no.png");
  afk = loadImage("assets/afk.png");
}

function setup() {
  //canvas -> drawing
  let canvas = createCanvas(1800, 1000);
  canvas.position(0, 0);

  // video
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.position(0, 0);
  flippedVideo = ml5.flipImage(video);

  //start with first frame after loading time
  loading();
}

//  loading stuff
async function loading() {
  await sleep(2000);
  console.log("Loading done...");
  classifyVideo();
}

// sleep function as promise
function sleep(ms) {
  console.log("Loading...");
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function draw() {
  background(35, 38, 36);

  if (label == "question") {
    questionFade = 255;
  } else if (label == "yes") {
    yesFade = 255;
  } else if (label == "no") {
    noFade = 255;
  } else if (label == "afk") {
    afkFade = 255;
  }

  if (questionFade > 0) {
    tint(255, questionFade);
    image(question, 800, 0);
    questionFade -= 10;
  }

  if (yesFade > 0) {
    tint(255, yesFade);
    image(yes, 800, 0);
    yesFade -= 10;
  }

  if (noFade > 0) {
    tint(255, noFade);
    image(no, 800, 0);
    noFade -= 10;
  }

  if (afkFade > 0) {
    tint(255, afkFade);
    image(afk, 800, 0, 800, 600);
    afkFade -= 10;
  }

  let s =
    "Im Sourcecode den Link von Google Teachable Machine einfügen um neu zu spezialisieren.";
  fill(255);
  text(s, 10, 620, 500, 80);
}

// Get a prediction for the current video frame
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
  console.log(results[0].label);
  // next frame
  classifyVideo();
}
