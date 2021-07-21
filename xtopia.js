//Table

var id = 3;
var hidden = "";

function fn_trEvent(trObj) {
  // Get the value when you click on the row of the table
  var str1 = "";
  var str2 = "";
  var tdArr = new Array(); // sequence declaration

  // Row currently clicked (<tr>)
  var tr = $(trObj);
  var td = tr.children();
  console.log("row click td element -> ", td);

  console.log("All data in the clicked row : " + tr.text());

  td.each(function(i) {
    tdArr.push(td.eq(i).text());
  });

  console.log("Value in an array : " + tdArr);

  var title = td.eq(1).text();
  var content = td.eq(2).text();

  str1 += title;
  str2 += content;

  $("#exResult1").val(str1);
  $("#exResult2").val(str2);

  $("input:hidden[name=trNum]").val($(trObj).attr("id"));
  hidden = $(trObj).attr("id");
  console.log("Value for the selected row-> ", hidden);
}

//Drag to change the sort order
$(".row_drag").sortable({
  delay: 100,
  stop: function() {
    var selectedRow = new Array();
    $(".row_drag>tr").each(function() {
      selectedRow.push($(this).attr("id"));
    });
  }
});

//Add
$(document).on("click", "#addBtn", function() {
  var addTrText =
    '<tr name="exTr" id="' +
    id +
    '" onclick="javascript:fn_trEvent(this)">' +
    '<td><img src="./resource/img/order.png" style="width:15px;"/></td>' +
    '<td id="tab" name="tab">' +
    $("#exResult1").val() +
    "</td>" +
    '<td id="content" name="content">' +
    $("#exResult2").val() +
    "</td>" +
    '<td><btn class="btn" name="edit" type="submit"><img src="./resource/img/edit.png" style="width:20px;"/></btn><btn class="btn" id="delete" type="submit"><img src="./resource/img/delete.png" style="width:20px;"/></btn></td>' +
    "</tr>";
  $("#exTab > tbody:last").append(addTrText);
  
  
  console.log(id);
  addLi(id, $("#exResult1").val()); //Tab Initialization
  addDiv(id, $("#exResult2").val());
  id++;
  $("#exResult1").val("");
  $("#exResult2").val("");
});

//Delete
$(document).on("click", "#delete", function() {
  var trHtml = $(this)
    .parent()
    .parent();

  trHtml.remove(); //delete tr tag

  removeLi(hidden);
  removeDiv(hidden);

  id--;
  console.log(id);

  $("#exResult1").val("");
  $("#exResult2").val("");
});

//Edit
function edit_row() {
  var str1 = "";
  var str2 = "";
  console.log(id);
  var tab = document.getElementById("exResult1");
  var content = document.getElementById("exResult2");

  var selTr = $("#" + hidden).children();
  console.log("Row number -> ", hidden, "Selected row id -> ", selTr);

  str1=$("#exResult1").val();
  str2=$("#exResult2").val();

  selTr.eq(1).text(str1);
  selTr.eq(2).text(str2);

  modifyLi(hidden,str1);
  modifyDiv(hidden,str2);

  $("#exResult1").val(""); //Tab Initialization
  $("#exResult2").val("");
}

//Tab
$(".tabContent").hide();
$("ul.tabs li:first")
  .addClass("active")
  .show();
$(".tabContent:first").show();

function drawTab(num){
  console.log("num -> ",num);
  $(".liTab").parent("li").removeClass("active");
  $("#liTab" + num).parent("li").addClass("active");

  $(".tabContent").hide();
  var activeTab = $("#tab" + num);
  $(activeTab).fadeIn();
  return false;
}

//Sync
function addLi(num, data) {
  console.log("num -> ",num,", data -> ", data);
  var addTrText =
    '<li><a class="liTab" id="liTab'+num+'" href="#tab'+num+'" onclick="javascript:drawTab('+num+');">'+data+'</a></li>';
  $("#tabs").append(addTrText);
}

function addDiv(num, data) {
  var addTrText ='<div id="tab'+num+'" class="tabContent">'+data+'</div>';
  $("#tabContainer:last").append(addTrText);
  $("#tab"+num).hide();
}

function removeLi(num) {
  var activeTab = document.getElementById("liTab"+num);
  activeTab.remove();

}

function removeDiv(num) {
  var activeTab = document.getElementById("tab"+num);
  activeTab.remove();
}

function modifyLi(num,data){
  var activeTab = document.getElementById("liTab"+num);
  console.log(activeTab);
  console.log(activeTab.textContent);
  activeTab.textContent=data;
}

function modifyDiv(num,data){
  var activeTab = document.getElementById("tab"+num);
  activeTab.textContent=data;
}