//var sound = new Howl({
//  src: ['temp-music/wwe1.mp3']
//});
//
//var id1 = sound.play();
//id1 = sound.stop();
//
//var i = 0;
//document.getElementById('wwe1').onclick = function(evt) {
//    if(i == 0){
//        i = 1;
//        sound.play(id1);
//    }else{
//        i = 0;
//        sound.pause(id1);
//    }
//}
var test1 = null;
// new music //
var newMusic = document.getElementById('new-music');
newMusic.innerHTML = "";
function getNewMusic(){
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var tmp = JSON.parse(xhttp.responseText);
        test1 = tmp;
        var output = "";
        for( var i in tmp.items.tracks ) {
            var artists = "";
            for(var i2 = 0; i2 < Object.keys(tmp.items.tracks[i].artists).length; i2++){
                if(i2 > 0){
                    artists += ", "
                }
                artists += tmp.items.tracks[i].artists[i2].name;
            }
            output += '<div class="music-player song"> <div class="artwork light-outline left-br" style="background-image: url('+tmp.items.tracks[i].album.image+')"> <span class="play-button"> <i class="material-icons"> play_arrow </i> </span> </div> <span class="info"> <span class="title">'+tmp.items.tracks[i].name+'</span> <div class="artist">'+artists+'<span class="line-separator"> • </span><span>'+tmp.items.tracks[i].album.name+'</span></div> </span> </div>';
        }
        newMusic.innerHTML = output;
        
    };
    xhttp.open('GET', 'new-music.json', true);
    xhttp.send();
}