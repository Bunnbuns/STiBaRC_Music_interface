var sound = new Howl({
  src: ['temp-music/wwe1.mp3']
});

var id1 = sound.play();

var i = 0;
document.getElementById('wwe1').onclick = function(evt) {
    if(i == 0){
        i = 1;
        sound.play(id1);
    }else{
        i = 0;
        sound.pause(id1);
    }
}

// new music //
document.getElementById('new-music').innerHTML = "";
function getNewMusic(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var tmp = JSON.parse(xhttp.responseText);
    };
    xhttp.open('GET', 'new-music.json', true);
    xhttp.send();
}