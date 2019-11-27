//var sound = new Howl({
//  src: ['temp-music/wwe1.mp3']
//});
//
//var id1 = sound.play();
//id1 = sound.stop();
var playing = null;
function p(id){
    if(playing == id){
        // pause song //
        playing = null;
        console.log("Paused "+id);
        $(id).classList.remove('playing');
        $('plyBtn-'+id).innerHTML = "play_arrow";
    }else{
        if(playing !== null){
            // stop song //
            console.log("Stoped "+playing);
            $(playing).classList.remove('playing');
            $('plyBtn-'+playing).innerHTML = "play_arrow";
        }
        // play song //
        playing = id;
        console.log("Playing "+id);
        $(id).classList.add('playing');
        $('plyBtn-'+id).innerHTML = "pause";
    }
}