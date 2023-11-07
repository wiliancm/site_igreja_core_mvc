var mediaPlayer;
var NowArtistTitle = "";

$(document).ready(function () {
    getmetadata();
    setInterval(getmetadata, 10000);
});

function initialiseMediaPlayer() {
    mediaPlayer = document.getElementById('media-audio');
    mediaPlayer.controls = false;
}

document.addEventListener("DOMContentLoaded", function () {
    initialiseMediaPlayer();
    mediaPlayer.addEventListener('play', function () {
        var btn = document.getElementById('play-pause-button');
        changeButtonType(btn, '<i class="icon solid fa-pause"></i> Pause');
    }, false);


    mediaPlayer.addEventListener('pause', function () {
        var btn = document.getElementById('play-pause-button');
        changeButtonType(btn, '<i class="icon solid fa-play"></i> Play');
    }, false);
}, false);


function togglePlayPause() {
    var btn = document.getElementById('play-pause-button');
    var stPlaying = document.getElementById('statePlaying');
    var icon = document.getElementById('iconRadio'); 

    if (mediaPlayer.paused || mediaPlayer.ended) {
        btn.title = 'pause';
        btn.innerHTML = '<i class="icon solid fa-pause"></i> Pause';
        btn.className = 'pause';
        mediaPlayer.load(mediaPlayer.currentSrc);
        mediaPlayer.play();
        stPlaying.value = '1';
        icon.className = 'icon solid fa-pause';
    }
    else {
        btn.title = 'play';
        btn.innerHTML = '<i class="icon solid fa-play"></i> Play';
        btn.className = 'play';
        mediaPlayer.pause();
        mediaPlayer.currentTime = 0;
        stPlaying.value = '0';
        icon.className = 'icon solid fa-play';
    }
}

function changeButtonType(btn, value) {
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
}

function stopPlayer() {
    mediaPlayer.pause();
    mediaPlayer.currentTime = 0;
}

function RefreshAlbumData() {
    $(".tracktitle").text($('#auxTitle').text());
    $('.trackartist').text($('#auxArtist').text());
    $('.trackalbum').text($('#auxAlbum').text());
    $('.coveralbum').attr('src', getCoverPathFromData($('#auxAlbum').text(), $('#auxArtist').text()));

    var btn = document.getElementById('play-pause-button');
    var statePlaying = document.getElementById('statePlaying');
    var icon = document.getElementById('iconRadio'); 

    if (statePlaying.value == "1") {
        btn.title = 'pause';
        btn.innerHTML = '<i class="icon solid fa-pause"></i> Pause';
        btn.className = 'pause';
        icon.className = 'icon solid fa-pause';
    }

    else if (statePlaying.value == "0") {
        btn.title = 'play';
        btn.innerHTML = '<i class="icon solid fa-play"></i> Play';
        btn.className = 'play';
        icon.className = 'icon solid fa-play';
    }
}

function getmetadata() {
    $.getJSON('https://ssl.evsportugal.net:8040/currentmetadata?sid=1&json=1&callback=?', function (result) {
        var NowTitle = (result.tit2 != undefined ? result.tit2.trim() : "");
        var NowArtist = (result.tpe1 != undefined ? result.tpe1.trim() : "");
        var NowAlbum = (result.talb != undefined ? result.talb.trim() : "");

        if (NowTitle.indexOf("NA") > -1) {
            var res = NowTitle.split("-");
            NowArtist = res[0];
            NowTitle = res[1];
            NowAlbum = res[2];
        }

        var checkArtistAlbum = NowArtist + "|" + NowTitle;

        if (NowArtistTitle != checkArtistAlbum) {

            console.log("Dados diferentes Alterar")
            // Tratamento de Dados do A tocar (capa principal)
            console.log(NowTitle);
            console.log(NowArtist);
            console.log(NowAlbum);

            NowArtistTitle = NowArtist + "|" + NowTitle;
            var noalbum = "https://www.naradio.pt/siteradiov2/images/noalbum.jpg";

            $("img").on("error", function () {
                console.log("cacei o bug");
                $(this).attr("src", noalbum);
            });

            $('.coveralbum').attr('src', getCoverPathFromData(NowAlbum, NowArtist));
            $('.tracktitle').text(NowTitle);
            $('#auxTitle').text(NowTitle);
            $('.trackartist').text(NowArtist);
            $('#auxArtist').text(NowArtist);
            $('.trackalbum').text(NowAlbum);
            $('#auxAlbum').text(NowAlbum);

            //GetLatestPlayed();
        }
    });

}

function getCoverPathFromData(album, artist) {
    var newSrc = album + "-" + artist;

    newSrc = newSrc.replace(":", " ");
    newSrc = newSrc.replace("?", " ");
    newSrc = newSrc.replace("/", " ");
    newSrc = newSrc.replace("  ", " ");
    newSrc = newSrc.trim();

    newSrc = "https://www.naradio.pt/siteradiov2/covers/" + newSrc + ".jpg";

    if (CheckOtherCover(album)) {
        newSrc = "https://www.naradio.pt/siteradiov2/othercovers/" + album + ".jpg";
    }

    return newSrc
}

function CheckOtherCover(Album) {
    var path = "";
    var arrOtherCovers = [
        "Mensagem",
        "Mensagens",
        "Jingles",
        "A minha vida dava um  Rorschach",
        "Alternativa Musical",
        "Espaço Mulher",
        "Estante",
        "Mensagem à consciência",
        "NA Açores",
        "Notícias",
        "Semear Esperança",
        "Somos DIN",
        "Novos Lançamentos",
        "Hope Fest 2021",
        "Curiosidades Bíblicas"
    ];

    for (i = 0; i < arrOtherCovers.length; i++) {
        if (arrOtherCovers[i] == Album) {
            console.log("CHECKOTHERCOVER:" + Album);
            return true;
        }
    }

    return false;
}