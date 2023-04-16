var width = window.innerWidth/2;
var height = window.innerHeight;
var BG_SCALE = 30

var stage = new Konva.Stage({
    container: 'grid_container',
    width: 500,
    height: 2000,
    draggable: true,
});
var bgLayer = new Konva.Layer({
    id: "BackgroundLayer",
});
stage.add(bgLayer);
var layer = new Konva.Layer({
    id: "BaseLayer"
});
stage.add(layer);

var bgImageObj = new Image();
bgImageObj.onload = function() {
var backgroundImage = new Konva.Image({
    name: "background",
    x: -110.79556274414062,
    y: -173.53604125976562,
    image: bgImageObj,
  });
bgLayer.add(backgroundImage);
console.log(backgroundImage.width(1200), backgroundImage.height(5000))
backgroundImage.zIndex(-1);
bgImageObj.src = '/static/lakefill.svg';

function adjustBG() {
    var images = bgLayer.children;
    var bg_x = images[0].getAbsolutePosition().x;
    if (bg_x > 0) {
        // If it is, prevent the default behavior
          console.log("ADJUST")
          stage.x(stage.x() - bg_x)
      }
}

var WIDTH = stage.width();
var HEIGHT = stage.height();
var STANDARD_SIZE = 150;

async function getData() {
    try {
      const response = await fetch('static/json/rocksTB.json');
      const rocksTB = await response.json();
      //console.log(rocksTB.urls);
      imagelist = [... rocksTB.urls];
      coords = [... rocksTB.coords];
      return rocksTB
    } catch (error) {
      console.error(error);
    }
  }


async function wait() {
    var rocksTB = await getData();
    var imageUrls = rocksTB.urls;
    var imageCoordinates = rocksTB.coords;
    var rockIds = rocksTB.rock_ids;
    
   var x_min = 42.05779722222222
   var x_max = 42.05989722222222
   var y_min = -87.67122799972223
   var y_max =  -87.6697244

    function showDiv() {
        var div = document.getElementById("rock_post");
        if (div.style.display === "none") {
        div.style.display = "block";
        } else {
        div.style.display = "none";
        }
    }

    for (var i = 0; i < imageCoordinates.length; i++) {
        (function() {
        var j = i;
        // var imageUrl = imageUrls[i];
        var imageCoors = imageCoordinates[i];
        var imageObj = new Image();
        imageObj.onload = function() {
            var xPos = WIDTH * (imageCoors[1]-y_min)/(y_max-y_min);
            var yPos = HEIGHT+-1* HEIGHT * (imageCoors[0]-x_min)/(x_max-x_min);
            //console.log(xPos, yPos)
            var image = new Konva.Image({
                x: xPos,
                y: yPos,
                image: imageObj,
                width: 100,
                height: 100,
                draggable: false,
                rockid: rockIds[j]
            })
            image.on('click',  function(e) {
                showDiv(image.attrs['rockid']);
            });
            layer.add(image);
            layer.draw();
        };
        imageObj.src = imageUrls[i];
        })();
    }


    var scaleBy = 1.1;
    stage.on('wheel', (e) => {
    // stop default scrolling
    e.evt.preventDefault();

    var oldScale = stage.scaleX();
    var pointer = stage.getPointerPosition();

    var mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
    direction = -direction;
    }

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    console.log("newScale: ",newScale)

    if (newScale * STANDARD_SIZE > Math.max(...layer.children.map((child) => child.width()))) {
        layer.children.map((child) => {
            child.scale({x: 1/newScale, y: 1/newScale});
            //console.log(child.scale())
        })
        layer.batchDraw();
    } else if (newScale * 300 < Math.min(...layer.children.map((child) => child.width()))) {
        newScale = Math.min(...layer.children.map((child) => child.width()))/300;
    }


    stage.scale({ x: newScale, y: newScale });

    var newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    adjustBG();
    });
}
wait();
