/*!
 **|  CyTube Color Map
 **|  Copyright Xaekai 2014 - 2016
 **|  Version 2016.10.04.0100
 **|
 **@requires chatcolor
 **@preserve
 */
"use strict";
(function (CyTube_ColorMap) {
    return CyTube_ColorMap(window, document, window.jQuery);
})(function (window, document, $, String, undefined) {
    window.colormapMouseover = function (target) {
        var color = target.alt;
        $("#mapTitle").css("color", color);
    };
    window.colormapClick = function (event, target) {
        var chatline = document.getElementById("chatline");
        var color = target.alt;
        if (event.ctrlKey || event.altKey || event.shiftKey) {
            chatline.focus();
        }
        if (event.ctrlKey && event.altKey && event.shiftKey) {
            return $("#chatline").trigger({ type: "colorTypeSet", setting: "random" });
        }
        if (event.ctrlKey && event.shiftKey) {
            return $("#chatline").trigger({ type: "colorTypeSet", setting: "static" });
        }
        if (event.ctrlKey && event.altKey) {
            return $("#chatline").trigger({ type: "colorTypeSet", setting: "cycle" });
        }
        if (event.altKey) {
            return $("#chatline").trigger({ type: "cycleColorSet", color: color });
        }
        if (event.ctrlKey) {
            event.stopPropagation();
            return $("#chatline").trigger({ type: "cycleColorAppend", color: color });
        }
        if (event.shiftKey) {
            return $("#chatline").trigger({ type: "staticColorSet", color: color });
        }
        chatline.value = "" + chatline.value.slice(0, chatline.selectionStart) + (" ssc:" + color + " ") + chatline.value.slice(chatline.selectionStart, chatline.length);
        chatline.focus();
    };
    $("#colorFilters").remove();
    if (!$("#chatinput").length) {
        $("#chatline").wrap('<div onsubmit="return false" id="chatinput" class="input-group" style="width:100%">');
    }
    var inputGroup = $("<span>").addClass("input-group-btn dropup").prop("id", "colorFilters");
    if ($("#videowrap").prevAll().length) {
        inputGroup.insertAfter($("#chatline"));
    } else {
        inputGroup.insertBefore($("#chatline"));
    }
    var inputButton = $("<button/>")
        .addClass("btn btn-default dropdown-toggle")
        .attr("type", "button")
        .attr("href", "javascript:void(0)")
        .attr("data-toggle", "dropdown")
        .html("<span class='dropLabel' id='colorFiltersDropText'>Colors </span><span class='caret'></span>")
        .appendTo(inputGroup);
    var colormapDropup = generateColorTable().addClass("dropdown-menu").attr("role", "menu").appendTo(inputGroup);
    $("<button>")
        .addClass("btn btn-warning btn-xs")
        .append($("<span>").addClass("glyphicon glyphicon-resize-full"))
        .on("click", function (event) {
            $("#chatline").trigger({ type: "fontSize", change: "up" });
            return event.stopPropagation();
        })
        .css("position", "absolute")
        .css("right", "0")
        .css("bottom", "0")
        .css("font-family", "monospace")
        .css("border-radius", "2px")
        .css("margin", "4px")
        .css("padding-top", "4px")
        .appendTo("#colorFiltersPopup");
    $("<button>")
        .addClass("btn btn-warning btn-xs")
        .append($("<span>").addClass("glyphicon glyphicon-resize-small"))
        .on("click", function (event) {
            $("#chatline").trigger({ type: "fontSize", change: "down" });
            return event.stopPropagation();
        })
        .css("position", "absolute")
        .css("left", "0")
        .css("bottom", "0")
        .css("font-family", "monospace")
        .css("border-radius", "2px")
        .css("margin", "4px")
        .css("padding-top", "4px")
        .appendTo("#colorFiltersPopup");
    function generateColorTable() {
        function generateMapArea(data) {
            return $("<area>")
                .attr("alt", "#" + data.hex)
                .attr("coords", data.coords)
                .attr("onclick", "colormapClick(event,this)")
                .attr("onmouseover", "colormapMouseover(this)")
                .attr("shape", "poly")
                .css("cursor", "pointer");
        }
        var table = $("<div>").css("min-width", "250px").prop("id", "colorFiltersPopup");
        var td = $("<div>").css("margin", "0 auto").css("display", "table").appendTo(table);
        var title = $("<span>").prop("id", "mapTitle").html("<center> Select color: ██ </center>").appendTo(td);
        var image = $("<img>").attr("alt", "colormap").attr("src", "https://resources.pink.horse/images/colormap.gif").attr("usemap", "#colormap").css("margin-right", "2px").appendTo(td);
        var map = $("<map>").prop("id", "colormap").attr("name", "colormap").appendTo(td);
        var areaMap = [
            { hex: "003366", coords: "63,0,72,4,72,15,63,19,54,15,54,4", cell: "20,54" },
            { hex: "336699", coords: "81,0,90,4,90,15,81,19,72,15,72,4", cell: "20,72" },
            { hex: "3366CC", coords: "99,0,108,4,108,15,99,19,90,15,90,4", cell: "20,90" },
            { hex: "003399", coords: "117,0,126,4,126,15,117,19,108,15,108,4", cell: "20,108" },
            { hex: "000099", coords: "135,0,144,4,144,15,135,19,126,15,126,4", cell: "20,126" },
            { hex: "0000CC", coords: "153,0,162,4,162,15,153,19,144,15,144,4", cell: "20,144" },
            { hex: "000066", coords: "171,0,180,4,180,15,171,19,162,15,162,4", cell: "20,162" },
            { hex: "006666", coords: "54,15,63,19,63,30,54,34,45,30,45,19", cell: "35,45" },
            { hex: "006699", coords: "72,15,81,19,81,30,72,34,63,30,63,19", cell: "35,63" },
            { hex: "0099CC", coords: "90,15,99,19,99,30,90,34,81,30,81,19", cell: "35,81" },
            { hex: "0066CC", coords: "108,15,117,19,117,30,108,34,99,30,99,19", cell: "35,99" },
            { hex: "0033CC", coords: "126,15,135,19,135,30,126,34,117,30,117,19", cell: "35,117" },
            { hex: "0000FF", coords: "144,15,153,19,153,30,144,34,135,30,135,19", cell: "35,135" },
            { hex: "3333FF", coords: "162,15,171,19,171,30,162,34,153,30,153,19", cell: "35,153" },
            { hex: "333399", coords: "180,15,189,19,189,30,180,34,171,30,171,19", cell: "35,171" },
            { hex: "669999", coords: "45,30,54,34,54,45,45,49,36,45,36,34", cell: "50,36" },
            { hex: "009999", coords: "63,30,72,34,72,45,63,49,54,45,54,34", cell: "50,54" },
            { hex: "33CCCC", coords: "81,30,90,34,90,45,81,49,72,45,72,34", cell: "50,72" },
            { hex: "00CCFF", coords: "99,30,108,34,108,45,99,49,90,45,90,34", cell: "50,90" },
            { hex: "0099FF", coords: "117,30,126,34,126,45,117,49,108,45,108,34", cell: "50,108" },
            { hex: "0066FF", coords: "135,30,144,34,144,45,135,49,126,45,126,34", cell: "50,126" },
            { hex: "3366FF", coords: "153,30,162,34,162,45,153,49,144,45,144,34", cell: "50,144" },
            { hex: "3333CC", coords: "171,30,180,34,180,45,171,49,162,45,162,34", cell: "50,162" },
            { hex: "666699", coords: "189,30,198,34,198,45,189,49,180,45,180,34", cell: "50,180" },
            { hex: "339966", coords: "36,45,45,49,45,60,36,64,27,60,27,49", cell: "65,27" },
            { hex: "00CC99", coords: "54,45,63,49,63,60,54,64,45,60,45,49", cell: "65,45" },
            { hex: "00FFCC", coords: "72,45,81,49,81,60,72,64,63,60,63,49", cell: "65,63" },
            { hex: "00FFFF", coords: "90,45,99,49,99,60,90,64,81,60,81,49", cell: "65,81" },
            { hex: "33CCFF", coords: "108,45,117,49,117,60,108,64,99,60,99,49", cell: "65,99" },
            { hex: "3399FF", coords: "126,45,135,49,135,60,126,64,117,60,117,49", cell: "65,117" },
            { hex: "6699FF", coords: "144,45,153,49,153,60,144,64,135,60,135,49", cell: "65,135" },
            { hex: "6666FF", coords: "162,45,171,49,171,60,162,64,153,60,153,49", cell: "65,153" },
            { hex: "6600FF", coords: "180,45,189,49,189,60,180,64,171,60,171,49", cell: "65,171" },
            { hex: "6600CC", coords: "198,45,207,49,207,60,198,64,189,60,189,49", cell: "65,189" },
            { hex: "339933", coords: "27,60,36,64,36,75,27,79,18,75,18,64", cell: "80,18" },
            { hex: "00CC66", coords: "45,60,54,64,54,75,45,79,36,75,36,64", cell: "80,36" },
            { hex: "00FF99", coords: "63,60,72,64,72,75,63,79,54,75,54,64", cell: "80,54" },
            { hex: "66FFCC", coords: "81,60,90,64,90,75,81,79,72,75,72,64", cell: "80,72" },
            { hex: "66FFFF", coords: "99,60,108,64,108,75,99,79,90,75,90,64", cell: "80,90" },
            { hex: "66CCFF", coords: "117,60,126,64,126,75,117,79,108,75,108,64", cell: "80,108" },
            { hex: "99CCFF", coords: "135,60,144,64,144,75,135,79,126,75,126,64", cell: "80,126" },
            { hex: "9999FF", coords: "153,60,162,64,162,75,153,79,144,75,144,64", cell: "80,144" },
            { hex: "9966FF", coords: "171,60,180,64,180,75,171,79,162,75,162,64", cell: "80,162" },
            { hex: "9933FF", coords: "189,60,198,64,198,75,189,79,180,75,180,64", cell: "80,180" },
            { hex: "9900FF", coords: "207,60,216,64,216,75,207,79,198,75,198,64", cell: "80,198" },
            { hex: "006600", coords: "18,75,27,79,27,90,18,94,9,90,9,79", cell: "95,9" },
            { hex: "00CC00", coords: "36,75,45,79,45,90,36,94,27,90,27,79", cell: "95,27" },
            { hex: "00FF00", coords: "54,75,63,79,63,90,54,94,45,90,45,79", cell: "95,45" },
            { hex: "66FF99", coords: "72,75,81,79,81,90,72,94,63,90,63,79", cell: "95,63" },
            { hex: "99FFCC", coords: "90,75,99,79,99,90,90,94,81,90,81,79", cell: "95,81" },
            { hex: "CCFFFF", coords: "108,75,117,79,117,90,108,94,99,90,99,79", cell: "95,99" },
            { hex: "CCCCFF", coords: "126,75,135,79,135,90,126,94,117,90,117,79", cell: "95,117" },
            { hex: "CC99FF", coords: "144,75,153,79,153,90,144,94,135,90,135,79", cell: "95,135" },
            { hex: "CC66FF", coords: "162,75,171,79,171,90,162,94,153,90,153,79", cell: "95,153" },
            { hex: "CC33FF", coords: "180,75,189,79,189,90,180,94,171,90,171,79", cell: "95,171" },
            { hex: "CC00FF", coords: "198,75,207,79,207,90,198,94,189,90,189,79", cell: "95,189" },
            { hex: "9900CC", coords: "216,75,225,79,225,90,216,94,207,90,207,79", cell: "95,207" },
            { hex: "003300", coords: "9,90,18,94,18,105,9,109,0,105,0,94", cell: "110,0" },
            { hex: "009933", coords: "27,90,36,94,36,105,27,109,18,105,18,94", cell: "110,18" },
            { hex: "33CC33", coords: "45,90,54,94,54,105,45,109,36,105,36,94", cell: "110,36" },
            { hex: "66FF66", coords: "63,90,72,94,72,105,63,109,54,105,54,94", cell: "110,54" },
            { hex: "99FF99", coords: "81,90,90,94,90,105,81,109,72,105,72,94", cell: "110,72" },
            { hex: "CCFFCC", coords: "99,90,108,94,108,105,99,109,90,105,90,94", cell: "110,90" },
            { hex: "FFFFFF", coords: "117,90,126,94,126,105,117,109,108,105,108,94", cell: "110,108" },
            { hex: "FFCCFF", coords: "135,90,144,94,144,105,135,109,126,105,126,94", cell: "110,126" },
            { hex: "FF99FF", coords: "153,90,162,94,162,105,153,109,144,105,144,94", cell: "110,144" },
            { hex: "FF66FF", coords: "171,90,180,94,180,105,171,109,162,105,162,94", cell: "110,162" },
            { hex: "FF00FF", coords: "189,90,198,94,198,105,189,109,180,105,180,94", cell: "110,180" },
            { hex: "CC00CC", coords: "207,90,216,94,216,105,207,109,198,105,198,94", cell: "110,198" },
            { hex: "660066", coords: "225,90,234,94,234,105,225,109,216,105,216,94", cell: "110,216" },
            { hex: "336600", coords: "18,105,27,109,27,120,18,124,9,120,9,109", cell: "125,9" },
            { hex: "009900", coords: "36,105,45,109,45,120,36,124,27,120,27,109", cell: "125,27" },
            { hex: "66FF33", coords: "54,105,63,109,63,120,54,124,45,120,45,109", cell: "125,45" },
            { hex: "99FF66", coords: "72,105,81,109,81,120,72,124,63,120,63,109", cell: "125,63" },
            { hex: "CCFF99", coords: "90,105,99,109,99,120,90,124,81,120,81,109", cell: "125,81" },
            { hex: "FFFFCC", coords: "108,105,117,109,117,120,108,124,99,120,99,109", cell: "125,99" },
            { hex: "FFCCCC", coords: "126,105,135,109,135,120,126,124,117,120,117,109", cell: "125,117" },
            { hex: "FF99CC", coords: "144,105,153,109,153,120,144,124,135,120,135,109", cell: "125,135" },
            { hex: "FF66CC", coords: "162,105,171,109,171,120,162,124,153,120,153,109", cell: "125,153" },
            { hex: "FF33CC", coords: "180,105,189,109,189,120,180,124,171,120,171,109", cell: "125,171" },
            { hex: "CC0099", coords: "198,105,207,109,207,120,198,124,189,120,189,109", cell: "125,189" },
            { hex: "993399", coords: "216,105,225,109,225,120,216,124,207,120,207,109", cell: "125,207" },
            { hex: "333300", coords: "27,120,36,124,36,135,27,139,18,135,18,124", cell: "140,18" },
            { hex: "669900", coords: "45,120,54,124,54,135,45,139,36,135,36,124", cell: "140,36" },
            { hex: "99FF33", coords: "63,120,72,124,72,135,63,139,54,135,54,124", cell: "140,54" },
            { hex: "CCFF66", coords: "81,120,90,124,90,135,81,139,72,135,72,124", cell: "140,72" },
            { hex: "FFFF99", coords: "99,120,108,124,108,135,99,139,90,135,90,124", cell: "140,90" },
            { hex: "FFCC99", coords: "117,120,126,124,126,135,117,139,108,135,108,124", cell: "140,108" },
            { hex: "FF9999", coords: "135,120,144,124,144,135,135,139,126,135,126,124", cell: "140,126" },
            { hex: "FF6699", coords: "153,120,162,124,162,135,153,139,144,135,144,124", cell: "140,144" },
            { hex: "FF3399", coords: "171,120,180,124,180,135,171,139,162,135,162,124", cell: "140,162" },
            { hex: "CC3399", coords: "189,120,198,124,198,135,189,139,180,135,180,124", cell: "140,180" },
            { hex: "990099", coords: "207,120,216,124,216,135,207,139,198,135,198,124", cell: "140,198" },
            { hex: "666633", coords: "36,135,45,139,45,150,36,154,27,150,27,139", cell: "155,27" },
            { hex: "99CC00", coords: "54,135,63,139,63,150,54,154,45,150,45,139", cell: "155,45" },
            { hex: "CCFF33", coords: "72,135,81,139,81,150,72,154,63,150,63,139", cell: "155,63" },
            { hex: "FFFF66", coords: "90,135,99,139,99,150,90,154,81,150,81,139", cell: "155,81" },
            { hex: "FFCC66", coords: "108,135,117,139,117,150,108,154,99,150,99,139", cell: "155,99" },
            { hex: "FF9966", coords: "126,135,135,139,135,150,126,154,117,150,117,139", cell: "155,117" },
            { hex: "FF6666", coords: "144,135,153,139,153,150,144,154,135,150,135,139", cell: "155,135" },
            { hex: "FF0066", coords: "162,135,171,139,171,150,162,154,153,150,153,139", cell: "155,153" },
            { hex: "CC6699", coords: "180,135,189,139,189,150,180,154,171,150,171,139", cell: "155,171" },
            { hex: "993366", coords: "198,135,207,139,207,150,198,154,189,150,189,139", cell: "155,189" },
            { hex: "999966", coords: "45,150,54,154,54,165,45,169,36,165,36,154", cell: "170,36" },
            { hex: "CCCC00", coords: "63,150,72,154,72,165,63,169,54,165,54,154", cell: "170,54" },
            { hex: "FFFF00", coords: "81,150,90,154,90,165,81,169,72,165,72,154", cell: "170,72" },
            { hex: "FFCC00", coords: "99,150,108,154,108,165,99,169,90,165,90,154", cell: "170,90" },
            { hex: "FF9933", coords: "117,150,126,154,126,165,117,169,108,165,108,154", cell: "170,108" },
            { hex: "FF6600", coords: "135,150,144,154,144,165,135,169,126,165,126,154", cell: "170,126" },
            { hex: "FF5050", coords: "153,150,162,154,162,165,153,169,144,165,144,154", cell: "170,144" },
            { hex: "CC0066", coords: "171,150,180,154,180,165,171,169,162,165,162,154", cell: "170,162" },
            { hex: "660033", coords: "189,150,198,154,198,165,189,169,180,165,180,154", cell: "170,180" },
            { hex: "996633", coords: "54,165,63,169,63,180,54,184,45,180,45,169", cell: "185,45" },
            { hex: "CC9900", coords: "72,165,81,169,81,180,72,184,63,180,63,169", cell: "185,63" },
            { hex: "FF9900", coords: "90,165,99,169,99,180,90,184,81,180,81,169", cell: "185,81" },
            { hex: "CC6600", coords: "108,165,117,169,117,180,108,184,99,180,99,169", cell: "185,99" },
            { hex: "FF3300", coords: "126,165,135,169,135,180,126,184,117,180,117,169", cell: "185,117" },
            { hex: "FF0000", coords: "144,165,153,169,153,180,144,184,135,180,135,169", cell: "185,135" },
            { hex: "CC0000", coords: "162,165,171,169,171,180,162,184,153,180,153,169", cell: "185,153" },
            { hex: "990033", coords: "180,165,189,169,189,180,180,184,171,180,171,169", cell: "185,171" },
            { hex: "663300", coords: "63,180,72,184,72,195,63,199,54,195,54,184", cell: "200,54" },
            { hex: "996600", coords: "81,180,90,184,90,195,81,199,72,195,72,184", cell: "200,72" },
            { hex: "CC3300", coords: "99,180,108,184,108,195,99,199,90,195,90,184", cell: "200,90" },
            { hex: "993300", coords: "117,180,126,184,126,195,117,199,108,195,108,184", cell: "200,108" },
            { hex: "990000", coords: "135,180,144,184,144,195,135,199,126,195,126,184", cell: "200,126" },
            { hex: "800000", coords: "153,180,162,184,162,195,153,199,144,195,144,184", cell: "200,144" },
            { hex: "993333", coords: "171,180,180,184,180,195,171,199,162,195,162,184", cell: "200,162" },
        ];
        while (areaMap.length) {
            generateMapArea(areaMap.shift()).appendTo(map);
        }
        return table;
    }
});
