//var sound = new Howl({
//  src: ['temp-music/wwe1.mp3']
//});
//
//var id1 = sound.play();
//id1 = sound.stop();
var playing = null;
function p(id){
    if(playing == id){
        playing = null;
        console.log("Paused "+id);
        document.getElementById(id).classList.remove('playing');
        document.getElementById('plyBtn-'+id).innerHTML = "play_arrow";
    }else{
        if(playing !== null){
            console.log("Stoped "+playing);
            document.getElementById(playing).classList.remove('playing');
            document.getElementById('plyBtn-'+playing).innerHTML = "play_arrow";
        }
        playing = id;
        console.log("Playing "+id);
        document.getElementById(id).classList.add('playing');
        document.getElementById('plyBtn-'+id).innerHTML = "pause";
    }
}

var test1 = null;
// new music //
var newMusic = document.getElementById('new-music');
var topTracks = document.getElementById('top-tracks');
newMusic.innerHTML = "";
topTracks.innerHTML = "";
function getFrontMusic(){
    // new music //
    var newMusicReq = new XMLHttpRequest();
    newMusicReq.onload = function() {
        var tmp = JSON.parse(newMusicReq.responseText);
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
            output += '<div class="music-player song" id="'+tmp.id+'-'+tmp.items.tracks[i].id+'"> <div class="artwork light-outline left-br" style="background-image: url('+tmp.items.tracks[i].album.image+')"> <span class="play-button" onclick="p(\''+tmp.id+'-'+tmp.items.tracks[i].id+'\')"> <i class="material-icons" id="plyBtn-'+tmp.id+'-'+tmp.items.tracks[i].id+'"> play_arrow </i> </span> </div> <span class="info"> <span class="title">'+tmp.items.tracks[i].name+'</span> <div class="bottom-info"><span class="artist">'+artists+'</span><span class="line-separator"> • </span><span class="album">'+tmp.items.tracks[i].album.name+'</span></div> </div>';
        }
        newMusic.innerHTML = output;
        
    };
    newMusicReq.open('GET', 'new-music.json', true);
    newMusicReq.send();
    // top tracks //
    var topTracksReq = new XMLHttpRequest();
    topTracksReq.onload = function() {
        var tmp = JSON.parse(topTracksReq.responseText);
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
            output += '<div class="music-player song" id="'+tmp.id+'-'+tmp.items.tracks[i].id+'"> <div class="artwork light-outline left-br" style="background-image: url('+tmp.items.tracks[i].album.image+')"> <span class="play-button" onclick="p(\''+tmp.id+'-'+tmp.items.tracks[i].id+'\')"> <i class="material-icons" id="plyBtn-'+tmp.id+'-'+tmp.items.tracks[i].id+'"> play_arrow </i> </span> </div> <span class="info"> <span class="title">'+tmp.items.tracks[i].name+'</span> <div class="bottom-info"><span class="artist">'+artists+'</span><span class="line-separator"> • </span><span class="album">'+tmp.items.tracks[i].album.name+'</span></div> </div>';
        }
        topTracks.innerHTML = output;
        
    };
    topTracksReq.open('GET', 'top-tracks.json', true);
    topTracksReq.send();
}