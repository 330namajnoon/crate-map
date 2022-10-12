let body = document.querySelector("body");

/////////  elements  ////////////
let imageselected;
////////  image select  ////////
function ImageSelected() {
    this.file = document.createElement("input");
    this.file.type = "file";
    this.file.style.display = "none";
    
    this.button = document.createElement("input");
    this.button.type = "button";
    this.button.value = "Elige foto";
    body.appendChild(this.file);
    body.appendChild(this.button);
}
imageselected = new ImageSelected();
/////// canvas  ////////
let canvas = document.createElement("canvas");
canvas.style.cssText = `width: ${innerWidth}px;height: ${innerHeight}px;background-color: black`;
body.appendChild(canvas);
function Canvas2d() {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
}