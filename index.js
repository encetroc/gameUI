const startBtn = document.querySelector(".startBtn");
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const img1 = new Image();
img1.src = "../bg.png";

const img2 = new Image();
img2.src = "../logo.png";

let level = 1;
let score = 0;

class bgImgAnimated {
  constructor(speed, img) {
    this.speed = speed;
    this.img = img;
    this.x = 0;
  }

  move() {
    this.x += this.speed;
    this.x %= canvas.width;
  }

  draw() {
    this.move();
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  }
}

const bgImg1 = new bgImgAnimated(-3, img1);
const bgImg2 = new bgImgAnimated(3, img2);

startBtn.onclick = () => {
  startBtn.style.display = "none";
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (level) {
      case 1:
        bgImg1.draw();
        checkScore(200, () => (level = 2));
        break;
      case 2:
        bgImg2.draw();
        checkScore(400, () => {
          clearInterval(interval);
          startBtn.style.display = "block";
          score = 0;
          level = 1;
        });
        break;
    }
  }, 20);
};

function checkScore(limit, fn) {
  score++;
  if (score > limit) {
    fn();
  }
}
