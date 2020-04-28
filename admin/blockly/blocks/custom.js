'use strict';

/**
 * These blocks are not intended for an official release
 */

// --- system_input_code --------------------------------------------------
Blockly.Custom.blocks['system_input_code'] =
    '  <block type="system_input_code">'
    +'    <field name="CODE0">js-code</field>'
    +'    <value name="INPUT1">'
    +'      <block type="system_code">'
    +'        <field name="CODE0">js-code</field>'
    +'      </block>'
    +'    </value>'
    +'  </block>'

Blockly.Blocks['system_input_code'] = {
  init: function() {
    let code0 = new Blockly.FieldTextInput('');
    code0.setSpellcheck(false);

    this.appendValueInput('INPUT0')
        .appendField(code0, 'CODE0');
    this.appendValueInput('INPUT1');

    this.setOutput(true, null);
    this.setInputsInline(true);
    this.setColour(Blockly.Custom.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    Blockly.BlocklyPlus.Marker(this);
  }
}

Blockly.JavaScript['system_input_code'] = function(block) {
  let input0 = Blockly.JavaScript.valueToCode(block, 'INPUT0', Blockly.JavaScript.ORDER_NONE) || '';
  let input1 = Blockly.JavaScript.valueToCode(block, 'INPUT1', Blockly.JavaScript.ORDER_NONE) || '';
  let code0 = block.getFieldValue('CODE0') || '';
  let code = code0 + input0 + input1;

  let hasOutput = block.outputConnection && block.outputConnection.type == 2;
  return hasOutput ? [code, Blockly.JavaScript.ORDER_ATOMIC] : code
}

// --- system_code --------------------------------------------------
Blockly.Custom.blocks['system_code'] =
    '  <block type="system_code">'
    +'    <field name="CODE0">js-code</field>'
    +'  </block>';

Blockly.Blocks['system_code'] = {
  init: function() {
    let code0 = new Blockly.FieldTextInput('');
    code0.setSpellcheck(false);

    this.appendDummyInput()
        .appendField(code0, 'CODE0');

    this.setOutput(true, null);
    this.setInputsInline(true);
    this.setColour(Blockly.Custom.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    Blockly.BlocklyPlus.Marker(this);
  }
}

Blockly.JavaScript['system_code'] = Blockly.JavaScript['system_input_code'];

// --- system_connector --------------------------------------------------
Blockly.Custom.blocks['system_connector'] =
    '  <block type="system_connector">'
    +'    <value name="INPUT0">'
    +'      <block type="system_code">'
    +'        <field name="CODE0">js-code</field>'
    +'      </block>'
    +'    </value>'
    +'  </block>'

Blockly.Blocks['system_connector'] = {
  init: function() {
    this.appendValueInput('INPUT0');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(Blockly.Custom.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    Blockly.BlocklyPlus.Marker(this);
  }
}

Blockly.JavaScript['system_connector'] = Blockly.JavaScript['system_input_code'];

/** ///###########################    system_getObjProperties    ###########################//
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
    this.setColour(Blockly.Constants.System.HUE);
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

/** ///###########################    system_getObject    ###########################//
BOB_.registerBlock('system_getObject');
Blockly.Blocks['system_getObject'] = {
  init: function() {
    this.appendValueInput('OBJECT')
        .setCheck('String')
        .appendField('getObject')
        .appendShadowBlock('field_oid');

    this.setOutput(true, ['Array', 'Object']);
    this.setInputsInline(true);
    this.setColour(Blockly.Constants.System.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  }
}

Blockly.JavaScript['system_getObject'] = function(block) {
  var object = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_ATOMIC);
  return ['getObject(' + object + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

/** ///###########################    system_getStateValue    ###########################//
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
    this.setColour(Blockly.Constants.System.HUE);
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

/** ///###########################    system_getObjProperties2    ###########################//
//Blockly.testObj = {wert1: 1, wert2: 'Test', object1: {}, object2: {wert1: 2, wert2: 'Test5'}, func: function() {console.log('Loggin');}, array: [5,6,1,4,9,8]}
BOB_.registerBlock('system_getObjProperties2');
Blockly.Blocks['system_getObjProperties2'] = {
  init: function() {
    this.appendValueInput('OBJECT')
        .setCheck('String')
        .appendShadowBlock('field_oid');
    this.addPropertie(0);

    this.setOutput(true, null);
    this.setInputsInline(true);
    this.setColour(Blockly.Constants.System.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  },

  objName_: '',
  obj_: {},

  mutationToDom: function() {
    let container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('object_name', this.objName_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.objName_ = xmlElement.getAttribute('object_name');
    this.setObj();
  },

  onchange: function(event) {
    if (event.type === Blockly.Events.MOVE &&
        event.oldParentId === this.id && event.oldInputName === 'OBJECT') {
      this.obj_ = {};
      this.objName_ = '';
      this.removePropertie(0);
      this.addPropertie(0);
    } else if ( (event.type === Blockly.Events.MOVE &&
        event.newParentId === this.id &&
        event.newInputName === 'OBJECT') ||
        (event.type === Blockly.Events.CHANGE &&
         this.childBlocks_[0].id === event.blockId) ) {

        var inputBlock = this.getInput('OBJECT').connection.targetBlock();
        this.objName_ = inputBlock
            ? inputBlock.getFieldValue('oid') || inputBlock.getFieldValue('TEXT')
            : this.objName_;
        this.setObj();
    }
  },

  setObj: function() {
    if (typeof main !== 'undefined' && typeof main.objects !== 'undefined') {
      this.obj_ = main.objects[this.objName_];
    } else {
      this.obj_ = Blockly[this.objName_];
    }
    this.removePropertie(0);
    this.addPropertie(0);
  },

  validate: function(newValue) {
    var block = this.sourceBlock_;
    var nr = parseInt(this.name.match(/\d+$/));

    block.removePropertie(nr + 1);

    if (newValue !== 'DEFLT') {
      for (var option of this.getOptions()) {
        if (option[1] === newValue) {
          var newProp = option[0];
          break;
        }
      }
      block.addPropertie(nr+1, newProp);
    }
    return newValue;
  },

  removePropertie: function(nr) {
    for (var i = nr; this.getInput('DUMMY_' + i); i++)
        this.removeInput('DUMMY_' + i);
  },

  addPropertie: function(nr, lastProp = null) {
    var obj = this.obj_;

    for (var i = 0; i < nr; i++) {
      var prob = (i === nr-1 && lastProp) || this.getField('PROPERTIES_' + i).text_;
      obj = obj[prob];
    }

    if (Array.isArray(obj)) {
    // Array
      this.appendValueInput('DUMMY_' + nr)
          .setCheck('Number')
          .appendShadowBlock('math_number', {NUM: 0});

    } else if (typeof obj === 'function') {
    // Function
      this.appendDummyInput('DUMMY_' + nr)
          .appendField('()', 'PROPERTIES_' + nr);

    } else if (typeof obj === 'string' ||
               typeof obj === 'number') {
    // Value
      this.appendDummyInput('DUMMY_' + nr)
          .appendField('_Wert', 'PROPERTIES_' + nr);

    } else if (typeof obj === 'object' ||
               typeof obj === 'undefined') {
    // Object or Undefined
      this.appendDummyInput('DUMMY_' + nr)
          .appendField('.')
          .appendField(new Blockly.FieldDropdown(
              this.generateOptions(obj), this.validate
          ), 'PROPERTIES_' + nr);
    }
  },

  generateOptions: function(obj) {
    var options = [['_OBJEKT','DEFLT']];
    var i = 0;
    for(var prop in obj) {
      options.push([prop, 'opt'+i]);
      i++;
    }
    return options;
  }
}

Blockly.JavaScript['system_getObjProperties2'] = function(block) {
  var objName = block.objName_;

  var prop = [];
  for (var i = 0; block.getFieldValue('PROPERTIES_' + i); i++) {
    prop.push(block.getField('PROPERTIES_' + i).text_);
  }
  var lastProp = prop.pop();
  lastProp = lastProp === '()' ? '()' : '';

  var code = 'getObject(' + objName + ').' + prop.join('.') + lastProp;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}
/**/
