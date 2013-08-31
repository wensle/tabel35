function getFormula(grootheidSymbool){
	// var url = '/getFormula.php' + '?grootheidSymbool=' + grootheidSymbool;
	var data = {
		grootheidSymbool: grootheidSymbool
	};
	$.getJSON("getFormula.php", data, function(json){
		console.log("getFormula.php is gelukt!");
		var arrFormulePieces = [];
			$.each(json['children'], function(formuleIndex, formuleDB){
				arrFormulePieces = formuleDB.formule.split(",");
				var arr = [], href = "";
				$.each(arrFormulePieces, function(index, value){
					if ($.inArray(value, arrGrootheidSybool) > -1){
						href = "\\href{javascript:getFormula(\"\'" + value +"\'\")}" + "{" + value + "}";
						arr.push(href);
					}
					else {
						arr.push(value);
					}
					json['children'][formuleIndex].formule = arr.join("");
				});
				$( '<p>', {
					html: '$$' + json['children'][formuleIndex].symbool + '= ' + json['children'][formuleIndex].formule + '$$',
					'class': 'formula'
				}).appendTo( "body" );


			});
				var nodes = tree.nodes(json);
				var links = tree.links(nodes);
				// console.log(nodes);

				var node = svg.selectAll(".node")
					.data(nodes)
					.enter()
					.append("g")
						.attr("class", "node")
						.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")";}) ;

				node.append("circle")
					.attr("r", 10)
					.attr("fill", "steelblue");

				node.append("text")
					.text(function (d) {
						var mathJax = '$$' + d.symbool + '= ' + d.formule + '$$';
						console.log(mathJax);
						return mathJax;
					});
				MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	})
	.fail(function() { console.log("FAIL: " + grootheidSymbool); });
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