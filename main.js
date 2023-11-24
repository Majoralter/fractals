window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1"),
    ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.lineCap = "round";

  let size =
      canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.2,
    sides = 6,
    maxLevel = 5,
    scale = 0.5,
    branches = 2,
    spread = 0.5,
    color = "hsl(" + Math.random() * 360 + ", 100%, 50%)",
    lineWidth = Math.floor(Math.random() * 20) + 5;

  const randomizeButton = document.getElementById("randomizeBtn"),
    slider_spread = document.getElementById("spread"),
    label_spread = document.querySelector('[for="spread"]');

  slider_spread.addEventListener("change", (e) => {
    spread = e.target.value;
    updateSpreadValue();
    drawFractal();
  });

  const drawBranch = (level) => {
    if (level > maxLevel) return;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.save();
      ctx.rotate(-spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
  };

  const drawFractal = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }

    ctx.restore();
  };

  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2);
    scale = Math.random() * 0.2 + 0.4;
    spread = Math.random() * 2.9 + 0.1;
    maxLevel = Math.random() * 0.9 + 5;
    color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    lineWidth = Math.floor(Math.random() * 20) + 5;
  }

  function updateSpreadValue() {
    slider_spread.value = spread;
    label_spread.textContent = `Spread: ${Number(spread).toFixed(1)}`;
  }

  randomizeButton.addEventListener("click", () => {
    randomizeFractal();
    updateSpreadValue();
    drawFractal();
  });
});
