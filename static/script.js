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

async function getRocks() {
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

  async function getUsers() {
    try {
      const response = await fetch('static/json/usersTB.json');
      const usersTB = await response.json();
      return usersTB
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getPosts() {
    try {
      const response = await fetch('static/json/postsTB.json');
      const postsTB = await response.json();
      return postsTB
    } catch (error) {
      console.error(error);
    }
  }

  async function getComments() {
    try {
      const response = await fetch('static/json/commentsTB.json');
      const commentsTB = await response.json();
      return commentsTB
    } catch (error) {
      console.error(error);
    }
  }
  async function getLikes() {
    try {
      const response = await fetch('static/json/likesTB.json');
      const likesTB = await response.json();
      return likesTB
    } catch (error) {
      console.error(error);
    }
  }

function getThing(column, ids, id, temp_fix) {
    var thing = "";
    for (var i = 0; i < column.length; i++) {
        var ids_i = ids[i];
        if (temp_fix) {
            ids_i += 5;
        }
        if (ids_i == id) {
            thing = column[i];
            break;
        }
    }

    return thing;
}

async function wait() {
    var rocksTB = await getRocks();
    var usersTB = await getUsers();
    var postsTB = await getPosts();
    var commentsTB = await getComments();
    var likesTB = await getLikes();

    var imageUrls = rocksTB.urls;
    var imageCoordinates = rocksTB.coords;
    var rockIds = rocksTB.rock_ids;
    var userIds = rocksTB.user_ids;
    
    var x_min = 42.05779722222222
    var x_max = 42.05989722222222
    var y_min = -87.67122799972223
    var y_max =  -87.6697244

    function showDiv(rockId, userId, url, usersTB, postsTB, commentsTB, likesTB) {
        var div = document.getElementById("rock_post");
        
        var username = getThing(usersTB.usernames, usersTB.user_ids, userId, false);
        // for (var i = 0; i < usersTB.usernames.length; i++) {
        //     if (usersTB.user_ids[i] == userId) {
        //         username = usersTB.usernames[i];
        //         break;
        //     }
        // }
        
        var caption = getThing(postsTB.captions, postsTB.rock_ids, rockId, true);

        // for (var i = 0; i < postsTB.captions.length; i++) {
        //     console.log(postsTB.rock_ids[i], rockId);
        //     if (postsTB.rock_ids[i]+5 == rockId) {
        //         caption = postsTB.captions[i];
        //         break;
        //     }
        // }
        
        var postId = getThing(postsTB.post_ids, postsTB.rock_ids, rockId, true);


        var num_likes = 0;
        for (var i = 0; i < likesTB.post_ids.length; i++) {
            if (postsTB.post_ids[i] == postId) {
                num_likes += 1;
            }
        }
        //CommentID -> UserID -> Username
        var commentId = getThing(commentsTB.comment_ids, commentsTB.post_ids, postId, false);
        var commentUserId = getThing(commentsTB.user_ids, commentsTB.comment_ids, commentId, false);
        var comment_username = getThing(usersTB.usernames, usersTB.user_ids, commentUserId, false);

        var comment = getThing(commentsTB.comments, commentsTB.post_ids , postId);


        document.getElementById("post_username").innerHTML = username;
        document.getElementById("caption_username").innerHTML = "<strong>" + username + "</strong> " + caption;
        document.getElementById("post_pic").src = url;
        document.getElementById("comment_username").innerHTML = "<strong>" + comment_username + "</strong> " + comment;
        var like_word = "Likes"
        if (num_likes == 1) {
            like_word = "Like";
        }
        document.getElementById("likes").innerHTML = num_likes.toString() + " " + like_word;



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
                rockid: rockIds[j],
                userid: userIds[j],
                url: imageUrls[j]
            })
            image.on('click',  function(e) {
                showDiv(image.attrs['rockid'], image.attrs['userid'], image.attrs['url'], usersTB, postsTB, commentsTB, likesTB);
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
