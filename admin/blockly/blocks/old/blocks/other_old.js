'use strict';

/**///###########################    system_getObjProperties    ###########################//
BOB_.registerBlock('system_getObjProperties');
Blockly.Blocks['system_getObjProperties'] = {
  init: function() {

    var validator = function(newValue) {
      // Whitelist Chars
      return newValue.replace(/[^\w\[\]\'\"\$\.]/g, '');
    }

    var prop = new Blockly.FieldTextInput('common.name');
        prop.setSpellcheck(false);
        prop.setValidator(validator);

    this.appendValueInput('OBJECT')
        .setCheck('String')
        .appendShadowBlock('field_oid');
    this.appendDummyInput()
        .appendField('.')
        .appendField(prop, 'PROP')

    this.setOutput(true, null);
    this.setColour(this.getMsgCat('HUE'));
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  }
}

Blockly.JavaScript['system_getObjProperties'] = function(block) {
  var prop = block.getFieldValue('PROP');
  var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'getObject(' + object + ').' + prop;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}
/**///###########################    system_getObject    ###########################//
BOB_.registerBlock('system_getObject');
Blockly.Blocks['system_getObject'] = {
  init: function() {
    this.appendValueInput('OBJECT')
        .setCheck('String')
        .appendField('getObject')
        .appendShadowBlock('field_oid');

    this.setOutput(true, ['Array', 'Object']);
    this.setInputsInline(true);
    this.setColour(this.getMsgCat('HUE'));
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  }
}

Blockly.JavaScript['system_getObject'] = function(block) {
  var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
  return ['getObject(' + object + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

/**///###########################    system_getStateValue    ###########################//
BOB_.registerBlock('system_getStateValue');

Blockly.Blocks['system_getStateValue'] = {
  init: function() {
    this.appendValueInput('OBJECT')
        .setCheck('String')
        .appendField(new Blockly.FieldTextInput('states'), 'ATTRIBUT')
        .appendField('von')
        .appendShadowBlock('field_oid');
    this.appendDummyInput()
        .appendField('umkerhren')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'INVERT');

    this.setOutput(true, null);
    this.setInputsInline(true);
    this.setColour(this.getMsgCat('HUE'));
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  }
}

Blockly.JavaScript['system_getStateValue'] = function(block) {
  var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
  var attribut = block.getFieldValue('ATTRIBUT');
  var invert = block.getFieldValue('INVERT') === 'TRUE';
  var functionName = Blockly.JavaScript.provideFunction_(
    "getStateValue",
    ["function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(objectId, attribut, opt_invert = false) {",
     "  try {",
     "    return getObject(objectId).common[attribut][opt_invert ? !getState(objectId).val : getState(objectId).val];",
     "  } catch (err) {",
     "    console.error(",
     "      'getObject('+objectId+').common['+attribut+']['+opt_invert ? !getState(objectId).val : getState(objectId).val+']'",
     "      + ' does not exist!');",
     "  }",
     "}"
    ]
  );

  var code = functionName + "(" + object + ", '" + attribut + "', " + invert + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

/**/
