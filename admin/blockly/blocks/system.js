'use strict';

goog.provide('Blockly.JavaScript.System');

goog.require('Blockly.JavaScript');

// --- getObject --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_getObject']                    = {'en': 'getObject',      'de': 'getObject'  };
Blockly.Words['BLOCKLY-PLUS_getObject_Tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_getObject_HelpUrl']            = {'en': '',              'de': ''            };

Blockly.System.blocks['BLOCKLY-PLUS_getObject'] =
    '<block type="BLOCKLY-PLUS_getObject">'
    +'  <value name="OBJECT_ID">'
    +'    <shadow type="field_oid">'
    +'      <field name="oid">default</field>'
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['BLOCKLY-PLUS_getObject'] = {
  init: function() {
    this.appendValueInput('OBJECT_ID')
        .setCheck('String')
        .appendField(Blockly.Words['BLOCKLY-PLUS_getObject'][systemLang]);
        //.appendShadowBlock('field_oid');

    this.setOutput(true, ['Array', 'Object']);
    this.setInputsInline(true);
    this.setColour(Blockly.System.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_getObject_Tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_getObject_HelpUrl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  }
}

Blockly.JavaScript['BLOCKLY-PLUS_getObject'] = function(block) {
  var objectId = Blockly.JavaScript.valueToCode(block, 'OBJECT_ID', Blockly.JavaScript.ORDER_FUNCTION_CALL);
  return [ `getObject(${objectId})`, Blockly.JavaScript.ORDER_FUNCTION_CALL ];
}
