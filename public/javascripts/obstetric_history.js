function readableMessage(){

    var conceptName = conceptHash[tstCurrentPage]
    conceptName = (parsedConceptName && parsedConceptName.length > 1) ? parsedConceptName : conceptName;
    conceptName = (conceptName.toLowerCase() == "parity")? "Number of Pregnancies" : conceptName;

    try{
        conceptName = conceptName.charAt(0).toUpperCase() + conceptName.slice(1).toLowerCase();
        if(__$("messageBar") && !__$("messageBar").innerHTML.match(conceptName)){
            __$("messageBar").innerHTML = __$("messageBar").innerHTML.replace("Value", conceptName + " Value").replace("value", conceptName + " value").replace("a " + conceptName + " value", conceptName + " value")
        }
    }catch(ex){}

    setTimeout(function(){
        readableMessage();
    }, 50);
}

function buildConceptsHash(){
    var count = 0;
    var inputArr = document.getElementsByTagName("input")
    conceptHash = {};
    for (var i = 0; i < inputArr.length; i ++){
        if (inputArr[i].name && inputArr[i].name.match("concept_name") && inputArr[i].name.match("observations")){
            conceptHash[count] = inputArr[i].value;
            count ++;
        }
    }
}

function transformMessages(){
    buildConceptsHash();
    setTimeout(function(){
        readableMessage();
    }, 50);
}

function updateMultiplePregnancy(){

    if (max_delivered == 2){
        __$("multiple_pregnancy").value = "Twins";
    }else if(max_delivered == 3){
        __$("multiple_pregnancy").value = "Triplets";
    }else if(max_delivered == 4){
        __$("multiple_pregnancy").value = "Quadruplet";
    }else if(max_delivered == 1){
        __$("multiple_pregnancy").value = "No";
    }

}

function updateParity(num){
    par = 0;
    for (i = 1; i <= num; i ++){
        try{
            if (parseInt(__$('gestation_type' + i).value) > 0){
                par = par + parseInt(__$("gestation_type" + i).value);
            }
        }
        catch(ex){
        }
    }
    parity = par;
    __$('enter_number_of_deliveries').value = "";
    __$('enter_number_of_deliveries').value = parity;
}

function updateDeliveries(){
    deliveries = __$('enter_number_of_deliveries').value;
}

function updateVariables(num){
    max_delivered = 1;
    for (i = 1; i <= num; i ++){
        if (__$("gestation_type" + i).value > max_delivered){
            max_delivered = __$("gestation_type" + i).value;
        }
    }
}

function validateInput(preg, baby_no){

    if (baby_no > 1){

        var twin_baby_year = __$("year_of_birth" + preg + "" + (baby_no - 1)).value;

        if (!twin_baby_year.toString().match(/unknown/i)){

            __$("touchscreenInput" + tstCurrentPage).setAttribute("min", twin_baby_year);

            __$("touchscreenInput" + tstCurrentPage).setAttribute("absoluteMin", twin_baby_year);

            __$("touchscreenInput" + tstCurrentPage).setAttribute("max", twin_baby_year);

            __$("touchscreenInput" + tstCurrentPage).setAttribute("absoluteMax", (parseInt(twin_baby_year) + 1));

        }
    }

    __$("year_of_birth" + preg + (baby_no - 1)).value = "";

}

function loadSelections(){
    __$("keyboard").style.display = "none";
    __$("touchscreenInput" + tstCurrentPage).style.display = "none";
    __$("inputFrame" + tstCurrentPage).style.height = 0.72 * screen.height + "px";
    __$("inputFrame" + tstCurrentPage).style.marginTop = 0.05 * screen.height + "px";
    __$("inputFrame" + tstCurrentPage).style.background = "white";

    var delivered_pregnancies = __$("enter_number_of_deliveries").value;

    if (delivered_pregnancies > 0){

        var headerHolder = document.createElement("div");
        headerHolder.style.height = "63px;";
        headerHolder.style.width = "100%";
        headerHolder.style.borderRadius = "10px";

        var header = document.createElement("div");
        header.id = "header";
        header.style.width = "100%";
        headerHolder.appendChild(header);

        var t1 = document.createElement("div");
        t1.innerHTML = "Pregnancy";
        t1.setAttribute("class", "h-cell");
        header.appendChild(t1);

        var t2 = document.createElement("div");
        t2.innerHTML = "Baby count";
        t2.setAttribute("class", "h-cell");
        header.appendChild(t2);

        var t3 = document.createElement("div");
        t3.innerHTML = "Details available?";
        t3.setAttribute("class", "h-cell");
        header.appendChild(t3);

        __$("inputFrame" + tstCurrentPage).appendChild(headerHolder);

        var container = document.createElement("div");
        container.style.height = 0.64 * screen.height + "px";
        container.id = "container";

        __$("inputFrame" + tstCurrentPage).appendChild(container);
        var table = document.createElement("div");
        table.id = "table";

        container.appendChild(table);

        for (var p = 1; p <= delivered_pregnancies; p ++ ){
            var row = document.createElement("div");
            row.setAttribute("class", "data-row");
            row.id = "row_" + p;
            if (p % 2 == 1){
                row.style.background = "#F8F8F8";
            }
            table.appendChild(row);
 
            var cell1 = document.createElement("div");
            cell1.id = "cell_" + p + "_1";
            cell1.style.paddingLeft = "15%";
            cell1.setAttribute("class", "data-cell");
            cell1.innerHTML = p + (p == 1 ? "<sup>st</sup>" : ((p == 2 ? "<sup>nd</sup>" : (p == 3 ? "<sup>rd</sup>" : "<sup>th</sup>"))));
            row.appendChild(cell1);

            var cell2 = document.createElement("div");
            cell2.id = "cell_" + p + "_2";
            cell2.setAttribute("class", "data-cell");

            cell2.style.paddingLeft = "7%";

            cell2.innerHTML = "<table class='button-table'><tr><td><button id = 'inc"+ p + "' class = 'minus' onmousedown = 'decrement(" +p+")'></button> </td> <td><input id = 'input_"+
            p +"'  value = '" + (counts[p] == undefined ? 1 : counts[p]) + "' class = 'label' id = 'label"+ p + "' >  </input> </td><td> <button  id = 'dec"+ p + "' class = 'plus' onmousedown = 'increment("+ p +")'></button></td></tr></table>"
            row.appendChild(cell2);

            if (counts[p] != undefined && parseInt(counts[p]) > 1){
                __$("inc" + p).style.background = "url('/images/down_arrow.png')";
                __$("inc" + p).style.backgroundRepeat = "no-repeat";
            }else{
                __$("inc" + p).style.background = "url('/images/down_arrow_gray.png')";
                __$("inc" + p).style.backgroundRepeat = "no-repeat";
            }

            if (counts[p] != undefined && parseInt(counts[p]) == 13){
                __$("dec" + p).style.background = "url('/images/up_arrow_gray.png')";
                __$("dec" + p).style.backgroundRepeat = "no-repeat";
            }else{
                __$("dec" + p).style.background = "url('/images/up_arrow.png')";
                __$("dec" + p).style.backgroundRepeat = "no-repeat";
            }
            
            var cell3 =  document.createElement("div");
            cell3.id = "cell_" + p + "_3";
            cell3.setAttribute("class", "data-cell-img");
            cell3.setAttribute("p", p);
            cell3.innerHTML = '<img class = "dcimg" id = "img_' + p +'" onclick = "checkSelection(' + p + ')" src="/images/unticked.jpg" height="45" width="45"> ';
            row.appendChild(cell3);
            
            if (data[p] == undefined)
                data[p] = {};
            data[p]["condition"] = false;
            data[p]["count"] = 1;
           

        }

        var width  = __$("row_1").offsetWidth + "px";
        headerHolder.style.width = width;
        header.style.width = width;
        updateInput(1, false);
    }
}

