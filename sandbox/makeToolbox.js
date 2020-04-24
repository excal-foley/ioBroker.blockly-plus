'use strict';

(function() {
  let t = '';
  for (let s = systemLang, n = 0; n < Blockly.CustomBlocks.length; n++) {
    var a = Blockly.CustomBlocks[n];
    for (var i in t += '<category name="' + Blockly.Words[a][s] + '" colour="' + Blockly[a].HUE + '">', Blockly[a].blocks) Blockly[a].blocks.hasOwnProperty(i) && (t += Blockly[a].blocks[i]);
    t += "</category>"
  }
  let toobox = window.document.getElementById("toolbox");
  toolbox.outerHTML = toolbox.outerHTML.replace("<category><block>%%CUSTOM_BLOCKS%%</block></category>", t);
})();
