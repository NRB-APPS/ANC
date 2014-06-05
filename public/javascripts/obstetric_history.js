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

    setTimeout(function(){ readableMessage()}, 50);
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
    setTimeout(function(){ readableMessage()}, 50);
  }

  function updateMultiplePregnancy(){

    if (max_delivered == 2){
      __$("multiple_pregnancy").value = "Twins"
    }else if(max_delivered == 3){
      __$("multiple_pregnancy").value = "Triplets"
    }else if(max_delivered == 4){
      __$("multiple_pregnancy").value = "Quadruplet"
    }else if(max_delivered == 1){
      __$("multiple_pregnancy").value = "No"
    }

  }

  function updateParity(num){
    par = 0;
    for (i = 1; i <= num; i ++){
      try{
        if (parseInt(__$('gestation_type' + i).value) > 0){
          par = par + parseInt(__$("gestation_type" + i).value);
        }
      }catch(ex){
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

        cell2.innerHTML = "<table class='button-table'><tr><td><button class = 'minus' onmousedown = 'decrement(" +p+")'></button> </td> <td><input id = 'input_"+
          p +"'  value = '1' class = 'label' id = 'label"+ p + "' >  </input> </td><td> <button class = 'plus' onmousedown = 'increment("+ p +")'></button></td></tr></table>"
        row.appendChild(cell2);

        var cell3 =  document.createElement("div");
        cell3.id = "cell_" + p + "_3";
        cell3.setAttribute("class", "data-cell-img");
        cell3.innerHTML = '<img id = "img_' + p +'" onclick = "checkSelection(' + p + ')" src="/images/unticked.jpg" height="45" width="45"> ';
        row.appendChild(cell3);

        data[p] = {};
        data[p]["condition"] = false;
        data[p]["count"] = 1;
        table.appendChild(row);

      }

      var width  = __$("row_1").offsetWidth + "px";
      headerHolder.style.width = width;
      header.style.width = width;
      updateInput(1, false);
    }
  }

  function increment(pos){

    var i = parseInt( __$("input_" + pos).value);
    if (i <= 7){

      __$("input_" + pos).value = parseInt( __$("input_" + pos).value) + 1;
      updateInput(pos);
    }else{

      __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.background = "url('/images/up_arrow_gray.png')";
      __$("input_" + pos).parentNode.parentNode.children[2].childNodes[1].style.backgroundRepeat = "no-repeat";
    }

    if (i + 1 == 8){

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

    if (i - 1 < 8){
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

        __$("inputFrame" + tstCurrentPage).style.height = 0.741 * screen.height + "px";
        __$("inputFrame" + tstCurrentPage).style.marginTop = 0.05 * screen.height + "px";
        __$("inputFrame" + tstCurrentPage).style.background = "white";

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
        t1.style.width = "30%";
        t1.setAttribute("class", "h-cell");
        header.appendChild(t1);

        var t2 = document.createElement("div");
        t2.innerHTML = "Details";
        t2.style.width = "70%";
        t2.setAttribute("class", "h-cell");
        header.appendChild(t2);

        __$("inputFrame" + tstCurrentPage).appendChild(headerHolder);
        __$("inputFrame" + tstCurrentPage).style.zIndex = 5

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
        pcell.style.width = "30%";
        pcell.style.overflow = "hidden";
        pregRow.appendChild(pcell);

        var dcell = document.createElement("div");
        dcell.innerHTML = "<div id = 'dcell' style='width: 100%; overflow: auto;'><table style='width: 100%;' id = 'details'></table></div>";
        dcell.style.display = "table-cell";
        dcell.style.width = "70%";
        dcell.style.borderLeft = "1px black solid";
        dcell.style.overflow = "hidden";
        pregRow.appendChild(dcell);

        __$("inputFrame" + tstCurrentPage).appendChild(container);

        var popup = document.createElement("div");
        popup.id = "popup";
        jQ(popup).css({
          position : "absolute",
          display : "none",
          "min-width" : 0.35 * screen.width + "px",
          "min-height" : 0.45 * screen.height + "px",
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
        popupHeader.innerHTML = "Enter a value"
        jQ(popupHeader).css({
          "max-width" : 0.35 * screen.width + "px",
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
        shield.style.opacity = "0.5";
        shield.style.zIndex = 90;

        __$("inputFrame" + tstCurrentPage).appendChild(shield);

        popup.appendChild(popupHeader);

        __$("inputFrame" + tstCurrentPage).appendChild(popup);

        var table = document.createElement("div");
        table.style.display = "table";

        container.appendChild(pTable);
        jQ("#dcell").css("height", (0.625 * screen.height + "px"));
        jQ("#pcell").css("height", (0.64 * screen.height + "px"));
        c = 0;

        for (var pos in $){
          loadPregnancy(pos);
        }

        var width  = (__$("details").parentNode.offsetWidth + __$("pregs").parentNode.offsetWidth - 2) + "px";
        headerHolder.style.width = width;
        header.style.width = width;
      }

      function loadPregnancy(n){

        var row1 = document.createElement("div");
        row1.id = "preg_row_" + n;
        row1.setAttribute("class", "preg-row");

        var d1 = document.createElement("div");
        d1.id = n;
        d1.innerHTML = "<img height='46' class = 'img-preg-cell' src='/touchscreentoolkit/lib/images/unchecked.jpg'>" +
          n + (n == 1 ? "<sup>st</sup>" : ((n == 2 ? "<sup>nd</sup>" : (n == 3 ? "<sup>rd</sup>" : "<sup>th</sup>"))));
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
                  image.src = '/touchscreentoolkit/lib/images/unchecked.jpg'
                }
              }
            }

            var img = this.getElementsByTagName("img")[0];
            if (img.src.match("unchecked")){
              img.src = '/touchscreentoolkit/lib/images/checked.jpg'
            }
            this.setAttribute("selected", "true");
            populate(this.id)
          }
        }


        row1.appendChild(d1);

        if (c == 0 && $[n]["condition"] == true){
          var img = d1.getElementsByTagName("img")[0];
          d1.setAttribute("selected", "true");
          img.src = '/touchscreentoolkit/lib/images/checked.jpg'
          populate(n);
          c += 1;
        }


        __$("pregs").appendChild(row1);
      }

      function populate(id){

        var table = __$("details");

        jQ(table).fadeOut(2);
        table.innerHTML = "";

        var fields = ["Year of birth", "Place of birth",
          "Gestation (months)", "Method of delivery",
          "Condition at birth", "Birth weight",
          "Alive Now"];

        for (var n = 1; n <= $[id]["count"]; n ++){

          for (var i = 0; i < fields.length; i ++){

            if ($[id]["count"] > 1 && i == 0){

              var rowd = document.createElement("div");
              rowd.setAttribute("class", "demarcation");

              var d= document.createElement("div");
              d.innerHTML = n + (n == 1 ? "<sup>st</sup>" : ((n == 2 ? "<sup>nd</sup>" : (n == 3 ? "<sup>rd</sup>" : "<sup>th</sup>")))) +
                " born in " +  id + (id == 1 ? "<sup>st</sup>" : ((id == 2 ? "<sup>nd</sup>" : (id == 3 ? "<sup>rd</sup>" : "<sup>th</sup>")))) + " pregnacy";
              d.setAttribute("class", "demarcation-td");
              rowd.appendChild(d);

              var d = document.createElement("div");
              d.innerHTML = "&nbsp";
              d.setAttribute("class", "demarcation-td");
              rowd.appendChild(d);
              table.appendChild(rowd);
            }

            var row = document.createElement("div");
            row.id = id + "|" + n + "_detail_row_" + i;
            row.setAttribute("n-tuple", n);
            row.setAttribute("p-tuple", id);
            row.setAttribute("class", "detail-row");

            var td1= document.createElement("div");
            td1.innerHTML = fields[i];
            td1.setAttribute("class", "detail-row-label");
            row.appendChild(td1);

            var td2 = document.createElement("div");
            td2.innerHTML = "<div class = 'input-button'> " + fields[i]+ "</div>";
            td2.setAttribute("class", "detail-row-input");
            row.appendChild(td2);

            var button = td2.getElementsByClassName("input-button")[0]

            if (button != undefined){
              button.onclick = function(){

                enterData(this.parentNode.parentNode)
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


      function showNumber(id, global_control){

        var row1 = ["1","2","3"];
        var row2 = ["4","5","6"];
        var row3 = ["7","8","9"];
        var row4 = ["C","0","OK"];

        var tbl = document.createElement("table");
        tbl.className = "keyBoardTable";
        tbl.cellSpacing = 0;
        tbl.cellPadding = 3;
        tbl.id = "tblKeyboard";
        jQ(tbl).css("float", "right");
        tbl.style.margin = "auto";

        var tr1 = document.createElement("tr");

        var td = document.createElement("td");
        td.rowSpan = "4";
        td.style.minWidth = "60px";
        td.style.textAlign = "center";
        td.style.verticalAlign = "top";

        tr1.appendChild(td);

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
          btn.onclick = function(){
            if(!this.innerHTML.match(/^__$/)){
              __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
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
          btn.onclick = function(){
            if(!this.innerHTML.match(/^$/)){
              __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
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
          btn.onclick = function(){
            if(!this.innerHTML.match(/^__$/)){
              __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
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
          btn.onclick = function(){
            if(this.innerHTML.match(/<span>(.+)<\/span>/)[1] == "C"){
              __$(global_control).value = __$(global_control).value.substring(0,__$(global_control).value.length - 1);
            }else if(this.innerHTML.match(/OK/)){

            }else if(!this.innerHTML.match(/^$/)){
              __$(global_control).value += this.innerHTML.match(/<span>(.+)<\/span>/)[1];
            }
          }

          td4.appendChild(btn);

        }

        tbl.appendChild(tr4);

        __$(id).appendChild(tbl);
        var inputBox = document.createElement("div");
      }

      function enterData(row){

        if (row != undefined){

          showNumber("popup", row.id)
          jQ("#shield, #popup").css("display", "block");
        }
      }

      return{
        load: load()
      };

    })(jQuery, data);

    myModule.load();
  }
