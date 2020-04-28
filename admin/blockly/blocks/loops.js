'use strict';
/**
 * #######################################################################
 * ############################  DEVELOPMENT  ############################
 * #######################################################################
 */

//goog.provide('Blockly.JavaScript.Other');

goog.require('Blockly.JavaScript');

/**
 *    getValueFromParent
 * Gets value from the next parent element that match the type and
 * contain the opt_containsValue.
 * @param {block} blockSvg                The block which calling this function.
 * @param {regex} RegexValue              The muster which contain the value.
 * @param {array} parentTypes             The Types which contain the value.
 * @param {string} opt_containsValue      The parent must contain this value.
 * @param {string} opt_FieldName          Name from opt_containsValue.
 * @return {string} value from parent
 */
Blockly.Develop.getValueFromParent = function(block, RegexValue, parentTypes,
                                        opt_containsValue = null,
                                        opt_FieldName = null) {
  // check if already on calculate
  if (block.isLoading_) return null;

  for (var parentBlock = block.getSurroundParent(); parentBlock;
                          parentBlock = parentBlock.getSurroundParent() ) {

    var isType = parentTypes.indexOf(parentBlock.type) !== -1;
    var containValue = !opt_containsValue ||
                parentBlock.getFieldValue(opt_FieldName) == opt_containsValue;

    if (isType && containValue) {
      // locks calculation to get no infinite loop
      block.isLoading_ = true;

      // save dbReverse
      var tmp_dbReverse = JSON.parse(JSON.stringify(Blockly.JavaScript.variableDB_.dbReverse_));

      // generate code from parent-block
      var parentCode = Blockly.JavaScript[parentBlock.type](parentBlock);

      //restore dbReverse
      Blockly.JavaScript.variableDB_.dbReverse_ = tmp_dbReverse;

      // locks calculation
      block.isLoading_ = false;

      // extracted code with 'RegexValue'
      return parentCode.match(RegexValue);
    }
  }
}

// --- getIndex -----------------------------------------------------------
Blockly.Develop.blocks['loops_getIndex'] =
    '<block type="loops_getIndex">'
    +'</block>';

