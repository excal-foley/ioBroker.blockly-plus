'use strict';

goog.provide('Blockly.JavaScript.Other');

goog.require('Blockly.JavaScript');

// --- logic_between --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_logic_between_tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_logic_between_helpurl']            = {'en': '',              'de': ''            };

Blockly.Other.blocks['BLOCKLY-PLUS_logic_between'] =
    '  <block type="BLOCKLY-PLUS_logic_between">'
    +'    <field name="MIN_OPERATOR">LE</field>'
    +'    <field name="MAX_OPERATOR">LE</field>'
    +'    <value name="MIN">'
    +'      <block type="math_number">'
    +'        <field name="NUM">0</field>'
    +'      </block>'
    +'    </value>'
    +'    <value name="VALUE">'
    +'      <shadow type="math_number">'
    +'        <field name="NUM">42</field>'
    +'      </shadow>'
    +'    </value>'
    +'    <value name="MAX">'
    +'      <block type="math_number">'
    +'        <field name="NUM">100</field>'
    +'      </block>'
    +'    </value>'
    +'  </block>';

Blockly.Blocks['BLOCKLY-PLUS_logic_between'] = {
  init: function() {
    this.appendValueInput('MIN')
        .setCheck('Number');
    //    .appendShadowBlock('math_number',{NUM: 0});
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown([ ['<', 'LT'],
                                                 ['≤', 'LE'] ]), 'MIN_OPERATOR');
    //    .appendShadowBlock('math_number',{NUM: 32});
    this.appendValueInput('MAX')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown([ ['<', 'LT'],
                                                 ['≤', 'LE'] ]), 'MAX_OPERATOR');
    //    .appendShadowBlock('math_number',{NUM: 100});

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(Blockly.Constants.Logic.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_logic_between_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_logic_between_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  }
}
/**//***************************    Javascript    ***************************///
Blockly.JavaScript['BLOCKLY-PLUS_logic_between'] = function(block) {
// Prüft ob der mittlere Wert zwischen den beiden Äußeren ist
  let min = Blockly.JavaScript.valueToCode(block, 'MIN', Blockly.JavaScript.ORDER_RELATIONAL) || 0;
  let value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_RELATIONAL) || 0;
  let max = Blockly.JavaScript.valueToCode(block, 'MAX', Blockly.JavaScript.ORDER_RELATIONAL) || 0;
  let minOperator = block.getFieldValue('MIN_OPERATOR') == 'LT' ? '<' : '<=';
  let maxOperator = block.getFieldValue('MAX_OPERATOR') == 'LT' ? '<' : '<=';

  let code = `${min} ${minOperator} ${value} && ${value} ${maxOperator} ${max}`;
  return [code, Blockly.JavaScript.ORDER_LOGICAL_AND];
}
