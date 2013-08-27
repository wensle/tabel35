function getFormula(grootheidSymbool){
	// var url = '/getFormula.php' + '?grootheidSymbool=' + grootheidSymbool;
	var data = {
		grootheidSymbool: grootheidSymbool
	};
	$.getJSON("getFormula.php", data, function(json){
		console.log("getFormula.php is gelukt!");
		var arrFormule = "";
			$.each(json.formules, function(index, value){
				arrFormule = value.formule.split(",");
				var arr = [], tony = "";
				$.each(arrFormule, function(index, value){
					if ($.inArray(value, arrGrootheidSybool) > -1){
						tony = "\\href{javascript:getFormula(\"\'" + value +"\'\")}" + "{" + value + "}";
						arr.push(tony);}
					else{
						arr.push(value);}
				});
				$( '<p>', {
				  html: '$$' + json.formules[1].symbool + '= ' + arr.join("") + '$$',
				  'class': 'formula'
				}).appendTo( "body" );
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			});
	})
	.fail(function() { console.log("FAIL: " + grootheidSymbool); })
};
$(document).ready(function() {
		$.getJSON('getArrayGrootheidSymbool.php', function(json){
			console.log("AJAX: functiesJSON.php is gelukt");
			window.arrGrootheidSybool = json;
		});
	(function() {
		getFormula("'t'");
	})();
	document.getElementById("testButton").onclick = function() {
		getFormula("'s'");
	};
});