Blockly.Blocks['loops_getIndex'] = {
    /**
     * Block get the index variable from the next loop
     */
    init: function() {
        this.appendDummyInput()
            .appendField('Index von')
            .appendField('SCHLEIFE', 'VAR_NAME');

        this.setOutput(true);
        this.setColour(Blockly.Constants.Loops.HUE);
        this.setTooltip(Blockly.Words['on_source_tooltip'][systemLang]);
        this.setHelpUrl('');
        Blockly.BlocklyPlus.Marker(this);
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @param {!Blockly.Events.Abstract} e Change event.
     * @this Blockly.Block
     */
    onchange: function(e) {
        var legal = false;
        // Is the block nested in a trigger?
        var block = this.getSurroundParent();
        var varName = this.getFieldValue('VAR');

        while (block) {
            if (this.FUNCTION_TYPES.indexOf(block.type) !== -1 && ( !varName
                  || block.getFieldValue('VAR') == varName)
                  && block != this.getParent() ) {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        }

        if (legal) {
            !varName && this.getField('VAR_NAME').setValue(block.getField('VAR').getText());
            this.setWarningText(null);
        } else {
            !varName && this.getField('VAR_NAME').setValue('SCHLEIFE');
            this.setWarningText('Dieser Block darf nur innerhalb einer Schleife verwendet werden!'
              + (varName && '\nDie Variable muss die gleiche wie in der Schleife sein!') );
        }
    },
    /**
     * List of block types that are functions and thus do not need warnings.
     * To add a new function type add this to your code:
     * Blockly.Blocks['controls_forEach'].FUNCTION_TYPES.push('custom_func');
     * and the VariableField name must be 'VAR'
     */
    FUNCTION_TYPES: ['controls_forEach', 'controls_repeat_ext'],
    isLoading_: false
}

Blockly.JavaScript['loops_getIndex'] = function(block) {
var seachVar = block.getFieldValue('VAR');
var RegexVar = /(?<=for \(var )\w+(?= in| =)/;
var varName = Blockly.Test.getValueFromParent(block, RegexVar,
                                                block.FUNCTION_TYPES,
                                                seachVar, 'VAR');
return [varName, Blockly.JavaScript.ORDER_ATOMIC];
}

// --- getIndexVar -----------------------------------------------------------
Blockly.Develop.blocks['loops_getIndexVar'] =
    '<block type="loops_getIndexVar">'
    +'</block>';

Blockly.Blocks['loops_getIndexVar'] = {
    /**
     * Block get the index variable from the next loop
     * that contain variable 'VAR'.
     */
    init: function() {
        this.appendDummyInput()
            .appendField('Index von')
            .appendField(new Blockly.FieldVariable('i'), 'VAR');

        this.setOutput(true);
        this.setColour(Blockly.Constants.Loops.HUE);
        this.setTooltip(Blockly.Words['on_source_tooltip'][systemLang]);
        this.setHelpUrl('');
        Blockly.BlocklyPlus.Marker(this);
    },

    onchange: Blockly.Blocks['loops_getIndex'].onchange,
    FUNCTION_TYPES: Blockly.Blocks['loops_getIndex'].FUNCTION_TYPES,
    isLoading_: false
}

Blockly.JavaScript['loops_getIndexVar'] = Blockly.JavaScript['loops_getIndex'];

/*/ --- loops_flow_statements_var -----------------------------------------------------------
Blockly.Test.blocks['loops_flow_statements_var'] =
    '<block type="loops_flow_statements_var">'
    +'</block>';

Blockly.Blocks['loops_flow_statements_var'] = {
    /**
     * Block break/continue the next loop that contain variable 'VAR'.
     * Prerequisite is that the loop contains a label name.
     * /
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([ ['Beende Schleife', 'break'],
                  ['nächte Ausführung von Schleife', 'continue']
            ]), 'OPTION')
            .appendField(new Blockly.FieldVariable('i'), 'VAR');

        this.setPreviousStatement(true, null);
        this.setColour(Blockly.Constants.Loops.HUE);
        this.setTooltip(Blockly.Words['on_source_tooltip'][systemLang]);
        this.setHelpUrl('');
        this.initSvg();
    },

    onchange: Blockly.Blocks['loops_getIndex'].onchange,
    isLoading_: false,

    /**
     * List of block types that are functions and thus do not need warnings.
     * To add a new function type add this to your code:
     * Blockly.Blocks['loops_flow_statements_var'].FUNCTION_TYPES.push('custom_func');
     * and the VariableField name must be 'VAR'
     * /
    FUNCTION_TYPES: ['controls_forEach']
}

Blockly.JavaScript['loops_flow_statements_var'] = function(block) {
  var option = block.getFieldValue('OPTION');
  var seachVar = block.getFieldValue('VAR');
  var RegexVar = /(?<=\n)\w+(?=:\nfor)/;
  var varName = Blockly.Test.getValueFromParent(block, RegexVar,
                                                  block.FUNCTION_TYPES,
                                                  seachVar, 'VAR');
  return option + ' ' + varName + ';\n';
}

// --- forEach copy -----------------------------------------------------------
/**
 * original code; only change -> added labelName for flow_statements_var
 * /
Blockly.JavaScript['controls_forEach'] = function(block) {
  // For each loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'LIST',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  var code = '';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  var listVar = argument0;
  if (!argument0.match(/^\w+$/)) {
    listVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.Variables.NAME_TYPE);
    code += 'var ' + listVar + ' = ' + argument0 + ';\n';
  }
  var indexVar = Blockly.JavaScript.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.Variables.NAME_TYPE);
  // added labelName to break/continue the loop
  var labelName = Blockly.JavaScript.variableDB_.getDistinctName(
      variable0 + '_loop', Blockly.Variables.NAME_TYPE);
  code += labelName + ':\n';
  branch = Blockly.JavaScript.INDENT + variable0 + ' = ' +
      listVar + '[' + indexVar + '];\n' + branch;
  code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
  return code;
}
/**/
