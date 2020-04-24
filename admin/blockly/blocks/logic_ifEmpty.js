'use strict';

// --- logic_ifEmpty --------------------------------------------------
Blockly.Words['logic_ifEmpty']                    = {'en': 'if empty',      'de': 'falls leer'  };
Blockly.Words['logic_ifEmpty_then']               = {'en': 'then',          'de': 'dann'        };
Blockly.Words['logic_ifEmpty_Tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['logic_ifEmpty_HelpUrl']            = {'en': '',              'de': ''            };

Blockly.Test.blocks['logic_ifEmpty'] =
    '  <block type="logic_ifEmpty">'
    +'  </block>';

Blockly.Blocks['logic_ifEmpty'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Words['logic_ifEmpty'][systemLang]);
    this.appendValueInput('DEFLT')
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Words['logic_ifEmpty_then'][systemLang]);

    this.setOutput(true, null);
    this.setInputsInline(true);
    this.setColour(Blockly.Constants.Logic.HUE);
    this.setTooltip(Blockly.Words['logic_ifEmpty_Tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['logic_ifEmpty_HelpUrl'][systemLang]);
    this.initSvg();
  },

  onchange: function(event) {
    Blockly.Constants.checksPassThrough(this, event);
  }
}

Blockly.JavaScript['logic_ifEmpty'] = function(block) {
  let value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_LOGICAL_OR) || null;
  let deflt = Blockly.JavaScript.valueToCode(block, 'DEFLT', Blockly.JavaScript.ORDER_LOGICAL_OR) || null;
  return [value + ' || ' + deflt, Blockly.JavaScript.ORDER_LOGICAL_OR];
}

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
Blockly.Constants.checksPassThrough = function(block, event, in2out = true, out2in = true, selectInputs = null) {
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
