'use strict';
/**//***************************    get Lang-MsgCat vom BlockSvg    ***************************///
Blockly.BlockSvg.prototype.getMsgCat = function( add ) {
  add = add ? '_'+add : '';
  var CatName = this.type.split('_')[0];
  return Blockly.Msg[CatName.toUpperCase() + add];
}
/**//***************************    get Lang-Msg vom BlockSvg    ***************************///
Blockly.BlockSvg.prototype.getMsg = function( add ) {
  add = add ? '_'+add : '';
  return Blockly.Msg[type.toUpperCase() + add];
}

/**//***************************    Registriert ein CustomBlock    ***************************///
BOB_.registerBlock = function( name, opt_cat, opt_xml, opt_setDefault = false ) {
  // if opt_cat === 'undefined' ? opt_cat = opt_cat_name_example
  !opt_cat && (opt_cat = name.split('_')[0]);
  !opt_xml && (opt_xml = '  <block type="%%BLOCK_NAME%%"></block>');
  Array.isArray(opt_xml) && (opt_xml = opt_xml.join('\n'));
  opt_xml = opt_xml.replace("%%BLOCK_NAME%%", name);

  if ( !BOB_.Blocks[name] || opt_setDefault ) {
    BOB_.Blocks[name] = BOB_.Blocks[name] || {};
    BOB_.Blocks[name].xml = opt_xml;
  }
}

/**//***************************    JS-Code-gen Funktionen    ***************************///
BOB_.getVarName = function(block, Field) {
// gibt Variablenname zurück
  return Blockly.JavaScript.variableDB_.getName(block.getFieldValue(Field), Blockly.Variables.NAME_TYPE);
}

BOB_.getOP = function(block, Field, deflt = false) {
  return block.getFieldValue(Field) ? BOB_.op[block.getFieldValue(Field)]
                                    : deflt;
}

BOB_.genOpCode = function(code, value, op, value2) {
  code = code || '%2';
  op = op || BOB_.OP['end'];
  code = code.replace(/((?<=[^%])|^)%2/g, value);
  code = op.code.replace(/((?<=[^%])|^)%1/g, code);

  if (typeof value2 !== 'undefined') {
    code = code.replace(/((?<=[^%])|^)%2/g, value2);
  }
  return code;
}

/**//***************************    Funktion - FIELD.setDefault    ***************************///
/**
 * @param {variant} value               Default-Value
 * @this {Blockly.Field}
 */
Blockly.Field.prototype.setDefault = function(value) {
  this.text_ = ''+value;
  this.value_ = value;
  return this;
}

/**//***************************    Blockly.Field.prototype.getParentInput    ***************************///
/**
 * Search through the list of inputs and their fields in order to find the parent input of a field.
 * @return {Blockly.Input} The input that the field belongs to, or null.
 */
if (typeof Blockly.Field.prototype.getParentInput === "undefined") {
Blockly.Field.prototype.getParentInput = function() {
  if (!this.sourceBlock_) return null;
  for (var input of this.sourceBlock_.inputList) {
    if (input.fieldRow.indexOf(this) !== -1) return input;
  }
}}
/**//***************************    Funktion - INPUT.appendShadowBlock    ***************************///
/**
 * @param {string} addBlock_name        type-name of the block to be append; example: 'math_number'
 * @param {object} opt_objDefault       Default-Value with fieldName and value;   example: {NUM: 0}
 * @this  {Blockly.Input}
 * @return {this}
 */
if (typeof Blockly.Input.prototype.appendShadowBlock === "undefined") {
Blockly.Input.prototype.appendShadowBlock = function(addBlock_name, opt_objDefault) {

    var parentBlock = this.sourceBlock_;
    var workspace = parentBlock.workspace;

    //if (!parentBlock.isInFlyout) return this;
    if (addBlock_name == null || this.connection.isConnected()) return this;
    if (Blockly.Blocks[addBlock_name] == null) {
        console.warn('ShadowBlock "' + addBlock_name + '" is undefined!');
        return this;
    }

    // create new block in the same workspace as the parent block
    var addBlock = workspace.newBlock(addBlock_name);

    // set Default-Value
    for (var fieldName in opt_objDefault) {
      var value = opt_objDefault[fieldName]
      addBlock.setFieldValue(value, fieldName);
    }

    // make this block shadow
    addBlock.setShadow(true);

    // render it
    addBlock.initSvg();
    addBlock.render();

    // get an output connection
    let ob = addBlock.outputConnection;
    // get an input connection
    let cc = this.connection;

    // then connect
    ob.connect(cc);

    return this;
}}
/**/
