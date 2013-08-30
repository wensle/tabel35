var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left	,
	height = 800 - margin.top - margin.	bottom;

var tree = d3.layout.tree()
	.size([height, width]);

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");