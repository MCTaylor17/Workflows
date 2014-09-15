$(function() {
  var Mustache = require('mustache');
 
  $.getJSON('js/data.json', function(data) {
    var template = $('#speakerstpl').html();
    var html = Mustache.to_html(template, data);
    $('#speakers').html(html);    
  }); //getJSON
  
}); //function
 
window.load(function(){
	
	$("img").hide();
});
// require jquery not used because it's declared in coffee