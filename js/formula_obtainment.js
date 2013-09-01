function getFormula(grootheidSymbool){
	// var url = '/getFormula.php' + '?grootheidSymbool=' + grootheidSymbool;
	var data = {
		grootheidSymbool: grootheidSymbool
	};
	$.getJSON("getFormula.php", data, function(json){
		console.log("getFormula.php is gelukt!");
		console.log(json);
		var arrFormulePieces = [];
			$.each(json['children'], function(formuleIndex, formuleDB){
				arrFormulePieces = formuleDB.data.formule.split(",");
				var arr = [], href = "";
				$.each(arrFormulePieces, function(index, value){
					if ($.inArray(value, arrGrootheidSybool) > -1){
						href = "\\href{javascript:getFormula(\"\'" + value +"\'\")}" + "{" + value + "}";
						arr.push(href);
					}
					else {
						arr.push(value);
					}
					json['children'][formuleIndex].data.formule = arr.join("");
				});
				$( '<p>', {
					html: '$$' + json['children'][formuleIndex].data.symbool + '= ' + json['children'][formuleIndex].data.formule + '$$',
					'class': 'formula'
				}).appendTo( "body" );
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
				console.log(json);
			});
	})
	.fail(function() { console.log("FAIL: " + grootheidSymbool); });
}

function getFormulaJit(grootheidSymbool){

}

$(document).ready(function() {
	$.getJSON('getArrayGrootheidSymbool.php', function(json){
		console.log("AJAX: getArrayGrootheidSymbool.php is gelukt");
		window.arrGrootheidSybool = json;
			});
	(function() {
		getFormula("'t'");
	})();
});