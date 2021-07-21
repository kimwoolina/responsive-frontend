//show data
$("#exTab tr").click(function() {
  // Get the value when you click on the row of the table
  console.log("Row Click Event");
  var str1 = "";
  var str2 = "";
  var tdArr = new Array(); 

  // Row currently clicked (<tr>)
  var tr = $(this);
  var td = tr.children();

  // tr.text() takes all the values in the clicked row, or tr.
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

  hidden=$(this).attr('id');
  console.log("Value for the selected row -> ",hidden);

});