function getFormula(grootheidSymbool){
	// var url = '/getFormula.php' + '?grootheidSymbool=' + grootheidSymbool;
	var data = {
		grootheidSymbool: grootheidSymbool
	};
	$.getJSON("getFormula.php", data, function(json){
		console.log("getFormula.php is gelukt!");
		var arrFormulePieces = "";
			$.each(json.formules, function(indexFormule, klop){
				arrFormulePieces = klop.formule.split(",");
				var arr = [], elementID = "";
				$.each(arrFormulePieces, function(index, value){
					if ($.inArray(value, arrGrootheidSybool) > -1){
						elementID = "\\href{javascript:getFormula(\"\'" + value +"\'\")}" + "{" + value + "}";
						arr.push(elementID);}
					else if ($.inArray(value, arrGrootheidSybool) === -1){
						arr.push(value);
						json.formules[indexFormule].formule = arr.join("");
					}
					else{
						arr.push(value);}
				});
				// var pl = bla();
				// console.log(pl);
				$( '<p>', {
					html: '$$' + json.formules[1].symbool + '= ' + arr.join("") + '$$',
					'class': 'formula'
				}).appendTo( "body" );
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				console.log(json.formules[indexFormule].formule);
			});
			console.log(json.formules);
	})
	.fail(function() { console.log("FAIL: " + grootheidSymbool); });
}
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