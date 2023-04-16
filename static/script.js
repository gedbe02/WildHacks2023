var width = window.innerWidth/2;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'grid_container',
    width: width,
    height: height-100,
    draggable: true,
});
var bgLayer = new Konva.Layer({
    id: "BackgroundLayer",
    listening: false
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
    x: -1788.1176373866588,
    y: -704.6010856517915,
    image: bgImageObj,
    width: stage.width(),
    height: stage.height(),
    scale:{x:8,y:8},
  });
bgLayer.add(backgroundImage);
console.log(backgroundImage.zIndex(-1));
}
bgImageObj.src = '/static/temp_lakefill_map.png';


var WIDTH = 500;
var HEIGHT = 2000;
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
    var thumbUrls = rocksTB.thumnails
    
    var x_min = 42.05779722222222
    var x_max = 42.05989722222222
    var y_min = -87.67122799972223
    var y_max =  -87.6697244

    function showDiv() {
        var div = document.getElementById("rock_post");
        //if (div.style.display === "none") {
        div.style.display = "block";
        //} else {
        //gitdiv.style.display = "none";
        //}
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
        imageObj.src = thumbUrls[i];
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
    });
}
wait();
