/**
 * This file (blockly.js) is executed automatically,
 * if in io-package.json >"blockly": true< is
 */
'use strict';
{
  let isSandbox = /sandbox.html/.test(window.location.pathname);
  let mainPath = isSandbox ? '../' : '../blockly-plus/';
  let importScripts = function( srcList, addPath='' ) {
    !Array.isArray(srcList) && (srcList = [srcList]);
    srcList.forEach(function(src) {
      var script = document.createElement('script');
      script.async = false; // Force synchronous loading, to load them in the correct sequence
      script.src = addPath + src;
      document.head.appendChild(script);
    });
  }

  let importList = {};

  importList.blockly = [
    'category.js',
    'original_fixes.js'
  ];

  // DO NOT EDIT THIS LINE!!! This generate from python-script
  importList.blocks = [
    'logic_ifEmpty.js',
    'telegram_keyboard.js',
    'multiplex.js',
    'loops.js',
    'math_rnd_multiple.js',
    'logic_between.js',
    'system.js',
    'regex.js',
    'custom.js',
    'msg/de_ioBroker_change.js'
  ];
  // DO NOT EDIT THIS LINE!!! ################################

  importList.blocks.push('old_own_code.js');

  importScripts(importList.blockly, mainPath + 'blockly/');
  importScripts(importList.blocks, mainPath + 'blockly/blocks/');

  if (isSandbox) importScripts('makeToolbox.js');

  Blockly.Constants.BlocklyPlus = {
    get getFieldImage() { return new Blockly.FieldImage(mainPath + 'blockly-plus.png', 15, 15, '➕') }
  };
}
