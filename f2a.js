/*!
**|  CyTube Channel: MLPA External Script
**|
**|  All code written by Xaekai except where otherwise noted.
**|  Copyright 2014-2019 All Rights Reserved
**|
**@preserve
*/
if(!this[CHANNEL.name]){this[CHANNEL.name]={}}if(!this[CHANNEL.name].branding){this[CHANNEL.name].branding=$(".navbar-brand").html("").css({"background-image":'url("https://derpicdn.net/img/2016/8/22/1230800/thumb.png")',"background-size":"100%",height:"50px","min-width":"50px"})}if(!this[CHANNEL.name].favicon){this[CHANNEL.name].favicon=$("<link/>").prop("id","favicon").attr("rel","shortcut icon").attr("type","image/png").attr("sizes","64x64").attr("href","https://cdn.discordapp.com/attachments/903127271764795412/928461122602926130/ThP_Logo.png").appendTo("head")}
/*!
**|   Xaekai's Sequenced Module Loader
**|
**@preserve
*/
/*!
**|   Xaekai's Sequenced Module Loader
**|
**@preserve
*/
({options:{designator:{prefix:"Pony-",delay:90*1e3},playlist:{collapse:true,inlineBlame:true,moveReporting:true,quickQuality:true,recentMedia:true,simpleLeader:true,syncCheck:true,thumbnails:true,timeEstimates:true,volumeControl:true},chatext:{persistIgnore:true,smartScroll:true,maxMessages:120},userlist:{autoHider:true},various:{notepad:true,emoteToggle:true},whispers:{joins:true,parts:false}},modules:{settings:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_settings.min.js",done:true},audio:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_audiolib.js",done:true},privmsg:{active:1,rank:1,url:"https://resources.pink.horse/js/module_privmsg.min.js",done:true},whispers:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_whispers.min.js",done:true,cache:false},userlist:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_userlist.min.js",done:true},md5hash:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_md5.min.js",done:true},designator:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_designator.min.js",done:true},playlist:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_playlist.min.js",done:true},notifier:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_alerts.min.js",done:true},chatline:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_chatline.min.js",done:true},chatext:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_colormap.min.js",done:true},dectalk:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_tts.min.js",done:true},hotkeys:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_hotkeys.min.js",done:true},layout:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_layout.min.js",done:true},various:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_various.min.js",done:true},embedmedia:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_embedmedia.min.js",done:true},
	
	//chaticons:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_chaticons.min.js",done:true},
ci_library:{active:1,rank:-1,url:"https://resources.pink.horse/js/library_chaticons.min.js",done:true,cache:false},AvtrClient:{active:1,rank:-1,url:"https://resources.pink.horse/js/AvatarClient.min.js",done:true},fancysheet:{active:1,rank:-1,url:"https://resources.pink.horse/js/custom_fancysheet.min.js",done:true},customcode:{active:1,rank:-1,url:"https://resources.pink.horse/js/custom_mlpa.min.js",done:true,cache:false},time:{active:1,rank:-1,url:"https://resources.pink.horse/js/module_time.min.js",done:true},search:{active:0,rank:-1,url:"https://resources.pink.horse/js/module_search.min.js",done:true},spider:{active:0,rank:1,url:"https://resources.pink.horse/js/module_spider.js",done:true}},getScript:function(url,success,cache=true){return jQuery.ajax({url:url,cache:cache,success:success,type:"GET",dataType:"script"})},initialize:function(){if(CLIENT.modules){return}else{CLIENT.modules=this}window[CHANNEL.name].modulesOptions=this.options;console.info("[XaeModule]","Begin Loading.");this.index=Object.keys(this.modules);this.sequencerLoader();this.cache=false},sequencerLoader:function(){if(this.state.prev){setTimeout(this.modules[this.state.prev].done,0);this.state.prev=""}if(this.state.pos>=this.index.length){return console.info("[XaeModule]","Loading Complete.")}var currKey=this.index[this.state.pos];if(this.state.pos<this.index.length){if(this.modules[currKey].active){if(this.modules[currKey].rank<=CLIENT.rank){console.info("[XaeModule]","Loading:",currKey);this.state.prev=currKey;this.state.pos++;let cache=typeof this.modules[currKey].cache=="undefined"?this.cache:this.modules[currKey].cache;this.getScript(this.modules[currKey].url,this.sequencerLoader.bind(this),cache)}else{if(this.modules[currKey].rank===0&&CLIENT.rank===-1){(function(module){socket.once("login",data=>{if(data.success){this.getScript(module.url,false,this.cache)}})})(this.modules[currKey])}this.state.pos++;this.sequencerLoader()}}else{this.state.pos++;this.sequencerLoader()}}},state:{prev:"",pos:0}}).initialize();


GM_addStyle ( `
    #playlist_area {
        background-color: #2e3338;
        color: #fff;
        font-weight: 400;
        width: 100%;
        height: 520px;
        border-width: 2px;
        padding: 5px;
        margin-top: 5px;
    }
    #export_modal {
        visibility: hidden;
    }
    #toggle_played_btn {
        width:100%;
        font-size: 16px;
        padding:5px;
        display:block;
    }
    #played_area {
        border-left: 1px solid;
        border-top: 1px solid;
        border-right: 1px solid;
    }
    .qe_time_until {
        visibility: hidden;
        padding-right: 5px;
    }
` );

