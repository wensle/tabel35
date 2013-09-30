$jit.ST.Plot.NodeTypes.implement({
    'nodeline': {
      'render': function(node, canvas, animating) {
            if(animating === 'expand' || animating === 'contract') {
              var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
              var width  = nconfig.width, height = nconfig.height;
              var algnPos = this.getAlignedPos(pos, width, height);
              var ctx = canvas.getCtx();
              ctx.beginPath();
                  ctx.moveTo(algnPos.x + 3, algnPos.y + height / 2);
                  ctx.lineTo(algnPos.x, algnPos.y + height / 2);
              ctx.stroke();
          }
      }
    }
      
});

function init() {
    var json ={"id":"node2648","name":"tijd","data":{},"children":[{"id":"node2649","name":"Mechanica","data":{},"children":[{"id":"node2653","name":"rechtlijnige beweging","data":{},"children":[{"id":"node2662","name":"tijd bij eenparige beweging","data":{},"children":[{"id":"node2661","name":"$\\frac{\\href{javascript:getFormula('\"s\"')}{s}}{\\href{javascript:getFormula('\"v\"')}{v}}$","data":{},"children":[]}]},{"id":"node2666","name":"tijd bij gemiddelde snelheid","data":{},"children":[{"id":"node2665","name":"$\\frac{\\href{javascript:getFormula('\"s\"')}{s}}{\\href{javascript:getFormula('\"v\"')}{v}_{gem}}$","data":{},"children":[]}]},{"id":"node2670","name":"tijd bij versnelde beweging zonder beginsnelheid","data":{},"children":[{"id":"node2669","name":"$\\sqrt{\\frac{2\\cdot\\href{javascript:getFormula('\"s\"')}{s}}{\\href{javascript:getFormula('\"a\"')}{a}}}$","data":{},"children":[]}]}]}]},{"id":"node2652","name":"Trillingen, golven en optica","data":{},"children":[{"id":"node2660","name":"trillingen","data":{},"children":[{"id":"node2676","name":"tijd bij faseverschil","data":{},"children":[{"id":"node2675","name":"$\\Delta \\href{javascript:getFormula('\"t\"')}{t} = \\frac{\\Delta \\href{javascript:getFormula('\"\\varphi\"')}{\\varphi}}{T}$","data":{},"children":[]}]}]}]}]};
    var st = new $jit.ST({
        injectInto: 'infovis',
        width: 960,
        height: 600,
        levelsToShow: 6,
        levelDistance: 30,
        orientation: 'bottom',
        siblingOFfset: 10,
        // subtreeOffset: 200, 
        constrained: false,
        Node: {
            autoWidth: true,
            autoHeight: true,
            type: 'nodeline',
            color: '#e74c3c',
            overridable: false,
            align:"center"
         },
         onCreateLabel: function(label, node){
            var hidden = $('<span id="hidden" style="display:none;"></span>');
            $('body').append(hidden);
             label.id = node.id;
                label.innerHTML = node["name"];
                hidden.html(label.innerHTML);
             label.onclick = function(){
                 st.onClick(node.id);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
             };
             //set label styles
             var style = label.style;
             style.width = hidden.width() + 'px';
             style.height = hidden.height() + 'px';            
             style.cursor = 'pointer';
             style.color = '#000';
             style.fontSize = '1em';
             style.textAlign= 'center';
         },
         onAfterCompute: function(){
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

         }
    });
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //emulate a click on the root node.
    st.onClick(st.root, {
    Move: {
      enable: true,
      offsetY: -200,
      offsetX: 0
    },
    onComplete: function() {}
});
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

}