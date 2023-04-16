var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'grid_container',
    width: width/2,
    height: height,
    draggable: true,
});
var layer = new Konva.Layer({
    id: "BaseLayer"
});
stage.add(layer);

var WIDTH = 1000;
var HEIGHT = 1000;
var NUMBER = 5;
var imageUrls = ["https://imgprd19.hobbylobby.com/2/30/2d/2302d006d25572e782e92cf5f31bfb9295dd7fef/1400Wx1400H-1609817-0320-px.jpg",
                "https://imageio.forbes.com/specials-images/imageserve/dv424076/0x0.jpg?format=jpg&width=1200",
                "https://www.gannett-cdn.com/presto/2022/07/21/USAT/0ba6d19c-537a-41b0-b467-fc0c9434ce66-Rock_Scowl.jpg?width=300&height=450&fit=crop&format=pjpg&auto=webp",
                "https://images.pexels.com/photos/161702/harmony-relax-rock-moqui-161702.jpeg?cs=srgb&dl=pexels-pixabay-161702.jpg&fm=jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXuWmzxB3P9ZegyKZnRzhHOvrInX_psMTZzBkpGdBc2tGbEeBzRyrtzk-z7B7EkA69Y2P_7LD81EE&usqp=CAU&ec=48600112"
                ]
var imageCoordinates = [
    [42.05808889, -87.67012000],
    [42.05906944, -87.66991333],
    [42.05891667, -87.66992167],
    [42.05897890, -87.66992130],
    [42.05896789, -87.66992850],
]
var x_min = 42.05
var x_max = 42.06
var y_min = -87.672
var y_max =  -87.668

function getFitScale(imageSize, containerSize) {
    var scale = Math.min(containerSize.width / imageSize.width, containerSize.height / imageSize.height);
    return scale;
}

for (var i = 0; i < NUMBER; i++) {
    (function() {
    var j = i;
    var imageUrl = imageUrls[i];
    var imageCoors = imageCoordinates[i]
    var imageObj = new Image();
    imageObj.onload = function() {
        var scale = getFitScale({width: imageObj.width, height: imageObj.height}, {width: 100, height: 100});
        var cropWidth = 100 / scale;
        var cropHeight = 100 / scale;
        var cropX = (imageObj.width - cropWidth) / 2;
        var cropY = (imageObj.height - cropHeight) / 2;
        var xPos = j*100//WIDTH * (imageCoors[0]-x_min)/(x_max-x_min);
        var yPos = j*100//HEIGHT * (imageCoors[1]-y_min)/(y_max-y_min) * 2;
        console.log(xPos, yPos)
        var image = new Konva.Image({
            x: xPos,
            y: yPos,
            image: imageObj,
            width: 100,
            height: 100,
            crop: {
                x: cropX,
                y: cropY,
                width: cropWidth,
                height: cropHeight
              },
            draggable: false
        })
        layer.add(image);
        layer.draw();
    };
    imageObj.src = 'https://picsum.photos/200/200/?random&rnd'+new Date().getTime();    
    })();
}

var scaleBy = 1.01;
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

stage.scale({ x: newScale, y: newScale });

var newPos = {
x: pointer.x - mousePointTo.x * newScale,
y: pointer.y - mousePointTo.y * newScale,
};
stage.position(newPos);
});
