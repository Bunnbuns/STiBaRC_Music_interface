//var sound = new Howl({
//  src: ['temp-music/wwe1.mp3']
//});
//
//var id1 = sound.play();
//id1 = sound.stop();
function p(id){
    if(playing == id){
        // pause song //
        setPlayerBtn("pause", id);
    }else if(playing !== null){
            // stop song //
            setPlayerBtn("stop", id);
    }else{
        // play song //
        setPlayerBtn("play", id);
    }
}
function setPlayerBtn(state, id){
    if(state == "pause"){
        playing = null;
        console.log("Paused "+id);
        $(id).classList.remove('playing');
        $('plyBtn-'+id).innerHTML = "play_arrow";
    }else{
        if(state == "stop"){
            console.log("Stoped "+playing);
            $(playing).classList.remove('playing');
            $('plyBtn-'+playing).innerHTML = "play_arrow";
        }
        playing = id;
        console.log("Playing "+id);
        $(id).classList.add('playing');
        $('plyBtn-'+id).innerHTML = "pause";
    }
}