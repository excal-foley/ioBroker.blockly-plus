/**
 * This file (blockly.js) is executed automatically,
 * if in io-package.json >"blockly": true< is
 */

'use strict';
{
  let isLocal = /^file.*/.test(window.location.protocol);
  let mainPath = isLocal ? '' : '../blockly-plus/blockly/';

  let importScripts = function( srcList, addPath = mainPath ) {
    !Array.isArray(srcList) && (srcList = [srcList]);
    srcList.forEach(function(src) {
      var script = document.createElement('script');
      script.async = false; // Force synchronous loading, to load them in the correct sequence
      script.src = addPath + src;
      document.head.appendChild(script);
    });
  }

  // DO NOT EDIT THIS LINE!!! This generate from python-script
  let srcList = ['category.js', 'original_fixes.js', 'blocks/logic_ifEmpty.js', 'blocks/telegram_keyboard.js', 'blocks/multiplex.js', 'blocks/loops.js', 'blocks/math_rnd_multiple.js', 'blocks/old_own_code.js', 'blocks/logic_between.js', 'blocks/custom.js', 'blocks/msg/de_ioBroker_change.js'];

  importScripts(srcList);

}
