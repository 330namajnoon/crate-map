let body = document.querySelector("body");

/////////  elements  ////////////
let canvas,imageselected, canvas2d, image,crate_image;
let render = [];
/////////  image  ////////
function Image_(src = "") {
    this.styles = {
        image: `position: absolute;width: ${innerWidth / 1.5}px;left: ${innerWidth / 6}px;top: 20px`,
        data_div: `position: absolute;width: ${innerWidth / 1.5}px;left: ${innerWidth / 6}px`,
        inputs: `height:20px;position: relative;width: 15%;float: left;margin-left: 3%`,
    }
    this.image = new Image();
    this.image.src = src;
    this.image.style.cssText = this.styles.image;

    this.data_div = document.createElement("div");
    this.data_div.style.cssText = this.styles.data_div;
    this.width = document.createElement("input");
    this.width.type = "text";
    this.width.placeholder = "whidth-px";
    this.width.style.cssText = this.styles.inputs;

    this.height = document.createElement("input");
    this.height.type = "text";
    this.height.placeholder = "height-px";
    this.height.style.cssText = this.styles.inputs;

    this.url = document.createElement("input");
    this.url.type = "text";
    this.url.placeholder = "URL";
    this.url.style.cssText = this.styles.inputs;

    this.name = document.createElement("input");
    this.name.type = "text";
    this.name.placeholder = "Name";
    this.name.style.cssText = this.styles.inputs;

    this.save = document.createElement("input");
    this.save.type = "button";
    this.save.value = "code";
    this.save.style.cssText = this.styles.inputs + ";height: 27px; background-color: gold;border: 0;border-radius: 3px 3px 3px 3px";

    this.crate();
}
Image_.prototype.crate = function () {
    body.appendChild(this.image);
    body.appendChild(this.data_div);
    this.data_div.appendChild(this.width);
    this.data_div.appendChild(this.height);
    this.data_div.appendChild(this.url);
    this.data_div.appendChild(this.name);
    this.data_div.appendChild(this.save);

    this.data_div.style.top = (this.image.getBoundingClientRect().height) + 40 + "px";

    this.width.addEventListener("input", () => {
        this.image.style.width = this.width.value;
        this.update_();
    })
    this.height.addEventListener("input", () => {
        this.image.style.height = this.height.value;
        this.update_();
    })
}
Image_.prototype.draw = function () {
}
Image_.prototype.update_ = function () {
    this.image.style.left = ((innerWidth - this.image.getBoundingClientRect().width) / 2) + "px"
    let image_size = this.image.getBoundingClientRect();
    canvas.style.cssText = `width: ${image_size.width}px;height: ${image_size.height}px;left: ${image_size.x}px;top:${image_size.y}px;position: absolute;z-index:1`;
    this.data_div.style.top = (this.image.getBoundingClientRect().height) + 40 + "px";
}
////////  image select  ////////
function ImageSelected() {
    this.file = document.createElement("input");
    this.file.type = "file";
    this.file.style.display = "none";
    this.button_posation = {
        x: 0,
        y: 0,
        w: 150,
        h: 50
    }
    this.button = document.createElement("input");
    this.button.type = "button";
    this.button.value = "Elige foto";
    this.button.style.cssText = `z-index:1;position: absolute;width: ${this.button_posation.w}px;height: ${this.button_posation.h}px;top: ${(innerHeight / 2) - (this.button_posation.h / 2)}px;left: ${(innerWidth / 2) - (this.button_posation.w / 2)}px;background-color: gold;border: 0;border-radius: 3px 3px 3px 3px`;
    body.appendChild(this.file);
    body.appendChild(this.button);
    this.button.addEventListener("click", () => {
        this.file.click();
    })
    this.file.addEventListener("change", () => {
        let filereader = new FileReader();
        filereader.addEventListener("load", () => {
            crate_image = new Image_(filereader.result);
            this.button.style.display = "none";
            crate_canvas();
            canvas2d = new Canvas2d();
            anim();
        })
        filereader.readAsDataURL(this.file.files[0]);

    })

}
imageselected = new ImageSelected();
/////// canvas  ////////

function Vector2d(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

function crate_canvas() {
    let image_size = crate_image.image.getBoundingClientRect();
    canvas = document.createElement("canvas");
    canvas.style.cssText = `width: ${image_size.width}px;height: ${image_size.height}px;left: ${image_size.x}px;top:${image_size.y}px;position: absolute;z-index:1`;
    body.appendChild(canvas);
    window.addEventListener("resize", () => {
        canvas.style.cssText = `width: ${innerWidth}px;height: ${innerHeight}px;position: absolute`;
    })
}
function Canvas2d() {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
}
Canvas2d.prototype.clare = function () {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
}
Canvas2d.prototype.imageDrawe = function (
    img = "",
    position = new Vector2d(),
    origin = new Vector2d(),
    rotation = 0
) {

    this.ctx.save();
    this.ctx.translate(position.x, position.y);
    this.ctx.rotate(rotation);
    this.ctx.drawImage(img, -origin.x, -origin.y)
    this.ctx.restore();
}
Canvas2d.prototype.update = function () {

}
Canvas2d.prototype.draw = function () {
    // console.log(render.img)
    render.forEach(e => {
        e.draw();
    })
    this.ctx.fillStyle = "0x000000";
    this.ctx.fillRect(0, 0, 200, 200);
}


function anim() {
    canvas2d.ctx.fillStyle = "#ffffff";
    canvas2d.clare();
    canvas2d.draw();
    canvas2d.update();
    requestAnimationFrame(anim);
}