function increment(pos){

    var i = parseInt( __$("input_" + pos).value);
    if (i <= 12){

        __$("input_" + pos).value = parseInt( __$("input_" + pos).value) + 1;
        updateInput(pos);
    }else{

        __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.background = "url('/images/up_arrow_gray.png')";
        __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.backgroundRepeat = "no-repeat";
    }

    if (i + 1 == 13){

        __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.background = "url('/images/up_arrow_gray.png')";
        __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.backgroundRepeat = "no-repeat";
    }

    if (i + 1 > 1){
        __$("input_" + pos).parentNode.parentNode.children[0].childNodes[0].style.background = "url('/images/down_arrow.png')";
        __$("input_" + pos).parentNode.parentNode.children[0].childNodes[0].style.backgroundRepeat = "no-repeat";
    }
}

function decrement(pos){

    var i = parseInt( __$("input_" + pos).value);
    if (parseInt( __$("input_" + pos).value) > 1){

        __$("input_" + pos).value = parseInt( __$("input_" + pos).value) - 1;
        updateInput(pos);
    }else{

        __$("input_" + pos).parentNode.parentNode.children[0].childNodes[0].style.background = "url('/images/down_arrow_gray.png')";
        __$("input_" + pos).parentNode.parentNode.children[0].childNodes[0].style.backgroundRepeat = "no-repeat";
    }

    if (i - 1 == 1){

        __$("input_" + pos).parentNode.parentNode.children[0].childNodes[0].style.background = "url('/images/down_arrow_gray.png')";
        __$("input_" + pos).parentNode.parentNode.children[0].childNodes[0].style.backgroundRepeat = "no-repeat";
    }

    if (i - 1 < 13){
        __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.background = "url('/images/up_arrow.png')";
        __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.backgroundRepeat = "no-repeat";
    }
}

function checkSelection(pos){

    if (__$("img_" + pos).src.match(/unticked/)){

        __$("img_" + pos).src = "/images/ticked.jpg";
        updateInput(pos, true);
    }else{

        __$("img_" + pos).src = "/images/unticked.jpg";
        updateInput(pos, false);
    }
}

function updateInput(pos, bool){

    if (data[pos] == undefined){

        data[pos] = {};
    }

    data[pos]["count"] = parseInt( __$("input_" + pos).value);

    if (bool != undefined)
        data[pos]["condition"] = bool;

    __$("data").value = stringfy(data);
}

function stringfy(hash){

    var keys = Object.keys(hash);
    var vals = "{";
    var cons = "{";

    for (var i = 0; i < keys.length; i ++){

        vals += keys[i] + " => ";
        cons += keys[i] + " => ";

        if (i != keys.length - 1){

            vals += data[keys[i]]["count"] + ", ";
            cons += data[keys[i]]["condition"] + ", ";
        } else {

            vals += data[keys[i]]["count"] + "}";
            cons += data[keys[i]]["condition"] + "}";
        }
    }

    var string = "{'values' => " + vals + ", 'conditions' => " + cons + "}";

    return string;
}

function disablePastVisits(){
    for(var i = 0; i < anc_visits.length; i++){
        if(__$(anc_visits[i])){
            __$(anc_visits[i]).className = "keyboardButton gray";
            __$(anc_visits[i]).onmousedown = function(){}
        }
    }
}

function calculateAbortions(){
    updateDeliveries();
    if ( __$('enter_gravida').value > 1 ){
        __$('enter_number_of_abortions').value = parseInt(__$('enter_gravida').value) - parseInt(__$('enter_number_of_deliveries').value) -1
    }
}

