var width = window.innerWidth/2;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'grid_container',
    width: width,
    height: height-100,
    draggable: true,
});
var layer = new Konva.Layer({
    id: "BaseLayer"
});
stage.add(layer);

var WIDTH = 500;
var HEIGHT = 2000;
var STANDARD_SIZE = 150;
var imagelist;
var coords;
async function getData() {
    try {
      const response = await fetch('static/urls.json');
      const urls = await response.json();
      console.log(urls.content);
      imagelist = [... urls.content];
      coords = [... urls.coords];
      // console.log(urls.location[1]); // prints "quote2" to the console
      // do something with the data
      return urls
    } catch (error) {
      console.error(error);
    }
  }
  
async function wait() {
    await getData()






var imageUrls = ["https://imgprd19.hobbylobby.com/2/30/2d/2302d006d25572e782e92cf5f31bfb9295dd7fef/1400Wx1400H-1609817-0320-px.jpg",
                "https://imageio.forbes.com/specials-images/imageserve/dv424076/0x0.jpg?format=jpg&width=1200",
                "https://www.gannett-cdn.com/presto/2022/07/21/USAT/0ba6d19c-537a-41b0-b467-fc0c9434ce66-Rock_Scowl.jpg?width=300&height=450&fit=crop&format=pjpg&auto=webp",
                "https://images.pexels.com/photos/161702/harmony-relax-rock-moqui-161702.jpeg?cs=srgb&dl=pexels-pixabay-161702.jpg&fm=jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXuWmzxB3P9ZegyKZnRzhHOvrInX_psMTZzBkpGdBc2tGbEeBzRyrtzk-z7B7EkA69Y2P_7LD81EE&usqp=CAU&ec=48600112"
                ]
var imageCoordinates = [
    [42.0586, -87.67001388888889]
    [42.05891666666666, -87.66992222222223],
    [42.05850709972222, -87.6700151],
    [42.05973888888889, -87.67033333333333],
    [42.05956666666666, -87.67047222222223],
    [42.05833888888888, -87.67009722222222],
    [42.058979099999995, -87.6699002],
    [42.059870399999994, -87.67122799972223],
    [42.05846749972222, -87.67004729972223],
    [42.058979099999995, -87.6699002],
    [42.059796199999994, -87.6702791],
    [42.058344444444444, -87.6700888888889],
    [42.058791666666664, -87.67010555555557],
    [42.059711111111106, -87.67020277777779],
    [42.05846749972222, -87.67004729972223],
    [42.05899722222222, -87.66988333333333],
    [42.05841944444444, -87.67006666666667],
    [42.05818055555555, -87.6700888888889],
    [42.05850809972222, -87.67000369972223],
    [42.058211111111106, -87.67007500000001],
    [42.05779722222222, -87.67015833333333],
    [42.058194099999994, -87.67009339972223],
    [42.059802299999994, -87.67028659972223],
    [42.058588, -87.6700309],
    [42.05808888888889, -87.67011944444445],
    [42.058636111111106, -87.67001388888889],
    [42.0581952, -87.67007889972223],
    [42.0588, -87.66996666666667],
    [42.05783888888889, -87.67015],
    [42.05821666666667, -87.67007500000001],
    [42.05951944444444, -87.67061666666667],
    [42.058754, -87.67000559972223],
    [42.058197199999995, -87.67003909972223],
    [42.05827222222222, -87.67011388888889],
    [42.057919444444444, -87.67016666666667],
    [42.05874279972222, -87.6700064],
    [42.05788333333333, -87.670175],
    [42.05854722222222, -87.67003611111112],
    [42.059573099999994, -87.6697271],
    [42.05864319972222, -87.67001419972223],
    [42.05846749972222, -87.67004729972223],
    [42.05832699972222, -87.6700541],
    [42.05933339972222, -87.6698611],
    [42.05846749972222, -87.67004729972223],
    [42.059613799999994, -87.6697244],
    [42.05906944444444, -87.6699138888889],
    [42.059870399999994, -87.67122799972223],
    [42.05933339972222, -87.6698611],
    [42.05989722222222, -87.67086666666667],
    [42.05850709972222, -87.6700151],
    [42.058979099999995, -87.6699002],
    [42.058322222222216, -87.67008333333334],
    [42.05880833333333, -87.67004444444444],
    [42.05866944444444, -87.66993055555557],
    [42.058413888888886, -87.67005277777778],
    [42.05988333333333, -87.6708],
    [42.05818055555555, -87.67009722222222],
    [42.059349999999995, -87.66977777777778],
    [42.059613799999994, -87.6697244],
    [42.05846749972222, -87.67004729972223]
]
var x_min = 42.05779722222222
var x_max = 42.05989722222222
var y_min = -87.67122799972223
var y_max =  -87.6697244
console.log(coords)
for (var i = 5; i < imagelist.length; i++) {
    (function() {
    var j = i;
    // var imageUrl = imageUrls[i];
    var imageCoors = coords[i];
    var imageObj = new Image();
    imageObj.onload = function() {
        var xPos = WIDTH * (imageCoors[1]-y_min)/(y_max-y_min);
        var yPos = -1* HEIGHT * (imageCoors[0]-x_min)/(x_max-x_min);
        console.log(xPos, yPos)
        var image = new Konva.Image({
            x: xPos,
            y: yPos,
            image: imageObj,
            width: 100,
            height: 100,
            draggable: false
        })
        layer.add(image);
        layer.draw();
    };
    imageObj.src = imagelist[i];    
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
        child.scale({x: 1/newScale, y: 1/newScale})
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
wait()