document.getElementById("videocontrols").insertAdjacentHTML("afterbegin", "<button class='btn btn-sm btn-default' id='toggle_button'>Export</span></button>");
document.getElementById("queue").insertAdjacentHTML("beforebegin", "<div id='played_area'><span class='pointer glyphicon glyphicon-chevron-down' id='toggle_played_btn' title='Show played videos'></span><ul class='videolist' id='played'></ul></div>");
document.getElementById("played").style.maxHeight="0px";
document.body.insertAdjacentHTML("beforeend", `
    <div id="export_modal" class="modal fade in" aria-hidden="false" style="display: block; padding-right: 10px;">
    <div id="modal_backdrop" class="modal-backdrop fade in" style="height: 2088px;"></div>
    <div class="modal-dialog"><div class="modal-content">
    <div class="modal-header"><button class="close" id="close_button" data-dismiss="modal" aria-hidden="true">×</button>
    <h3>Playlist URLs</h3></div><div class="modal-body"><button class='btn btn-sm btn-default' id="toggle_export_titles_btn">Titles</button><Textarea id="playlist_area" class="form-control" type="text"></Textarea></div>
    <div class="modal-footer"></div></div></div></div>`);

var current = "", export_list = false, toggle_export_titles = true;
var toggleBtn = document.getElementById("toggle_played_btn");
var queue = document.getElementById("queue");
var played = document.getElementById("played");

document.getElementById("export_modal").style.visibility="hidden";
document.getElementById("toggle_button").onclick = function(){toggle();};
document.getElementById("close_button").onclick = function(){toggle();};
document.getElementById("modal_backdrop").onclick = function(){toggle();};

document.getElementById("toggle_played_btn").onclick = function(){
    if(queue.style.maxHeight=="26px"){
        played.style.maxHeight = "0px";
        queue.style.maxHeight = "500px";
        queue.style.overflowY = "auto";
        toggleBtn.classList = "pointer glyphicon glyphicon-chevron-down";
    }
    else{
        played.style.maxHeight = "474px";
        queue.style.maxHeight = "26px";
        queue.style.overflowY = "hidden";
        played.scrollTop = played.scrollHeight;
        queue.scrollTop = 0;
        toggleBtn.classList = "pointer glyphicon glyphicon-chevron-up";
    }
}

document.getElementById("toggle_export_titles_btn").onclick = function(){
    !toggle_export_titles ? toggle_export_titles = true : toggle_export_titles = false;
    playlistRefresh();
};

var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return;

    if( MutationObserver ){
      var mutationObserver = new MutationObserver(callback)

      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }

    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()

observeDOM( queue, function(m){
    var addedNodes = [], removedNodes = [];

    m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))
    m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

    Array.from(addedNodes).forEach(li => {
        if(hasClass(li, "queue_entry") && !hasClass(li, "queue_played") && export_list){
            playlistRefresh();
            console.log('"'+li.children[0].innerHTML+'" added or moved, refreshing export');
        }
    });

    Array.from(removedNodes).forEach(li => {
        if(hasClass(li, "queue_entry")){
            if(li == current || document.getElementById("queue").childElementCount == 0){
                played.insertAdjacentHTML("beforeend", "<li class='queue_entry queue_temp queue_played'>"+li.innerHTML+"</li>");
                played.scrollTop = played.scrollHeight;
            }
        }
    });

    var active = document.getElementsByClassName("queue_active")[0]
    if(active && current != active){
        current = active;
    }
    getTimeUntil();
});

function getTimeUntil(){
    var time = 0;
    Array.from(queue.children).forEach(li => {
        if(hasClass(li, "queue_entry")){
            if(hasClass(li, "queue_played") && hasClass(li.children[2], "qe_time_until") || hasClass(li, "queue_active") && hasClass(li.children[2], "qe_time_until")){
                if(li.children[2].innerHTML != ""){li.children[2].innerHTML = "";}
            }
            if(!hasClass(li, "queue_played")){
                if(!hasClass(li, "queue_active")){
                    if(li.children[2]){
                        if(hasClass(li.children[2], "qe_time_until") && li.children[2].innerHTML != "Time until: "+fancyTimeFormat(time)+" |"){
                            li.children[2].innerHTML = "Time until: "+fancyTimeFormat(time)+" |";
                        }
                        else if(!hasClass(li.children[2], "qe_time_until")){
                            li.children[1].insertAdjacentHTML("afterend", "<span class='qe_time qe_time_until'>Time until: "+fancyTimeFormat(time)+" |</span>");
                            li.onmouseover = function(){li.children[2].style.visibility = "visible";}
                            li.onmouseleave = function(){li.children[2].style.visibility = "hidden";}
                        }
                    }
                }
                var currentDuration = li.children[1].innerHTML.split(":");
                if(currentDuration[2]){
                    time += (+currentDuration[0]) * 60 * 60 + Number(+currentDuration[1]) * 60 + Number(+currentDuration[2]);
                }
                else{
                    time += (+currentDuration[0]) * 60 + Number(+currentDuration[1]);
                }
            }
        }
    });
}

function playlistRefresh(){
    document.getElementById("playlist_area").value = "";
    Array.from(played.children).forEach(li => {
        if(toggle_export_titles){
            document.getElementById("playlist_area").value += li.children[0].text + "\n" + li.children[0].href + "\n\n";
        }
        else{
            document.getElementById("playlist_area").value += li.children[0].href + "\n";
        }
    });
    Array.from(queue.children).forEach(li => {
        if(toggle_export_titles){
            document.getElementById("playlist_area").value += li.children[0].text + "\n" + li.children[0].href + "\n\n";
        }
        else{
            document.getElementById("playlist_area").value += li.children[0].href + "\n";
        }
    });
}

function toggle(){
    if(!export_list){playlistRefresh();}
    !export_list ? document.getElementById("export_modal").style.visibility = "visible" : document.getElementById("export_modal").style.visibility = "hidden";
    !export_list ? export_list = true : export_list = false;
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function fancyTimeFormat(duration){
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
