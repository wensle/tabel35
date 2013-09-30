function getFormula(grootheidSymbool){
	// var url = '/getFormula.php' + '?grootheidSymbool=' + grootheidSymbool;
	var data = {
		grootheidSymbool: grootheidSymbool
	};
	$.getJSON("getFormula.php", data, function(json){
		console.log("getFormula.php is gelukt!");
		var arrFormulePieces = [];
			$.each(json['children'], function(index1, grootheid){
				$.each(grootheid["children"], function(index2, groep){
						$.each(groep["children"], function(index3, subgroep){
								$.each(subgroep["children"], function(index4, formule){
										$.each(formule, function(index5, niks){
										$( '<p>', {
											html: formule["name"],
											'class': 'formula'
										}).appendTo( "body" );
										MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
									});
							});
					});
			});
	})
});

}

$(document).ready(function() {
	(function() {
		getFormula("'t'");
	})();
});