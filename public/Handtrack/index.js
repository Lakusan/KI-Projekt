// hand gesture estimation for everyone with tensorflow.js and handpose model
// wit custom gestures und cavas for displaying text

// webcam configuration
// 640x480 @ 30fps - performance
const config = {
  video: { width: 640, height: 480, fps: 30 },
};

// Colors for landmark marker
const landmarkColors = {
  thumb: "#fffb05",
  indexFinger: "#3900a3",
  middleFinger: "#03fc03",
  ringFinger: "#03fcf4",
  pinky: "#f700ff",
  palmBase: "#2d2e2d",
};

// Text emojis (unicode) to display if pose is found
const gestureStrings = {
  thumbs_up: "👍",
  victory: "✌🏻",
  thumbs_down: "👎",
  fist: "✊",
  metal: "😂",
};

// global objects for custom gestures
//👎
const thumbsDownGesture = new fp.GestureDescription("thumbs_down");
// ✊
const fistGesture = new fp.GestureDescription("fist");
// 😂
const metalGesture = new fp.GestureDescription("metal");

//main
async function main() {
  // init components
  const video = document.querySelector("#video");
  const canvas = document.querySelector("#canvas");
  //init cnavas
  const ctx = canvas.getContext("2d");
  // additional layer for display the result gesture
  const resultLayer = document.querySelector("#result");

  // configure gesture estimator
  // add "✌🏻" and "👍" as sample gestures
  // rest by Andreas Lakus
  const knownGestures = [
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture,
    thumbsDownGesture,
    fistGesture,
    metalGesture
  ];

  const GE = new fp.GestureEstimator(knownGestures);

  // load handpose model
  const model = await handpose.load();
  console.log("Handpose model loaded");

  // main estimation loop
  const estimateHands = async () => {
    // clear canvas overlay -> workaround for drawing text on video
    ctx.clearRect(0, 0, config.video.width, config.video.height);
    resultLayer.innerText = "";

    // get hand landmarks friom webcam
    const predictions = await model.estimateHands(video, true);

    for (let i = 0; i < predictions.length; i++) {
      // draw dots at predicted joint position
      for (let part in predictions[i].annotations) {
        for (let point of predictions[i].annotations[part]) {
          drawPoint(ctx, point[0], point[1], 5, landmarkColors[part]);
        }
      }

      // gesture estimation based on landmarks
      // best choice 7.5 (default)
      const est = GE.estimate(predictions[i].landmarks, 7.5);

      console.log(est);

      if (est.gestures.length > 0) {
        // find gesture = max confidence
        let result = est.gestures.reduce((p, c) => {
          return p.confidence > c.confidence ? p : c;
        });

        resultLayer.innerText = gestureStrings[result.name];
      }
    }
    // sleep for performance
    setTimeout(() => {
      estimateHands();
    }, 1000 / config.video.fps);
  };

  estimateHands();
  console.log("Starting predictions");
}

async function initCamera(width, height, fps) {
  const constraints = {
    audio: false,
    video: {
      facingMode: "user",
      width: width,
      height: height,
      frameRate: { max: fps },
    },
  };

  const video = document.querySelector("#video");
  video.width = width;
  video.height = height;

  // get video stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

window.addEventListener("DOMContentLoaded", () => {
  initCamera(config.video.width, config.video.height, config.video.fps).then(
    (video) => {
      video.play();
      video.addEventListener("loadeddata", (event) => {
        console.log("camera");
        createCustomGestures();
      });
    }
  );

  const canvas = document.querySelector("#canvas");
  canvas.width = config.video.width;
  canvas.height = config.video.height;
  console.log("canvas");
});

async function createCustomGestures() {
  let customGestures = new Promise((resolve, reject) => {
    // Custom Gestures by Andreas Lakus

    //👎
    // Thumb vertical up, no curl
    thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    thumbsDownGesture.addDirection(
      fp.Finger.Thumb,
      fp.FingerDirection.VerticalDown,
      1.0
    );
    thumbsDownGesture.addDirection(
      fp.Finger.Thumb,
      fp.FingerDirection.DiagonalDownLeft,
      0.5
    );
    thumbsDownGesture.addDirection(
      fp.Finger.Thumb,
      fp.FingerDirection.DiagonalDownRight,
      0.5
    );

    for (let finger of [
      fp.Finger.Index,
      fp.Finger.Middle,
      fp.Finger.Ring,
      fp.Finger.Pinky,
    ]) {
      thumbsDownGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
      thumbsDownGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
      thumbsDownGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
      thumbsDownGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
    }

    // 😂
    // all Fingers vertical up and no curl | thumb Diagonal up left and right
    for (let finger of [
      fp.Finger.Index,
      fp.Finger.Pinky,
    ]) {
      metalGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
      metalGesture.addDirection( finger, fp.FingerDirection.VerticalUp,1.0);
    }
    
    
    for (let finger of [
      fp.Finger.Ring,
      fp.Finger.Middle,
      fp.Finger.Thumb,
    ]) {
      metalGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
    }
    // ✊
    //all fingers all directions, full curl
    for (let finger of [
      fp.Finger.Index,
      fp.Finger.Middle,
      fp.Finger.Ring,
      fp.Finger.Pinky,
      fp.Finger.Thumb
    ]) {
      fistGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    }
    console.log(metalGesture)
    console.log(fistGesture)
    resolve("Custom Gestures Loaded");
    reject("Error: Custom gestures");
  });
  customGestures.then(() => {
    console.log("Custom Gestures loaded");
    // if promise resolved -> start main loop
    main();
  });
}
