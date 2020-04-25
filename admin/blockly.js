/**
 * This file (blockly.js) is executed automatically,
 * if in io-package.json >"blockly": true< is
 */
'use strict';
{
  let isSandbox = /sandbox.html/.test(window.location.pathname);
  let mainPath = isSandbox ? '../blockly/' : '../blockly-plus/blockly/';
  let importScripts = function( srcList, addPath='' ) {
    !Array.isArray(srcList) && (srcList = [srcList]);
    srcList.forEach(function(src) {
      var script = document.createElement('script');
      script.async = false; // Force synchronous loading, to load them in the correct sequence
      script.src = addPath + src;
      document.head.appendChild(script);
    });
  }

  // DO NOT EDIT THIS LINE!!! This generate from python-script
  let importList = ['category.js', 'original_fixes.js', 'blocks/logic_ifEmpty.js', 'blocks/telegram_keyboard.js', 'blocks/multiplex.js', 'blocks/loops.js', 'blocks/math_rnd_multiple.js', 'blocks/logic_between.js', 'blocks/custom.js', 'blocks/msg/de_ioBroker_change.js'];
  // DO NOT EDIT THIS LINE!!! ################################

  importList.push('blocks/old_own_code.js');

  importScripts(importList, mainPath);

  if (isSandbox) importScripts('makeToolbox.js');
}
