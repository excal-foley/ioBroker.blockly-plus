'use strict';

//goog.provide('Blockly.JavaScript.Test');

goog.require('Blockly.JavaScript');

// --- logic_between --------------------------------------------------
Blockly.Test.blocks['logic_between'] =
    '  <block type="logic_between">'
    +'    <field name="operator0">LE</field>'
    +'    <field name="operator1">LE</field>'
    +'    <value name="value0">'
    +'      <block type="math_number">'
    +'        <field name="NUM">0</field>'
    +'      </block>'
    +'    </value>'
    +'    <value name="value1">'
    +'      <shadow type="math_number">'
    +'        <field name="NUM">32</field>'
    +'      </shadow>'
    +'    </value>'
    +'    <value name="value2">'
    +'      <block type="math_number">'
    +'        <field name="NUM">100</field>'
    +'      </block>'
    +'    </value>'
    +'  </block>';

Blockly.Blocks['logic_between'] = {
  init: function() {
    this.appendValueInput('value0')
        .setCheck('Number');
    //    .appendShadowBlock('math_number',{NUM: 0});
    this.appendValueInput('value1')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown([ ['<', 'LT'],
                                                 ['≤', 'LE'] ]), 'operator0');
    //    .appendShadowBlock('math_number',{NUM: 32});
    this.appendValueInput('value2')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown([ ['<', 'LT'],
                                                 ['≤', 'LE'] ]), 'operator1');
    //    .appendShadowBlock('math_number',{NUM: 100});

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(Blockly.Constants.Logic.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  }
}
/**//***************************    Javascript    ***************************///
Blockly.JavaScript['logic_between'] = function(block) {
// Prüft ob der mittlere Wert zwischen den beiden Äußeren ist
  let value0 = Blockly.JavaScript.valueToCode(block, 'value0', Blockly.JavaScript.ORDER_RELATIONAL) || 0;
  let value1 = Blockly.JavaScript.valueToCode(block, 'value1', Blockly.JavaScript.ORDER_RELATIONAL) || 0;
  let value2 = Blockly.JavaScript.valueToCode(block, 'value2', Blockly.JavaScript.ORDER_RELATIONAL) || 0;
  let op0 = block.getFieldValue('operator0') == 'LT' ? '<' : '<=';
  let op1 = block.getFieldValue('operator1') == 'LT' ? '<' : '<=';

  return [value0 + ' ' + op0 + ' ' + value1 + ' && ' + value1 + ' ' + op1 + ' ' + value2, Blockly.JavaScript.ORDER_LOGICAL_AND];
}
