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

for (var i = 0; i < imageCoordinates.length; i++) {
    (function() {
    var j = i;
    // var imageUrl = imageUrls[i];
    var imageCoors = imageCoordinates[i];
    var imageObj = new Image();
    imageObj.onload = function() {
        var xPos = WIDTH * (imageCoors[1]-y_min)/(y_max-y_min);
        var yPos = HEIGHT+-1* HEIGHT * (imageCoors[0]-x_min)/(x_max-x_min);
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
    imageObj.src = "https://ff72cc5981e91dc696eab542cd952b1dd74f1ca6a9e7f1798b38fc9-apidata.googleusercontent.com/download/storage/v1/b/example-bucket-rocks/o/images%2F0005159a-de49-43e2-bb7a-4ca693a5425d.jpg?jk=Ac_6HjJOtkkm-FfXZUi0ocHTVQUElaz2rQB8m4Hp-t-eRpTjgs8gaQAERfpmaB4274n-50wHz84IvS8DygknoDXLNJPgFWB54oGBxMCtVwkf12mPuCgooq-Bh2VYtuk4KqpXU_rNGvNh5ndRQSIlOg8vbsF2xD4ZcgTfrLIKHowky5lD82lJTpNzSYVRXnDRR1qDGwKvPEXY9ISEArMH17Cl4Nrm9Qcf21CNq2es38kvPOevxusScg4fYNmQLozefHIfiokxny-G45t2Bvsjkv1aZUgovfdWnV1RCjh6zKw_URC6YrxGJes8G8Ymm6gELbadbIaB-Wfq0UX1eKLQ4H8mZq_T2_vPEd2lhSCvBAaGXdsqM9KeFF6tBmwy2izSoutV9x3NhbLGcB-tmW7yeuzfCnnp1AiJx0xvTZiMM3icv6Pj2426HhuWjplStfIMhCYKaaFsyzKJUq2IC57zb1MolDaOWzlSR4crpKAhvaIw6OlqWhvsKbUY0jZfnosjuxtluA1AkWN4RiPKJoSvup6fzPr2dBZA96MKcjhEP_3WtB36pbeJKBz-vZG2miaDUS63Q0EloD6bdYxSFzmOhgtZx3K-RjGTlUFijyjLUe8LN4NMz9aQ3fnT05eFV5o10aKtsUAbc9Q2n6QS-96b7U8w_oq7B3rBeD2holoUkUhVM85ayKE5nm88GFwLDUW8ePr4F1iOgsUCxP3zNqT6jg84UNOZqkGnksHxF94jSDiweWhMrTPjTj-ayX8r5utxRS4WbkBM6p6RAzDoYhn3YZWTLxBCDoccWidQH-vW7GFqqn6cwXuZImGKBaoscwN2_iEPXK5BI0BUjgOLzsqsg8OD20jkYFSuKmhqCYyhHJAkHZHI37yzEMSkfOW1Vd4X8zRhNFBbajJ4ZavbsqI7TmHj9Bzsag9at4DkotGErFI6dRCD8NdPfDR_BVXoPU4M29MzkzseRINVGRa_vaROh0kyDvhkA7ut88doxzYKF197MqppWz-7rhNYuhIh02K7v11KwGvcffN5upFCsz3N2MPH3rf0Wgps52GFz3oe35BOGET0PT1brKYzdRvWY5XJQ4HdnpFcc_o65S7e4diNsH1NR-ntz4ubjqNKzjxzav6NuYGN5zURHTrlCVNh5rSwogbqaspY4FyeeLflHwtya6O9cwm4taeZq-IivqG9T9vuvepDiIGc_RdgqjmN11DmK5J2bZlX30p7Wyzn-RhQFWvIY0t5SL42LtFoIJhNxl9g9NS1cYLQ8Uz38kwyIgpexIMXSHVVtVVwIQ9QUap6Mjaifps&isca=1"//'https://picsum.photos/200/200/?random&rnd'+new Date().getTime();    
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
        if (child.name() !== "background") {
            child.scale({x: 1/newScale, y: 1/newScale});
            console.log(child.scale())
        }
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

