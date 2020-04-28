'use strict';

goog.provide('Blockly.JavaScript.Other');

goog.require('Blockly.JavaScript');

// --- logic_ifEmpty --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty']                    = {'en': 'if empty',      'de': 'falls leer'  };
Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty_then']               = {'en': 'then',          'de': 'dann'        };
Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty_tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty_helpurl']            = {'en': '',              'de': ''            };

Blockly.Other.blocks['BLOCKLY-PLUS_logic_ifEmpty'] =
    '  <block type="BLOCKLY-PLUS_logic_ifEmpty">'
    +'  </block>';

Blockly.Blocks['BLOCKLY-PLUS_logic_ifEmpty'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty'][systemLang]);
    this.appendValueInput('DEFLT')
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty_then'][systemLang]);

    this.setOutput(true, null);
    this.setInputsInline(true);
    this.setColour(Blockly.Constants.Logic.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_logic_ifEmpty_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  },

  onchange: function(event) { Blockly.Constants.checksPassThrough(this, event) }
}

Blockly.JavaScript['BLOCKLY-PLUS_logic_ifEmpty'] = function(block) {
  let value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_LOGICAL_OR) || null;
  let deflt = Blockly.JavaScript.valueToCode(block, 'DEFLT', Blockly.JavaScript.ORDER_LOGICAL_OR) || null;
  return [value + ' || ' + deflt, Blockly.JavaScript.ORDER_LOGICAL_OR];
}
