// Sliders

var songProgressSlider = document.getElementById('song-progress');
var volumeSlider = document.getElementById('song-volume');

var SongProgressSliderUsable = true;

noUiSlider.create(songProgressSlider, {
  start: [0],
  connect : [false,true],
  range: {
    'min': [0],
    'max': [100]
  }
});

noUiSlider.create(volumeSlider, {
  start: 100,
  behaviour:'snap',
  connect : [false,true],
  range: {
    'min': 0,
    'max': 100
  }
});

songProgressSlider.noUiSlider.on('change',function(values,handle){
  var my_audio = document.getElementById('bgAudio');
  my_audio.currentTime = my_audio.duration * (values[handle]/100);
});

songProgressSlider.noUiSlider.on('start',function(){
  SongProgressSliderUsable = false;
})

songProgressSlider.noUiSlider.on('end',function(){
  SongProgressSliderUsable = true;
});

volumeSlider.noUiSlider.on('update',function(values,handle){
  var my_audio = document.getElementById('bgAudio');
  my_audio.volume = values[handle]/100;
});

function play() {
  var my_audio = document.getElementById('bgAudio');
  if(my_audio.paused == true){
    togglePlayPauseButton(my_audio);
    my_audio.play();
    playtimeUpdate(my_audio);
  }
}

function pause() {
  var my_audio = document.getElementById('bgAudio');
  if(my_audio.paused == false){
    togglePlayPauseButton(my_audio);
    my_audio.pause();
    playtimeUpdate(my_audio);
  }
}

function togglePlayPauseButton(my_audio){
  // Changing attributes of button
  if(my_audio.paused == true){
    // Change 'pause button' to 'play button'
    $("#play").replaceWith('<a class="ion-ios-pause play" id = "pause" onclick="pause()"></a>');
  } else{
    // Change 'play button' to 'pause button'
    $("#pause").replaceWith('<a class="ion-ios-play play" id = "play" onclick="play()"></a>');
  }
}

function secondToText(duration){
  var minuteText = parseInt(duration / 60);
  var second = parseInt(duration % 60);
  var secondText = (second>=10)? second : "0"+second;
  var music_playtime = minuteText + ":" + secondText;

  return music_playtime;
}

function playtimeUpdate(my_audio){

  // Set Music Total Time
  var musicTotalTime = secondToText(my_audio.duration);
  document.getElementById("music_totaltime").innerHTML = musicTotalTime;

  var music_progress_percent;

  // Set Music Play Time
  if (my_audio.paused == false) {
    showPlayTime = setInterval(function () {

      var musicPlayTime = secondToText(my_audio.currentTime);

      document.getElementById("music_playtime").innerHTML = musicPlayTime;

      if(isSongProgressSliderUsable){
        progress_percent = my_audio.currentTime / my_audio.duration * 100;
        music_progress_percent = songProgressSlider.noUiSlider.set(progress_percent);
      }
    }, 150);

  } else {
    clearInterval(showPlayTime);
  }
}
// Tooltips

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Viewport Heights

$(window).on("resize load", function () {

  var totalHeight = $(window).height();

  var headerHeight = $('.header').outerHeight();
  var footerHeight = $('.current-track').outerHeight();
  var playlistHeight = $('.playlist').outerHeight();
  var nowPlaying = $('.playing').outerHeight();

  var navHeight = totalHeight - (headerHeight + footerHeight + playlistHeight + nowPlaying);
  var artistHeight = totalHeight - (headerHeight + footerHeight);

  console.log(totalHeight);

  $(".navigation").css("height", navHeight);
  $(".artist").css("height", artistHeight);
  $(".social").css("height", artistHeight);

});


// Collapse Toggles

$(".navigation__list__header").on("click", function () {

  $(this).toggleClass("active");

});

// Media Queries

$(window).on("resize load", function () {
  if ($(window).width() <= 768) {

    $(".collapse").removeClass("in");

    $(".navigation").css("height", "auto");

    $(".artist").css("height", "auto");

  }
});

$(window).on("resize load", function () {
  if ($(window).width() > 768) {

    $(".collapse").addClass("in");

  }
});