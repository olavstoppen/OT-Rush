// let counterDisplayElem = document.getElementById("counter-display");
let counterMinusElem = document.getElementById("counter-minus");
let counterPlusElem = document.getElementById("counter-plus");

let count = -1;

// updateDisplay();
console.log(count);
counterPlusElem.addEventListener("click", () => {
  count++;
  var colors = [
    'url("img-buttons/infoBox2.png")',
    'url("img-buttons/infoBox3.png")',
    'url("img-buttons/infoBox4.png")',
    'url("img-buttons/controls.png")',
  ];

  document.getElementById("buuble").style.backgroundImage = colors[count];

  if (count > 2) {
    counterPlusElem.style.backgroundImage = 'url("img-buttons/Play.png")';
    document.getElementById("counter-plus").onclick = function () {
      document.getElementById("playHerf").href = "./game.html";
    };
    document.getElementById("buuble").style.width = "995px";
    document.getElementById("buuble").style.height = "437px";
    document.getElementById("buuble").style.left = "242px";
    document.getElementById("character").style.display = "none";
    document.getElementById("counter-minus").style.display = "none";
  }
});
