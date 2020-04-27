/**
 * This file (blockly.js) is executed automatically,
 * if in io-package.json >"blockly": true< is
 */
'use strict';

Blockly.Words['BLOCKLY-PLUS_obsolete']              = {'en': 'This block is obsolete and will be removed in future Blockly-Plus versions.',       'de': 'Dieser block ist veraltet und wird in zukünftigen Blockly-Plus Versionen entfernt.'    };
Blockly.Words['BLOCKLY-PLUS_obsolete_block']        = {'en': 'Please replace it with the block: "$1"',                                            'de': 'Ersetzten sie diesen bitte durch den Block: "$1"'                                      };
Blockly.Words['BLOCKLY-PLUS_obsolete_register']     = {'en': ' from the register: "$2"',                                                          'de': ' aus dem Register: "$2"'                                                               };

{
// --- import scripts --------------------------------------------------
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

// --- BlocklyPlus --------------------------------------------------
  Blockly.BlocklyPlus = {
    Obsolete: function(block, alternateBlock, alternateRegister) {
      let warnText = Blockly.Words['BLOCKLY-PLUS_obsolete'][systemLang];
      if (alternateBlock) warnText += '\n'+
          Blockly.Words['BLOCKLY-PLUS_obsolete_block'][systemLang]
          .replace('$1', alternateBlock);
      if (alternateRegister) warnText +=
          Blockly.Words['BLOCKLY-PLUS_obsolete_register'][systemLang]
          .replace('$2', alternateRegister);
      block.setWarningText(warnText);
    },
    Marker: function(block) {
      let field = new Blockly.FieldImage(mainPath + 'blockly-plus.png', 15, 15, '➕');
      block.inputList[0].insertFieldAt(0, field);
    }
  };
}
