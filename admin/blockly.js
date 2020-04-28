/**
 * This file (blockly.js) is executed automatically,
 * if in io-package.json >"blockly": true< is
 */
'use strict';

Blockly.Words['BLOCKLY-PLUS_deprecated']              = {'en': '@deprecated. Will be deleted in future Blockly-Plus versions.',    'de': 'Dieser Block ist veraltet und wird in zukünftigen Blockly-Plus Versionen entfernt.'   };
Blockly.Words['BLOCKLY-PLUS_deprecated_block']        = {'en': 'Use instead Block: $1',                                            'de': 'Verwenden Sie stattdessen den Block: $1'                                              };

// --- BlocklyPlus --------------------------------------------------
Blockly.BlocklyPlus = {

  isSandbox: /sandbox.html/.test(window.location.pathname),

  get mainPath() { return this.isSandbox ? '../' : '../blockly-plus/' },

  markDeprecated: function(block, alternateBlock) {
    let warnText = Blockly.Words['BLOCKLY-PLUS_deprecated'][systemLang];
    if (alternateBlock) warnText += '\n'+
        Blockly.Words['BLOCKLY-PLUS_deprecated_block'][systemLang]
        .replace('$1', alternateBlock);
    block.setWarningText(warnText);
  },

  Marker: function(block) {
    let field = new Blockly.FieldImage(this.mainPath + 'blockly-plus.png', 15, 15, '➕');
    block.inputList[0].insertFieldAt(0, field, 'Blockly-Plus_MARKER');
  },

  importScripts: function(srcList, addPath='', addMainPath=false) {
    !Array.isArray(srcList) && (srcList = [srcList]);
    srcList.forEach((src) => {
      var script = document.createElement('script');
      script.async = false; // Force synchronous loading, to load them in the correct sequence
      script.src = (addMainPath ? this.mainPath : '') + addPath + src;
      document.head.appendChild(script);
    });
  }

  //getWord: (name) => Blockly.Words['Blockly-Plus_'+name][systemLang]

};

// --- block import --------------------------------------------------
{
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

  Blockly.BlocklyPlus.importScripts(importList.blockly, 'blockly/', true);
  Blockly.BlocklyPlus.importScripts(importList.blocks, 'blockly/blocks/', true);

  if (Blockly.BlocklyPlus.isSandbox) Blockly.BlocklyPlus.importScripts('makeToolbox.js');

}

// --- checksPassThrough --------------------------------------------------
/**                | out2in | in2out |
 *   in<>in        |    0   |    0   |
 *       in <- out |    1   |    0   |
 *   in<>in -> out |    0   |    1   |
 *   in<>in <> out |    1   |    1   |
 * This function belongs in an onchange-method of a block.
 * It changes the input/output-checks depending on the connected blocks.
 * This is triggered when connecting to other blocks or when creating/rebuilding.
 * @param  {BlockSvg}   block               Blockly.BlockSvg
 * @param  {Events}     event               Blockly.Events
 * @param  {Boolean}    [in2out=true]       Should the inputs-checks be transferred to the output
 * @param  {Boolean}    [out2in=true]       Should the output-checks be transferred to the inputs
 * @param  {?string[]}  [selectInputs=null] names of inputs which to take into account
 *                                          If null then all inputs are considered
 */
Blockly.Blockly.checksPassThrough = function(block, event, in2out = true, out2in = true, selectInputs = null) {
  let blockCreate = event.type == 'create' && ( event.blockId == block.id ||
                                                event.ids.includes(block.id) );
  let blockPlugged = event.type == 'move' && ( event.blockId == block.id &&
                                        event.newParentId != event.oldParentId);
  let blockConnect = event.type == 'move' && ( event.newParentId == block.id ||
                                               event.oldParentId == block.id );

  if (blockCreate || blockPlugged || blockConnect) {

    let checks = new function() {
      this.inputs = null;
      this.output = block.outputConnection.targetConnection
                          && block.outputConnection.targetConnection.check_;
      this.out2in = () => { this.inputs = this.output };
      this.in2out = () => { this.output = this.inputs };
      this.addInput = function(check) {
        if (check) {
          if (!this.inputs) {
            this.inputs = check;
          } else {
            this.inputs = this.inputs.filter(n => check.includes(n));
          }
        }
      };
      this.getInputs = function() {
        for (let input of block.inputList) {
          if (selectInputs && !selectInputs.includes(input.name)) continue;
          let connectBlock = input.connection.targetBlock();
          if (event.oldInputName != input.name && connectBlock) {
            let connectBlockCheck = connectBlock.outputConnection.check_;
             checks.addInput(connectBlockCheck);
          }
        }
      };
    }

    if (out2in && !in2out) checks.out2in();
    else checks.getInputs();

    if (out2in) checks.addInput(checks.output);
    if (in2out) checks.in2out();

    // set checks in all inputs
    for (let input of block.inputList) {
      if (selectInputs && !selectInputs.includes(input.name)) continue;
      input.setCheck(checks.inputs);
    }
    // set output check
    block.setOutput(true, checks.output);
  }
}