function loadInputWindow(){

    var myModule = (function(jQ, $) {

        function load(){

            jQ("#touchscreenInput" + tstCurrentPage + ", #keyboard").css("display", "none");

           // __$("inputFrame" + tstCurrentPage).style.height = 0.741 * screen.height + "px";
           __$("inputFrame" + tstCurrentPage).style.height = "80%"
            __$("inputFrame" + tstCurrentPage).style.marginTop = 0.05 * screen.height + "px";
            __$("inputFrame" + tstCurrentPage).style.background = "white";
           // __$("inputFrame" + tstCurrentPage).style.width = 0.93 * screen.width + "px";
           __$("inputFrame" + tstCurrentPage).style.width = "98%"

            var headerHolder = document.createElement("div");
            headerHolder.id = "hheader"
            headerHolder.style.height = "63px;";
            headerHolder.style.width = "100%";
            headerHolder.style.borderRadius = "10px";

            var header = document.createElement("div");
            header.id = "header";
            header.style.width = "100%";
            headerHolder.appendChild(header);

            var t1 = document.createElement("div");
            t1.innerHTML = "Pregnancy";
            t1.style.width = "20%";
            t1.setAttribute("class", "h-cell");
            header.appendChild(t1);

            var t2 = document.createElement("div");
            t2.innerHTML = "Details";
            t2.style.width = "80%";
            t2.setAttribute("class", "h-cell");
            header.appendChild(t2);

            __$("inputFrame" + tstCurrentPage).appendChild(headerHolder);
            __$("inputFrame" + tstCurrentPage).style.zIndex = 7;

            var container = document.createElement("div");
            container.style.height = 0.64 * screen.height + "px";
            container.id = "container2";

            var pTable = document.createElement("div");
            pTable.style.display = "table";
            pTable.style.width = "100%";
            container.appendChild(pTable);

            var pregRow = document.createElement("div");
            pregRow.style.display = "table-row";
            pregRow.style.width = "100%";
            pTable.appendChild(pregRow);

            var pcell = document.createElement("div");
            pcell.innerHTML = "<div id ='pcell' style='width: 100%; overflow: auto;'><table style='width: 100%;' id = 'pregs'></table></div>";
            pcell.style.display = "table-cell";
            pcell.style.width = "20%";
            pcell.style.overflow = "hidden";
            pregRow.appendChild(pcell);

            var dcell = document.createElement("div");
            dcell.innerHTML = "<div id = 'dcell' style='width: 100%; overflow: auto;'><table style='width: 100%;' id = 'details'></table></div>";
            dcell.style.display = "table-cell";
            dcell.style.width = "80%";
            dcell.style.borderLeft = "1px black solid";
            dcell.style.overflow = "hidden";
            pregRow.appendChild(dcell);

            __$("inputFrame" + tstCurrentPage).appendChild(container);
            
            var table = document.createElement("div");
            table.style.display = "table";

            container.appendChild(pTable);
            jQ("#dcell").css("height", "464px");
            jQ("#details").css("margin-top", "20px");
            jQ("#pcell").css("height",  "464px");
            c = 0;

            for (var pos in $){

                if ($[pos]["condition"] == true)
                    loadPregnancy(pos, "delivery");
            }

            for (var i = 1; i <= parseInt(__$("enter_number_of_abortions").value); i ++){
             
                loadPregnancy(i, "abortion");
            }

            var width  = (__$("details").parentNode.offsetWidth + __$("pregs").parentNode.offsetWidth - 2) + "px";
            headerHolder.style.width = width;
            header.style.width = width;
        }

        function loadPopup(row){

            try{
                if(__$("popup") != undefined){
                    __$("popup").innerHTML = "";
                    __$("popup").parentNode.removeChild(__$("popup"))
                }

                if(__$("popup-header") != undefined){
                    __$("popup-header").innerHTML = "";
                    __$("popup-header").parentNode.removeChild(__$("popup-header"))
                }


                if(__$("shield") != undefined){
                    __$("shield").innerHTML = "";
                    __$("shield").parentNode.removeChild(__$("shield"))
                    __$("shield") = null;
                }
            }catch(e){}
            
            var popup = document.createElement("div");
            popup.id = "popup";

            var nTuple = row.getAttribute("n-tuple");
            var pTuple = row.getAttribute("p-tuple");
            var aTuple = row.getAttribute("a-tuple");
           
            popup.setAttribute("n-tuple", nTuple);
            popup.setAttribute("p-tuple", pTuple);
            popup.setAttribute("a-tuple",aTuple);
            popup.setAttribute("row_id", row.id)
            
            jQ(popup).css({
                position : "absolute",
                display : "none",
                "min-width" : 0.35 * screen.width + "px",
                "min-height" : 0.25 * screen.height + "px",
                width : "auto",
                height: "auto",
                "z-index" : 100,
                left : 0.325 * screen.width + "px",
                top : 0.18 * screen.height + "px",
                border: "1px solid black",
                background : "white",
                "border-radius" : "5px",
                opacity : "1"
            });

          
            var popupHeader = document.createElement("div");
            popupHeader.id = "popup-header";
            popupHeader.innerHTML = current_popup;
            jQ(popupHeader).css({
                "width" : "100%",
                "height" :  0.055 * screen.height + "px",
                "font-size" : "22px",
                "font-weight" : "bold",
                "padding-top" : "10px",
                "text-align" : "center",
                border: "1px dotted white",
                background : "#6D929B",
                color : "white"
            });

            var shield = document.createElement("div");
            shield.id = "shield";
            shield.style.display = "none";
            shield.style.position = "absolute";
            shield.style.width = "100%";
            shield.style.height = "100%";
            shield.style.left = "0px";
            shield.style.top = "0px";
            shield.style.backgroundColor = "#333";
            shield.style.opacity = "0.4";
            shield.style.zIndex = 50;

            __$("inputFrame" + tstCurrentPage).appendChild(shield);

            popup.appendChild(popupHeader);

            __$("inputFrame" + tstCurrentPage).appendChild(popup);
        }
        
        function loadPregnancy(n, type){

            var row1 = document.createElement("div");
            row1.id = "preg_row_" + n;
            row1.setAttribute("class", "preg-row");

            if(type == "abortion"){
                if ($$[n] == undefined){
                    $$[n] = {};
                }
            }
            var d1 = document.createElement("div");
            d1.id = n;
            d1.innerHTML = " <span style=' color: " +(type == "abortion" ? "red" : "black")  + "'> " + "<img height='46' class = 'img-preg-cell' src='/touchscreentoolkit/lib/images/unchecked.jpg'>" +
            n + (n == 1 ? "<sup>st</sup>" : ((n == 2 ? "<sup>nd</sup>" : (n == 3 ? "<sup>rd</sup>" : "<sup>th</sup>")))) + " " +
            type + " </span>";
            d1.setAttribute("class", "preg-cell");

            d1.setAttribute("selected", "false");

            d1.onclick = function (){

                if (this.getAttribute("selected") == "false"){

                    var nodes = document.getElementsByClassName("preg-cell");

                    for (var i=0; i < nodes.length; i ++){

                        var sel = nodes[i].getAttribute("selected");
                        if(this != nodes[i] && sel != undefined && sel == "true"){
                            nodes[i].setAttribute("selected", "false");
                            var image = nodes[i].getElementsByTagName("img")[0];
                            if (image != undefined && image.src.length > 0){
                                image.src = '/touchscreentoolkit/lib/images/unchecked.jpg';
                            }
                        }
                    }

                    var img = this.getElementsByTagName("img")[0];
                    if (img.src.match("unchecked")){
                        img.src = '/touchscreentoolkit/lib/images/checked.jpg'
                    }
                    this.setAttribute("selected", "true");
                    populate(this.id, type)
                }
            }


            row1.appendChild(d1);

            if (c == 0 && $[n] != undefined && $[n]["condition"] == true){
                var img = d1.getElementsByTagName("img")[0];
                d1.setAttribute("selected", "true");
                img.src = '/touchscreentoolkit/lib/images/checked.jpg'
                populate(n, type);
                c += 1;
            }


            __$("pregs").appendChild(row1);
        }

        function populate(id, type){

            if (type == "abortion"){

                populateAbortion(id);
                return;
            }
            
            var table = __$("details");

            jQ(table).fadeOut(2);
            table.innerHTML = "";
            
            if ($[id] == undefined)
                $[id] = {}
            for (var n = 1; n <= $[id]["count"]; n ++){
                if ($[id][n] == undefined)
                    $[id][n] = {}
                
                for (var i = 0; i < fields.length; i ++){
                    
                    if ($[id]["count"] > 1 && i == 0){

                        var rowd = document.createElement("div");
                        rowd.setAttribute("class", "demarcation");
                        rowd.id = "p_" + n;

                        var d= document.createElement("div");
                        d.innerHTML = "&nbsp"
                        d.setAttribute("class", "demarcation-td");
                        
                        rowd.appendChild(d);

                        var d = document.createElement("div");
                        d.innerHTML = n + (n == 1 ? "<span><sup>st</sup>" : ((n == 2 ? "<sup>nd</sup>" : (n == 3 ? "<sup>rd</sup>" : "<sup>th</sup>")))) +
                        " born in " +  id + (id == 1 ? "<sup>st</sup>" : ((id == 2 ? "<sup>nd</sup>" : (id == 3 ? "<sup>rd</sup>" : "<sup>th</sup>")))) + " pregnancy</span>";
                        d.setAttribute("class", "demarcation-td");
                        rowd.appendChild(d);
                                             
                        var dd = document.createElement("div");
                        dd.innerHTML = "&nbsp";
                        dd.setAttribute("class", "demarcation-td");
                        rowd.appendChild(dd);
                        table.appendChild(rowd);
                    }

                    var row = document.createElement("div");
                    row.id = id + "_" + n + "_detail_row_" + i;
                    row.setAttribute("n-tuple", n);
                    row.setAttribute("p-tuple", id);
                    row.setAttribute("pos", i);
                    row.setAttribute("class", "detail-row");

                    table.appendChild(row);
                    var td1= document.createElement("div");
                    td1.innerHTML = fields[i];
                    td1.setAttribute("class", "detail-row-label");
                    row.appendChild(td1);
                    var label = "?";
                  
                    if ($[id][n] != undefined && $[id][n][fields[i]] != undefined){
                        
                        label = $[id][n][fields[i]]
                    }

                    var td2 = document.createElement("div");
                    td2.innerHTML = "<div style='font-size: 22px;' class = 'display-space'> " + label + "</div>";
                    td2.setAttribute("class", "detail-row-space");
                    row.appendChild(td2);
                    
                    var td3 = document.createElement("div");
                    td3.innerHTML = "<div style='font-size: 22px;' class = 'input-button'> Edit</div>";
                    td3.setAttribute("class", "detail-row-input");
                    row.appendChild(td3);

                    var button = td3.getElementsByClassName("input-button")[0];
                    var display = td2.getElementsByClassName("display-space")[0];

                    var ni = fields.indexOf("Condition at birth");
                    
                    var c_node = jQ("[id^=" + id + "_" + n + "_detail_row_" + ni + "]");
                    var txt = "?";
                    if (c_node.length == 1)
                        txt = c_node[0].childNodes[1].childNodes[0].innerHTML;
               
                    if (i > fields.indexOf("Condition at birth") && !txt.match(/Alive/i)){
                        
                        if(!button.className.match("gray")){
                            button.className += " button_gray";
                            display.innerHTML = "?";
                        }
                        
                        button.onclick = function(){
                            
                            var ni = fields.indexOf("Condition at birth");
                            var p = this.parentNode.parentNode.getAttribute("p-tuple");
                            var n = this.parentNode.parentNode.getAttribute("n-tuple");
                            
                            var c_node = jQ("[id^=" + p + "_" + n + "_detail_row_" + ni + "]");
                            var text = "?";
                            if (c_node.length == 1)
                                text = c_node[0].childNodes[1].childNodes[0].innerHTML;
                   
                            if(text.trim() == "?"){
                                showMessage("Select condition at birth");
                            }
                            else if (text.toLowerCase().trim() == "still birth"){
                                showMessage("Baby was born dead");
                            }
                        }
                    }else{
                       
                        if (button != undefined){
                            button.onclick = function(){

                                enterData(this.parentNode.parentNode);
                            }
                        }
                    }
                    
                }
            }
            table.scrollTop = 0;
            jQ(table).fadeIn(250);
            var width  = (__$("details").parentNode.offsetWidth + __$("pregs").parentNode.offsetWidth - 2) + "px";
            __$("hheader").style.width = width;
            __$("header").style.width = width;
        }

        function populateAbortion(id){
        

            var table = __$("details");

            jQ(table).fadeOut(2);
            table.innerHTML = "";

            if(id > 0 && id <= parseInt(__$("enter_number_of_abortions").value)){
                if ($$[id] == undefined){
                    $$[id] = {};
                }
                
                for (var i = 0; i < abortionFields.length; i ++){

                    var row = document.createElement("div");
                    row.id = id + "_detail_row_" + i;
                    row.setAttribute("a-tuple", id);
                    row.setAttribute("pos", i);
                    row.setAttribute("class", "detail-row");

                    var td1= document.createElement("div");
                    td1.innerHTML = abortionFields[i];
                    td1.setAttribute("class", "detail-row-label");
                    row.appendChild(td1);
                    var label = "?";

                    if ($$[id] != undefined && $$[id][abortionFields[i]] != undefined){

                        label =  $$[id][abortionFields[i]]
                    }

                    var td2 = document.createElement("div");
                    td2.innerHTML = "<div style='font-size: 22px;' class = 'display-space'> " + label + "</div>";
                    td2.setAttribute("class", "detail-row-space");
                    row.appendChild(td2);
                    
                    var td3 = document.createElement("div");
                    td3.innerHTML = "<div style='font-size: 22px;' class = 'input-button'>Edit</div>";
                    td3.setAttribute("class", "detail-row-input");
                    row.appendChild(td3);


                    var button = td3.getElementsByClassName("input-button")[0];

                    if (button != undefined){
                        button.onclick = function(){

                            enterAbortionData(this.parentNode.parentNode);
                        }
                    }
                   
                    table.appendChild(row);
                }
            }
            table.scrollTop = 0;
            jQ(table).fadeIn(250);
            var width  = (__$("details").parentNode.offsetWidth + __$("pregs").parentNode.offsetWidth - 2) + "px";
            __$("hheader").style.width = width;
            __$("header").style.width = width;
        }

        function showNumber(id, global_control, min, max){
            cn = 9;
            global_control = ""
            var row1 = ["1","2","3"];
            var row2 = ["4","5","6"];
            var row3 = ["7","8","9"];
            var row4 = ["Del","0","OK"];

            if (min == undefined){
                min = 0
            }
            if (max == undefined){
                max = (new Date()).getFullYear();
            }

            var cl = document.createElement("div");
            cl.className = "button_red cancel";
            cl.innerHTML = "Cancel";
            cl.onclick = function(){

                jQ("#shield, #popup").css("display", "none");
            }
            jQ(cl).css({
                "float" : "left",
                "margin-top" : "170px",
                "margin-left" : "10px"
            });
            var holder = document.createElement("div");
            holder.innerHTML = "<table style='width: 100%;'><tr><td id = 'left' style='width: 35%;'></td><td id='right' style='width: 65%;' rowspan='2'></td></tr>" +
            "<tr><td id = 'bcancel'></td></tr></table>"
            jQ(holder).css({
                "width":"100%",
                "border" : "hidden"
            });
            
            var tbl = document.createElement("table");
            tbl.className = "keyBoardTable";
            tbl.cellSpacing = 0;
            tbl.cellPadding = 3;
            tbl.id = "tblKeyboard";
            tbl.style.minWidth = 0.20 * screen.width + "px";
            jQ(tbl).css({
                "border-left" : "1.5px dotted black"
            });
            tbl.style.margin = "auto";

            var tr1 = document.createElement("tr");

            for(var i = 0; i < row1.length; i++){
                var td1 = document.createElement("td");
                td1.align = "center";
                td1.vAlign = "middle";
                td1.style.cursor = "pointer";
                td1.bgColor = "#ffffff";
                td1.width = "30px";

                tr1.appendChild(td1);

                var btn = document.createElement("div");
                btn.className = "button_blue keyboard_button";
                btn.innerHTML = "<span>" + row1[i] + "</span>";
                btn.onmousedown = function(){
                    if(!this.innerHTML.match(/^__$/)){
                        
                        global_control += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
                        if (global_control != undefined && parseInt(global_control) <= max && parseInt(global_control) >= min){
                            __$("input").innerHTML =  global_control;
                        }else if (global_control != undefined && parseInt(global_control) > max || parseInt(global_control) < min){

                            var str = global_control.length > cn ? (global_control.substring(0, cn - 2) + "..." + global_control.substring(global_control.length - 2, global_control.length)) : (global_control)
                            __$("input").innerHTML =  str + "<div style='color: red; font-size: 24px; padding-top: 0px;'><br />" + " Out of range</div>";
                        }
                    }
                }
                td1.appendChild(btn);

            }

            tbl.appendChild(tr1);

            var tr2 = document.createElement("tr");

            for(var i = 0; i < row2.length; i++){
                var td2 = document.createElement("td");
                td2.align = "center";
                td2.vAlign = "middle";
                td2.style.cursor = "pointer";
                td2.bgColor = "#ffffff";
                td2.width = "30px";

                tr2.appendChild(td2);

                var btn = document.createElement("div");
                btn.className = "button_blue keyboard_button";
                btn.innerHTML = "<span>" + row2[i] + "</span>";
                btn.onmousedown = function(){
                    if(!this.innerHTML.match(/^$/)){
                        
                        global_control += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
                        global_control = global_control.replace(/^0+/, "")
                        if (global_control != undefined && parseInt(global_control) <= max && parseInt(global_control) >= min){
                            __$("input").innerHTML =  global_control;
                        }else if (global_control != undefined && parseInt(global_control) > max || parseInt(global_control) < min){

                            var str = global_control.length > cn ? (global_control.substring(0, cn - 2) + "..." + global_control.substring(global_control.length - 2, global_control.length)) : (global_control)
                            __$("input").innerHTML =  str + "<div style='color: red; font-size: 24px; padding-top: 0px;'><br />" + " Out of range</div>";
                        }
                    }
                }

                td2.appendChild(btn);

            }

            tbl.appendChild(tr2);

            var tr3 = document.createElement("tr");

            for(var i = 0; i < row3.length; i++){
                var td3 = document.createElement("td");
                td3.align = "center";
                td3.vAlign = "middle";
                td3.style.cursor = "pointer";
                td3.bgColor = "#ffffff";
                td3.width = "30px";

                tr3.appendChild(td3);

                var btn = document.createElement("div");
                btn.className = "button_blue keyboard_button";
                btn.innerHTML = "<span>" + row3[i] + "</span>";
                btn.onmousedown = function(){
                    if(!this.innerHTML.match(/^__$/)){
                        
                        global_control += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
                        global_control = global_control.replace(/^0+/, "")
                        if (global_control != undefined && parseInt(global_control) <= max && parseInt(global_control) >= min){
                            __$("input").innerHTML =  global_control;
                        }else if (global_control != undefined && parseInt(global_control) > max || parseInt(global_control) < min){

                            var str = global_control.length > cn ? (global_control.substring(0, cn - 2) + "..." + global_control.substring(global_control.length - 2, global_control.length)) : (global_control)
                            __$("input").innerHTML =  str + "<div style='color: red; font-size: 24px; padding-top: 0px;'><br />" + " Out of range</div>";
                        }
                    }
                }

                td3.appendChild(btn);

            }

            tbl.appendChild(tr3);

            var tr4 = document.createElement("tr");

            for(var i = 0; i < row4.length; i++){
                var td4 = document.createElement("td");
                td4.align = "center";
                td4.vAlign = "middle";
                td4.style.cursor = "pointer";
                td4.bgColor = "#ffffff";
                td4.width = "30px";

                tr4.appendChild(td4);

                var btn = document.createElement("div");
                btn.innerHTML = "<span>" + row4[i] + "</span>";
                if (i == 1){
                    btn.className = "button_blue keyboard_button";
                }else if (i == 0){
                    btn.className = "button_red keyboard_button";
                }else if (i == 2){
                    btn.className = "button_green keyboard_button";
                }
                btn.onmousedown = function(){
                    if(this.innerHTML.match(/<span>(.+)<\/span>/)[1] == "Del"){

                        if (global_control.length == 1){
                            global_control = ""
                            __$("input").innerHTML = ""
                        }else{
                            global_control = global_control.substring(0,global_control.length - 1);
                            global_control = global_control.replace(/^0+/, "")
                            if (global_control != undefined && parseInt(global_control) <= max && parseInt(global_control) >= min){
                                __$("input").innerHTML =  global_control;
                            }else if (global_control != undefined && parseInt(global_control) > max || parseInt(global_control) < min){

                                var str = global_control.length > cn ? (global_control.substring(0, cn - 2) + "..." + global_control.substring(global_control.length - 2, global_control.length)) : (global_control)
                                __$("input").innerHTML =  str + "<div style='color: red; font-size: 24px; padding-top: 0px;'><br />" + " Out of range</div>";
                            }
                        }
                    }
                    else if(this.innerHTML.match(/OK/)){

                        
                        if (global_control != undefined && parseInt(global_control) > max || parseInt(global_control) < min){

                            showMessage("Value out of bound (" + min + " - " + max + ")", false, false);
                        }else if (global_control == ""){
                            showMessage("Please select a value!", false, false);
                        }else{
                            
                            var row = __$(__$("popup").getAttribute("row_id"));

                            if (row){
                                var button = row.getElementsByClassName("input-button")[0];
                                var display = row.getElementsByClassName("display-space")[0];
                                var label = row.getElementsByClassName("detail-row-label")[0];
                                var n = __$("popup").getAttribute("n-tuple");
                                var p = __$("popup").getAttribute("p-tuple");
                                var a = __$("popup").getAttribute("a-tuple");
                                
                                display.innerHTML = global_control;
                                // button.setAttribute("value", global_control);

                                if(a != undefined && $$[a] != undefined){

                                    $$[a][label.innerHTML] = global_control;
                                   
                                }else{
                                 
                                    if ($[p][n] == undefined){
                                        $[p][n] = {};
                                    }

                                    $[p][n][label.innerHTML] = global_control;
                                }
                                
                                __$("input").innerHTML = "";
                                __$("tblKeyboard").parentNode.removeChild(__$("tblKeyboard"));
                                __$("input").parentNode.removeChild(__$("input"));
                               
                            }else{
                                showMessage("Failed to update input!");
                            }
                            jQ("#shield, #popup").css("display", "none");
                        }
                       
                    }else if(!this.innerHTML.match(/^$/)){
                        
                        global_control += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
                        global_control = global_control.replace(/^0+/, "")
                        if (global_control != undefined && parseInt(global_control) <= max && parseInt(global_control) >= min){
                            __$("input").innerHTML =  global_control;
                        }else if (global_control != undefined && parseInt(global_control) > max || parseInt(global_control) < min){

                            var str = global_control.length > cn ? (global_control.substring(0, cn - 2) + "..." + global_control.substring(global_control.length - 2, global_control.length)) : (global_control)
                            __$("input").innerHTML =  str + "<div style='color: red; font-size: 24px; padding-top: 0px;'><br />" + " Out of range</div>";
                        }
                    }
                }

                td4.appendChild(btn);

            }

            tbl.appendChild(tr4);

            var input = document.createElement("div");
            input.id = "input";
            input.innerHTML = "";
            jQ(input).css({
                "font-size" : "28px",
                "font-style" : "italic",
                "float" : "left",
                "height" : "50px",
                overflow: "hide",
                "padding-top" : "13%",
                "padding-left" : "2%"
            })
            __$(id).appendChild(holder);
            __$("left").appendChild(input);
            __$("right").appendChild(tbl);
            __$("bcancel").appendChild(cl);
            __$("popup-header").innerHTML = current_popup;
           
            __$("input").style.minWidth = (parseInt(__$("popup").style.minWidth.replace("px", "")) - parseInt(__$("tblKeyboard").style.minWidth.replace("px", ""))) + "px";
            jQ("#shield, #popup").css("display", "block");
        }

        function showList(id, data){

            if (data.length > 1){

                var ul = document.createElement("ul");
                ul.style.width = __$("popup").style.width;
                ul.id = "listing";
                ul.className = "listing";

                var row = __$(__$("popup").getAttribute("row_id"));
                var button = row.getElementsByClassName("input-button")[0];

                var value = "?";
                if (button != undefined && button.getAttribute("value") != null){
                    value = button.getAttribute("value");
                }
                var color = "";
                for (var i in data){
                    if (data[i] != "list"){
                        var li = document.createElement("li");
                        li.innerHTML = data[i]
                        li.setAttribute("class", "select-li")

                        if (value.trim() == li.innerHTML){
                            li.style.backgroundColor = "lightblue";
                            color = "button_blue keyboard_button ok";
                        }else{
                            li.style.backgroundColor = (i % 2 != 0 ? "#f8f7ec" : "#fff");
                        }
                        li.onclick = function(){
                            
                            var nodes = document.getElementsByClassName("select-li")
                            for (var k=0; k < nodes.length; k ++){
                                nodes[k].style.backgroundColor = (k % 2 != 0 ? "#f8f7ec" : "#fff");
                            }
                            this.style.backgroundColor = "lightblue";
                            __$("ok").setAttribute("class", "button_blue keyboard_button ok");
                            __$("ok").setAttribute("value", this.innerHTML)
                        };
                        ul.appendChild(li);
                    }
                }
                __$(id).appendChild(ul);

                var footer = document.createElement("div");
                footer.id = "footer";
                footer.setAttribute("class", "footer")
                footer.innerHTML = "<table style='width: 100%;'><tr><td><div class='button_red keyboard_button cancel' id = 'cancel'>Cancel</div></td> <td><div class='button_gray keyboard_button ok' id = 'ok'>OK</div></td></tr></table>";
                footer.style.width = "100%";
                footer.style.marginBottom = "10px";
                __$(id).appendChild(footer);
                if (color != ""){
                    __$("ok").setAttribute("class", color + " nosave");
                }
                __$("ok").onclick = function(){

                    var value = this.getAttribute("value");

                    var row = __$(__$("popup").getAttribute("row_id"));
                    var n = __$("popup").getAttribute("n-tuple");
                    var p = __$("popup").getAttribute("p-tuple");
                    var a = __$("popup").getAttribute("a-tuple");
                    var label = row.getElementsByClassName("detail-row-label")[0];
                   
                    if (value != undefined && value.length > 0 || ($[p][n] != undefined && $[p][n][label.innerHTML] != undefined)){
                                              
                        if (row){
                            
                            if(__$("ok").className.match(/button\_blue/) && !__$("ok").className.match(/nosave/)){

                                var button = row.getElementsByClassName("input-button")[0];
                                var display = row.getElementsByClassName("display-space")[0];
                                var label = row.getElementsByClassName("detail-row-label")[0];
                                
                                if(a != undefined && $$[a] != undefined){

                                    display.innerHTML = value;
                                    //button.setAttribute("value", value);
                                    $$[a][label.innerHTML] = value;
                                  
                                }else{
                                    display.innerHTML =  value;
                                    //button.setAttribute("value", value);
                                    if ($[p][n] == undefined){
                                        $[p][n] = {};
                                    }
                                    $[p][n][label.innerHTML] = value;
                                
                                    //Validate grayed input buttons
                                    var ni = fields.indexOf("Condition at birth");
                                    var pi = __$("popup").getAttribute("row_id").trim().match(/\d+$/)[0];
                                    /////
                                    if (parseInt(ni) == parseInt(pi)){

                                        var leng = fields.length;
                                        for( var m = (parseInt(pi) + 1); m < leng; m ++){
                                            
                                            var baby_rows = jQ("[id^=" + p + "_" + n + "]"); //matches only single baby rows
                                            
                                            var but = baby_rows[m].childNodes[2].childNodes[0];
                                            var displaybut = baby_rows[m].childNodes[1].childNodes[0];
                                      
                                            if (display.innerHTML.match(/still birth/i)){
                                                if(!but.className.match(/gray/)){
                                                   
                                                    but.className += " button_gray";
                                                    displaybut.innerHTML = "?";
                                                    but.removeAttribute("value");
                                                
                                                    but.onclick = function(){

                                                        showMessage("Baby was born dead")
                                                    }
                                                    $[p][n][but.parentNode.parentNode.childNodes[0].innerHTML.trim()] = but.innerHTML
                                                }
                                            }else if (display.innerHTML.match(/Alive/i)){
                                                if(but.className.match(/gray/)){
                                                    but.className = but.className.replace(/button\_gray/, "").trim();
                                                    but.onclick = function(){

                                                        enterData(this.parentNode.parentNode)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }else{
                            showMessage("Failed to update input");
                        }
                        jQ("#shield, #popup").css("display", "none");
                    }else{
                        showMessage("Please select a value");
                    }
                }

                __$("cancel").onclick = function(){

                    jQ("#shield, #popup").css("display", "none");
                }

                __$("popup-header").innerHTML = current_popup.replace("Alive Now", "Alive Now?");
                jQ("#shield, #popup").css("display", "block");
            }
        }

        function enterData(row){

            if (row != undefined){
 
                var fields = {
                    "Year of birth" : ["number", min_birth_year, abs_max_birth_year] ,
                    "Place of birth" : ["list", "Health facility", "In transit", "TBA", "Home"],
                    "Gestation (months)" : ["number", 5, 10],
                    "Method of delivery" : ["list", "Spontaneous vaginal delivery", "Caesarean Section", "Vacuum Extraction Delivery", "Breech"],
                    "Condition at birth" : ["list", "Alive", "Still Birth"],
                    "Birth weight" : ["list", "Big Baby (Above 4kg)", "Average", "Small Baby (Less than 2.5kg)"],
                    "Alive Now" : ["list", "Yes", "No"]
                };

                var field_names = Object.keys(fields);
                var pos = row.getAttribute("pos");

                var type = fields[field_names[pos]][0]
                current_popup = field_names[pos];
               
                loadPopup(row);
                if (type == "number"){

                    if (row.childNodes[0].innerHTML.match(/Year of birth/i)){
                        var min = validateMin(row, fields[field_names[pos]][1]);
                        var max = validateMax(row, fields[field_names[pos]][2]);
                    }else if(row.childNodes[0].innerHTML.match(/Gestation/i)){
                        var min = validateGestation(row, fields[field_names[pos]][1]);
                        var max = validateGestation(row, fields[field_names[pos]][2]);
                    }else{
                        var min = fields[field_names[pos]][1];
                        var max = fields[field_names[pos]][2];
                    }
                    
                    showNumber("popup", row.id, min, max);
                }else if (type == "list"){
                    var listItems = fields[field_names[pos]];
                    showList("popup", listItems);
                }
            }
        }

        function validateGestation(r, v){

            global_value = v;
            var p = parseInt(r.id.match(/^\d+/)[0]);
            var n = parseInt(r.getAttribute("n-tuple"))
            var label = r.childNodes[0].innerHTML;

            if (parseInt($[p]["count"]) > 1){
                for (var i = 1; i <= parseInt($[p]["count"]); i ++){
                    if (i != n &&  $[p][i] != undefined && $[p][i][label] != undefined){
                        global_value = $[p][i][label];
                        break;
                    }
                }
            }
            
            return global_value;
        }
        
        function validateMin(r, v, p, label){

            global_value = "";
            skipNext = false;
            
            if (r != undefined){
                var p = parseInt(r.id.match(/^\d+/)[0]);
                var n = parseInt(r.getAttribute("n-tuple"))
                var label = r.childNodes[0].innerHTML;

                if (n >= 1 && parseInt($[p]["count"]) > 1){

                    var firstY = $[p][1] !=  undefined ? $[p][1][label] : undefined;

                    if (firstY == undefined && parseInt($[p]["count"]) > n && 2 < n){
                        firstY = $[p][2] !=  undefined ? $[p][2][label] : undefined;
                    }

                    if (firstY == undefined && parseInt($[p]["count"]) > n && 3 < n){
                        firstY = $[p][3] !=  undefined ? $[p][3][label] : undefined;
                    }

                    if (firstY == undefined && parseInt($[p]["count"]) > n && 4 < n){
                        firstY = $[p][4] !=  undefined ? $[p][4][label] : undefined;
                    }

                    if (firstY != undefined && parseInt(firstY) > 1950){
                        global_value = parseInt(firstY);
                        skipNext = true;
                    }else{

                        var lastY = undefined;
                        if (lastY == undefined && (n + 4) <= parseInt($[p]["count"])){
                            lastY = $[p][n+4] !=  undefined ? $[p][n+4][label] : undefined;
                        }

                        if (lastY == undefined && (n + 3) <= parseInt($[p]["count"])){
                            lastY = $[p][n+3] !=  undefined ? $[p][n+3][label] : undefined;
                        }

                        if (lastY == undefined && (n + 2) <= parseInt($[p]["count"])){
                            lastY = $[p][n+2] !=  undefined ? $[p][n+2][label] : undefined;
                        }

                        if (lastY == undefined && (n + 1) <= parseInt($[p]["count"])){
                            lastY = $[p][n+1] !=  undefined ? $[p][n+1][label] : undefined;
                        }                                             

                        if (lastY != undefined && parseInt(lastY) > 1950){
                            global_value = parseInt(lastY) - 1;
                            skipNext = true;
                        }
                    }

                }
            }
            
            if (!skipNext && $[p - 1] != undefined){
                
                var maxN = parseInt($[p - 1]["count"]);
                
                if (maxN > 0){
                                      
                    var value = undefined;
                    if ($[p - 1][maxN] != undefined){

                        for(var i = 1; i <= maxN; i ++){
                            if ($[p - 1][i][label] != undefined)
                                value = parseInt($[p - 1][i][label]);
                        }
                    }
                  
                    if (value != undefined && value.toString().match(/^\d+/) && parseInt(v) < parseInt(value)){
                       
                        global_value = value
                        
                    }else if (value == undefined){

                        if (p > 1)
                            validateMin(undefined, v, (p - 1), label)
                    }
                }
            }

            return (global_value == "") ? v : global_value;
        }

        function validateMax(r, v, p, label){

            global_value = "";
            skipNext = false;
                       
            if (r != undefined){
                var p = parseInt(r.id.match(/^\d+/)[0]);
                var n = parseInt(r.getAttribute("n-tuple"))
                var label = r.childNodes[0].innerHTML;

                if (n >= 1 && parseInt($[p]["count"]) > 1){

                    var firstY = $[p][1] !=  undefined ? $[p][1][label] : undefined;

                    if (firstY == undefined && parseInt($[p]["count"]) > n && 2 < n){
                        firstY = $[p][2] !=  undefined ? $[p][2][label] : undefined;
                    }

                    if (firstY == undefined && parseInt($[p]["count"]) > n && 3 < n){
                        firstY = $[p][3] !=  undefined ? $[p][3][label] : undefined;
                    }

                    if (firstY == undefined && parseInt($[p]["count"]) > n && 4 < n){
                        firstY = $[p][4] !=  undefined ? $[p][4][label] : undefined;
                    }
                    
                    if (firstY != undefined && parseInt(firstY) > 1950){
                        global_value = parseInt(firstY) + 1;
                        skipNext = true;
                    }else{

                        var lastY = $[p][n + 1] !=  undefined ? $[p][n + 1][label] : undefined;
                        
                        if (lastY == undefined && (n + 2) <= parseInt($[p]["count"])){
                            lastY = $[p][n+2] !=  undefined ? $[p][n+2][label] : undefined;
                        }

                        if (lastY == undefined && (n + 3) <= parseInt($[p]["count"])){
                            lastY = $[p][n+3] !=  undefined ? $[p][n+3][label] : undefined;
                        }

                        if (lastY == undefined && (n + 4) <= parseInt($[p]["count"])){
                            lastY = $[p][n+4] !=  undefined ? $[p][n+4][label] : undefined;
                        }

                        if (lastY != undefined && parseInt(lastY) > 1950){
                            global_value = parseInt(lastY);
                            skipNext = true;
                        }
                    }

                }
            }

            if (!skipNext && $[p + 1] != undefined){

                var maxN = parseInt($[p + 1]["count"]);

                if (maxN > 0){

                    var value = undefined;
                    if ($[p + 1][maxN] != undefined){

                        for(var i = maxN; i > 0 ; i --){
                            if ($[p + 1][i][label] != undefined)
                                value = parseInt($[p + 1][i][label]);
                        }
                    }

                    if (value != undefined && value.toString().match(/^\d+/) && parseInt(v) > parseInt(value)){

                        global_value = value;

                    }else if (value == undefined){
                        
                        validateMax(undefined, v, (p + 1), label)
                    }
                }
            }

            return (global_value == "") ? v : global_value;
        }


        function enterAbortionData(row){

            if (row != undefined){

                var fields = {
                    "Year of abortion" : ["number", min_birth_year, abs_max_birth_year] ,
                    "Place of abortion" : ["list", "Health facility", "In transit", "TBA", "Home", "Other"],
                    "Type of abortion" : ["list", "Complete abortion", "Incomplete abortion"],
                    "Procedure done" : ["list", "Manual Vacuum Aspiration (MVA)", "Evacuation"],
                    "Gestation (months)" : ["number", 0, 7]
                   
                };

                var field_names = Object.keys(fields);
                var pos = row.getAttribute("pos");

                var type = fields[field_names[pos]][0];
                current_popup = field_names[pos];

                loadPopup(row);
                if (type == "number"){
                    showNumber("popup", row.id, fields[field_names[pos]][1], fields[field_names[pos]][2]);
                }else if (type == "list"){
                    var listItems = fields[field_names[pos]];
                    showList("popup", listItems);
                }
            }
        }

        return{
            load: load()
        };

    })(jQuery, data);

    myModule.load();
}

function buildParams(){
    var keys = Object.keys(data)
    for (var i = 0; i < keys.length; i ++){
        
        var count = data[keys[i]]["count"];
        for (var c = 1; c <= count; c ++){
            
            if (data[keys[i]]== undefined)
                data[keys[i]] = {};
            if (data[keys[i]][c] == undefined)
                data[keys[i]][c] = {};
        }
    }

    var abortions = parseInt(__$("enter_number_of_abortions").value);

    if(abortions > 0){

        for (var i = 1; i <= abortions; i ++){
            if ($$[i] == undefined)
                $$[i] = {};
        }
    }

    // update various fields
    __$("data_obj").value = JSON.stringify(data);

    __$("abortion_obj").value = JSON.stringify($$);

    var str = __$("data_obj").value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s+]/g, ' ')
    
    if (str.match(/caesarean section/i)){
        __$("ever_had_c_sections").value = "Yes";
    }else{
        __$("ever_had_c_sections").value = "No";
    }

    if (str.match(/vacuum extraction delivery/i)){
        __$("ever_had_a_vacuum_extraction").value = "Yes";
    }else{
        __$("ever_had_a_vacuum_extraction").value = "No";
    }

    if (str.match(/still birth/i)){
        __$("ever_had_still_births").value = "Yes";
    }else{
        __$("ever_had_still_births").value = "No";
    }
}

function loadSplitSelections(arr){
    //array format [url, input_id, helpText]
    var arr = [["/encounters/yes_no_options", "ever_had_symphysiotomy"],
    ["/encounters/hemorrhage_options", "hemorrhage"],
    ["/encounters/yes_no_options", "pre_eclampsia"],
    ["/encounters/yes_no_options", "eclampsia"]
    ];

    var count = arr.length;
    var n = Math.floor(Math.sqrt(count));
    var v_count = Math.ceil(count/n);
    var h_count = Math.ceil(count/n);
    var e_count = count % n;

    __$("keyboard").style.display = "none";
    __$("touchscreenInput" + tstCurrentPage).style.display = "none";
    __$("inputFrame" + tstCurrentPage).style.height = (0.72 * screen.height) + "px";
    __$("inputFrame" + tstCurrentPage).style.marginTop = (0.05 * screen.height) + "px";
    //__$("inputFrame" + tstCurrentPage).style.background = "lightblue";

    if (count > 0){

        var n = 0;
        var holder = document.createElement("div");
        holder.id = 'holder';
        holder.style.height =  (0.72 * screen.height) + "px";
        holder.style.width = "100%";
        holder.style.display = "none";
        holder.setAttribute("class", "options");
        holder.style.borderRadius = "5px";
        holder.style.background = "white";
        __$("inputFrame" + tstCurrentPage).appendChild(holder);

        for (var r = 1; r <= v_count; r ++){

            var row = document.createElement("div");
            row.id = r;
            row.style.display = "table-row";
            row.setAttribute("class", "row");
            holder.appendChild(row);

            for(var c = 1; c <= h_count; c ++){

                var cell = document.createElement("div");
                cell.id = r + "_" + c;
                cell.style.display = "table-cell";
                cell.setAttribute("class", "cell");
                cell.style.background = "white";

                var helpText = __$(arr[n][1]).getAttribute("helpText");
                var heada = document.createElement("div");
                heada.style.height = "40px";
                heada.innerHTML = helpText;
                heada.style.marginTop = "5px";
                heada.style.background = "#CFE4CD";
                heada.style.borderRadius = "3px";
                heada.style.border = "2px gray solid";
                heada.style.fontSize = "28px";
                heada.style.marginLeft = "5px";
                heada.style.marginRight = "5px";
                cell.appendChild(heada);

                if(c != 1){
                    cell.style.borderLeft = "1px solid";
                }

                if(r != 1){
                    cell.style.borderTop = "1px solid";
                }

                cell.style.height = ((72/v_count) - 2) * 0.001 * screen.height + "px";
                cell.style.width = ((100/h_count)) + "%";
                row.appendChild(cell);

                n ++;
                if (n != arr.length - 1){

                    ajaxCustomRequest(arr[n - 1][0], arr[n - 1][1], "", (r + "_" + c));
                }else{

                    ajaxCustomRequest(arr[n - 1][0], arr[n - 1][1], "table", (r + "_" + c));
                }

            }
        }

        __$("2_2").style.display = "none";
        __$("1_2").style.borderBottom = "1px solid";
        __$("2_1").style.borderRight = "1px solid";

    }
}

function ajaxCustomRequest(aUrl, id, n, dom_id) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        handleCustomResult(httpRequest, id, n, dom_id);
    };
    try {
        httpRequest.open('GET', aUrl, true);
        httpRequest.send(null);
    } catch(e){
    }
}

function handleCustomResult(aXMLHttpRequest, id, n, dom_id) {

    if (!aXMLHttpRequest) return;

    if (aXMLHttpRequest.readyState == 4 && (aXMLHttpRequest.status == 200 ||
        aXMLHttpRequest.status == 304)) {

        var result = aXMLHttpRequest.responseText;

        var data = result.split("|");

        var ul = document.createElement("ul");
        ul.style.paddingLeft = "5px";
        ul.style.paddingRight = "5px";

        for(var i = 0; i < data.length; i ++){

            var li = document.createElement("li")
            li.setAttribute("class", "cell-data");
            li.setAttribute("target", id);
            li.value = data[i];
            li.setAttribute("value", data[i]);
            li.innerHTML = data[i];
            li.onmousedown = function(){

                __$(this.getAttribute("target")).value = this.getAttribute("value");

                if (this.getAttribute("target") == 'pre_eclampsia' && this.innerHTML.match(/Yes/i)){

                    __$("2_2").style.display = "table-cell";
                    __$("2_2").style.opacity = 1
                    __$("1_2").style.borderBottom = "hidden";
                    __$("2_1").style.borderRight = "hidden";
                } else if (this.getAttribute("target") == 'pre_eclampsia' && this.innerHTML.match(/No/i)){

                    __$("eclampsia").value = ""

                    __$("1_2").style.borderBottom = "1px solid";
                    __$("2_1").style.borderRight = "1px solid";

                    hideMsg("2_2");
                }

                updateTouchscreenInput(this);
            }

            if(i % 2 == 0){

                li.className = "even";
                li.setAttribute("group", "even");

            } else {

                li.className = "odd";
                li.setAttribute("group", "odd");
            }

            ul.appendChild(li);
        }

        __$(dom_id).appendChild(ul);

        if (n == "table")
            setTimeout(function(){
                __$('holder').style.display = n;
            }, 150);

    }
}

function fade(div, opacity){

    __$(div).style.opacity = opacity;
    if (opacity >= 0){
        opacity = opacity - 0.01;
        setTimeout(function(){
            fade(div, opacity)
        }, 1)
    }
    else{
        __$(div).style.display = "none";
    }
}

function fadeOut(div, opacity){

    __$(div).style.opacity = opacity;
    if (opacity <= 1){
        opacity = opacity + 0.01;
        setTimeout(function(){
            fade(div, opacity)
        }, 5)
    }
}
function hideMsg(div){
    __$(div).style.display = "none"
}

function showMsg(div){
    setTimeout(function(){
        fadeOut(div, 0);
    }, 1);
}

function addValidationInterval(){

    var interval = setInterval(function(){
        var arr = ["ever_had_symphysiotomy", "hemorrhage", "pre_eclampsia"];

        if (__$("2_2").style.display != "none"){
            arr.push("eclampsia");
        }

        var check = 0
        for (var i = 0; i < arr.length; i ++){

            var node = __$(arr[i]);
            if (node != undefined && node.value == ""){
                check = check + 1;
            }
        }

        if (check > 0){
            __$("nextButton").onmousedown = function(){
                showMessage("Select all fields to proceed");
            }
        }else{
            __$("nextButton").onmousedown = function(){
                gotoNextPage();
            }
        }
    }, 100);
    return interval;
}