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