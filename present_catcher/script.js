let x, x1, y, y1, n=2, stage, result, sound;
let ufo1, ufo2, ufo3, box, kabe, kabe2, kabe2_1, kabe3, bear;

function preload(){
  ufo1 = loadImage('https://kanaden.github.io/imgs/ufo1.png');
  ufo2 = loadImage('https://kanaden.github.io/imgs/ufo2.png');
  ufo3 = loadImage('https://kanaden.github.io/imgs/ufo3.png');
  box = loadImage('https://kanaden.github.io/imgs/box.png');
  kabe = loadImage('https://kanaden.github.io/imgs/kabe.jpg');
  kabe2 = loadImage('https://kanaden.github.io/imgs/kabe2.jpg');
  kabe2_1 = loadImage('https://kanaden.github.io/imgs/kabe2_1.jpg');
  kabe3 = loadImage('https://kanaden.github.io/imgs/kabe3.jpg');
  bear = loadImage('https://kanaden.github.io/imgs/bear.png');
  sound = loadSound('https://kanaden.github.io/sound/bgm.wav');
}

function setup() {
  createCanvas(600, 600);
  textSize(72);
  textAlign(CENTER);
  x=10;
  y=0;
  x1=random(125, width-63);
  y1=height-239;
  stage=0;
  result=0;
}

function draw() {
  frameRate(30);
  image(kabe, 0, 0, width, 400);
  switch (stage) {
  case 0: // 初期状態
    fill(100);
    text('Click to start',width/2,height/2-50);
    break;

  case 1: // 水平移動
    if (x<width-90) { // 移動位置の制限
      x+=n;
    } else {
      stage++;
    }
    sound.play();
    break;

  case 2: // 垂直降下
    if (y<height-298) { // 移動位置の制限
      y+=n;
    } else {
      if (x1-37<=x&&x<=x1-23) { // 結果判定
        result=1;
      }
      stage=3;
    }
    break;

  case 3: // 垂直上昇
    y-=n;
    if (result==1) { // 成功時、プレゼントも一緒に動かす
      x1=x+28;
      y1-=n;
    }
    if (y<=0) { // 移動位置の制限
      stage=4;
    }
    break;

  default: // 水平移動
    if (x>10) { // 移動位置の制限
      x-=n*2;
      if (result==1) {
        x1-=n*2;
      }
    } else {
      if (result==1&&y1<height-70) { // 成功時、プレゼント落下
        y1+=n*6;
      } else {
        fill(100);
        if (result!=0) {
          text('GET!!', width/2, height/2-50); // 成功表示
          result=2;
        } else {
          text('FAIL', width/2, height/2-50); // 失敗表示
        }
        stage=5;
        sound.pause();
        sound.currentTime = 0;
      }
    }
    break;
  }
  if(stage>=4&&x<=10){
      image(ufo3, x, y, 100, 100);
  }else if(stage==2){
      image(ufo3, x, y, 100, 100);
  }else if(stage<=2){
      image(ufo1, x, y, 100, 100);
  }else if(result==0){
      image(ufo1, x, y, 100, 100);
  }else{
      image(ufo2, x, y, 100, 100);
  }
  image(kabe2_1,0,510);
  image(kabe3, 20, 510);
  if (result>=1&&stage>=4&&y1>height-190) {
    image(bear, x1-5, y1-10, 50, 50);
  } else {
    image(box, x1, y1, 44, 44);
  }
  stroke(255);
  fill(255, 128);
  rect(20, 340, 70, 59);
  image(kabe2, 0, 400, width, 110);
}

function mousePressed() {
  if ( stage<2 ) {
    stage++;
  }else if (stage==5) {
    setup();
  }
}
