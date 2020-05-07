'use strict';

goog.provide('Blockly.JavaScript.Other');

goog.require('Blockly.JavaScript');

// --- getIndex -----------------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_controls_getIndex_of']               = {'en': 'Index of',      'de': 'Index von' };
Blockly.Words['BLOCKLY-PLUS_controls_getIndex_loop']             = {'en': 'loop',          'de': 'Schleife'  };
Blockly.Words['BLOCKLY-PLUS_controls_getIndex_warn_includes']    = {'en': 'This block may only be used within a loop!',    'de': 'Dieser Block darf nur innerhalb einer Schleife verwendet werden!'                };
Blockly.Words['BLOCKLY-PLUS_controls_getIndex_tooltip']          = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_controls_getIndex_helpurl']          = {'en': '',              'de': ''            };

Blockly.Other.blocks['controls_getIndex'] =
    '<block type="controls_getIndex"></block>';

Blockly.Blocks['controls_getIndex'] = {
  init: function() {
    this.mixin(Blockly.Constants.Loops.CONTROL_FLOW_LOOP_MIXIN);

    this.appendDummyInput()
        .appendField(Blockly.Words['BLOCKLY-PLUS_controls_getIndex_of'][systemLang])
        .appendField( Blockly.Words['BLOCKLY-PLUS_controls_getIndex_loop'][systemLang],
                      'VAR_NAME' );

    this.setOutput(true, 'Number');
    this.setStyle('loop_blocks');
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_controls_getIndex_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_controls_getIndex_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  },

  // Loop types from which the value is taken
  LOOP_TYPES: ['controls_forEach', 'controls_repeat_ext'],

  // default value if no value is found or selected
  defltValue_: Blockly.Words['BLOCKLY-PLUS_controls_getIndex_loop'][systemLang],

  // warning message, if the block is incorrectly placed/configured
  warnText_: Blockly.Words['BLOCKLY-PLUS_controls_getIndex_warn_includes'][systemLang],

  // fieldName from the value to be extracted
  surroundFieldName_: 'VAR',

  // is the value to be extracted a variable
  surroundFieldIsVar_: true,

  // Prevents infinite loop by code generation
  isLoading_: false
}

// --- getIndexVar -----------------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_of']            = Blockly.Words['BLOCKLY-PLUS_controls_getIndex_of'];
Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_loop']          = Blockly.Words['BLOCKLY-PLUS_controls_getIndex_loop'];
Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_warn_includes'] = Blockly.Words['BLOCKLY-PLUS_controls_getIndex_warn_includes'];
Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_warn_variable'] = {'en': 'The variable must match the loop variable!',    'de': 'Die Variable muss mit der Schleifen-Variable übereinstimmen!'  };
Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_tooltip']       = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_helpurl']       = {'en': '',              'de': ''            };

Blockly.Other.blocks['controls_getIndexVar'] =
  '<block type="controls_getIndexVar"></block>';

Blockly.Blocks['controls_getIndexVar'] = {
  init: function() {
    this.mixin(Blockly.Constants.Loops.CONTROL_FLOW_LOOP_MIXIN);

    this.appendDummyInput()
        .appendField(Blockly.Words['BLOCKLY-PLUS_controls_getIndex_of'][systemLang])
        .appendField(new Blockly.FieldDropdown(this.getOptions_(this)), 'SELECTOR');

    this.setOutput(true, 'Number');
    this.setStyle('loop_blocks');
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  },

  // Loop types from which the value is taken
  LOOP_TYPES: ['controls_forEach'],

  // default value if no value is found or selected
  defltValue_: Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_loop'][systemLang],

  // warning message, if the block is incorrectly placed/configured
  warnText_: Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_warn_includes'][systemLang]
      +'\n'+ Blockly.Words['BLOCKLY-PLUS_controls_getIndexVar_warn_variable'][systemLang],

  // fieldName from the value to be extracted
  surroundFieldName_: 'VAR',

  // is the value to be extracted a variable
  surroundFieldIsVar_: true,

  // Prevents infinite loop by code generation
  isLoading_: false
}

Blockly.JavaScript['controls_getIndex'] =
Blockly.JavaScript['controls_getIndexVar'] = function(block) {
  let varRegex = /(?<=for\s*\(\s*(?:var|let)\s+)\w+(?=\s+in|\s*=)/;
  let blockVar = block.getVariableFromLoop_(varRegex);
  return [blockVar+'+1', Blockly.JavaScript.ORDER_ADDITION];
}

// --- set_flow_label -----------------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_deflt']         = {'en': 'Loop name',            'de': 'Schleifenname'      };
Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_warn']          = {'en': 'This block must contain one loop!',   'de': 'Dieser Block muss eine Schleife enthalten!'      };
Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_tooltip']       = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_helpurl']       = {'en': '',              'de': ''            };

Blockly.Other.blocks['BLOCKLY-PLUS_controls_set_flow_label'] =
  '<block type="BLOCKLY-PLUS_controls_set_flow_label"></block>';

Blockly.Blocks['BLOCKLY-PLUS_controls_set_flow_label'] = {
  init: function() {
    this.mixin(Blockly.Constants.Loops.CONTROL_SET_FLOW_LABEL_MIXIN);

    let defltLabel = Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_deflt'][systemLang];
    let labelField = new Blockly.FieldTextInput(defltLabel, this.getNotUsedLabelName_);
        labelField.setSpellcheck(false);

    this.appendDummyInput()
        .appendField(labelField, 'LABEL')
        .appendField(':');
    this.appendStatementInput('STATEMENT')
        .setCheck(null);

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  },

  // Loop types from which the value is taken
  LOOP_TYPES: [ 'controls_repeat', 'controls_repeat_ext', 'controls_forEach',
                'controls_for', 'controls_whileUntil' ],

  // default value if no value is found or selected
  defltValue_: Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_deflt'][systemLang],

  // warning message, if the block is incorrectly placed/configured
  warnText_: Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_warn'][systemLang]
}

Blockly.JavaScript['BLOCKLY-PLUS_controls_set_flow_label'] = function(block) {
  let statement = Blockly.JavaScript.statementToCode(block, 'STATEMENT');
  let labelName = block.getFieldValue('LABEL');
  let legalLabelName = Blockly.JavaScript.variableDB_.getName(labelName, 'label');

  // delete indent code
  statement = statement.replace(/^\s\s/gm,'');

  // insert label
  let insert = `$1${legalLabelName}:\n$2`;
  let loopStart = /((?:^|;|})\s*)((?:for|while|do)\s*\()/;
  let code = statement.replace(loopStart, insert);

  return code
}

// --- flow_label_statements -----------------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_break']         = {'en': 'Cancel',               'de': 'Beenden von'            };
Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_continue']      = {'en': 'Next execution of',    'de': 'Nächste Ausführung von'            };
Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_deflt']         = Blockly.Words['BLOCKLY-PLUS_controls_set_flow_label_deflt'];
Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_warn']          = {'en': 'This block may only be used within a loop with name!',     'de': 'Dieser Block darf nur innerhalb einer Schleife mit Namen verwendet werden!'      };
Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_tooltip']       = {'en': '',                     'de': ''            };
Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_helpurl']       = {'en': '',                     'de': ''            };

Blockly.Other.blocks['BLOCKLY-PLUS_controls_flow_label_statements'] =
  '<block type="BLOCKLY-PLUS_controls_flow_label_statements"></block>';

Blockly.Blocks['BLOCKLY-PLUS_controls_flow_label_statements'] = {
  init: function() {
    this.mixin(Blockly.Constants.Loops.CONTROL_FLOW_LOOP_MIXIN);

    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            [Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_break'][systemLang], 'BREAK'],
            [Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_continue'][systemLang], 'CONTINUE']
        ]), 'BREAK_CONTINUE')
        .appendField(new Blockly.FieldDropdown(this.getOptions_(this)), 'SELECTOR');

    this.setPreviousStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  },

  // Loop types from which the value is taken
  LOOP_TYPES: ['BLOCKLY-PLUS_controls_set_flow_label'],

  // default value if no value is found or selected
  defltValue_: Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_deflt'][systemLang],

  // warning message, if the block is incorrectly placed/configured
  warnText_: Blockly.Words['BLOCKLY-PLUS_controls_flow_label_statements_warn'][systemLang],

  // fieldName from the value to be extracted
  surroundFieldName_: 'LABEL',
}

Blockly.JavaScript['BLOCKLY-PLUS_controls_flow_label_statements'] = function(block) {
  let option = block.getFieldValue('BREAK_CONTINUE');
  let labelName = block.getField('SELECTOR').getText();
  let labelCode = Blockly.JavaScript.variableDB_.getName(labelName, 'label');
  return `${option.toLowerCase()} ${labelCode};\n`
}

// --- mixin -----------------------------------------------------------

 /**
  * This mixin adds a check to make sure the block contained a loop.
  * Otherwise disable and add warning to the block.
  * @mixin
  * @augments Blockly.Block
  * @package
  * @readonly
  */
Blockly.Constants.Loops.CONTROL_SET_FLOW_LABEL_MIXIN = {
  /**
   * Find all label names in workspace
   * @return {String[]}  Array of label names
   * @this {Blockly.Block}
   */
  getAllLabelNames_: function() {
    let labelNames = this.workspace
                         .getBlocksByType(this.type)
                         .filter( labelBlock => labelBlock != this )
                         .map( labelBlock => labelBlock.getFieldValue('LABEL'));
    return labelNames.length ? labelNames : [null]
  },

  /**
   * If newValue already exists, it will be renamed until ithe name doesn't exist
   * @callback        validator     is validator for FieldTextInput
   * @param  {String} newValue      new value input from field
   * @return {[type]}               not yet existing label name
   * @this {Blockly.FieldTextInput}
   */
  getNotUsedLabelName_: function(newValue) {
    // if newValue empty set oldValue or defaultValue
    let block = this.sourceBlock_;
    let oldValue = this.getValue();
    let defltValue = block.defltValue_;
    if (!newValue) newValue = oldValue || defltValue;
    if (newValue != oldValue || newValue == defltValue) {
      let labelNames = block.getAllLabelNames_();

      // splits the value into text and digits, to number newValue
      var [i, newValue, i] = newValue.match(/((?:.*\D)?)((?<=\D|^)\d*$)/);

      // add one until newValue+i doesn't exist; Startvalue = 2
      while (labelNames.includes(newValue+i)) i++ || i++;
      newValue = newValue + i;
    }
    return newValue
  },

  /**
   * Called whenever anything on the workspace changes.
   * Disconnect all blocks, which not included in LOOP_TYPES.
   * Disconnect all blocks after first statementBlock.
   * Disable block if no LOOP_TYPES block is connected.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this {Blockly.Block}
   */
  onchange: function(event) {
    // Don't change state if:
    // It's at the start of a drag | It's a UI event | It's in flyout
    if ( !this.workspace.isDragging || this.workspace.isDragging() ||
         this.isInFlyout || event.type == Blockly.Events.UI ) return;

    let statementBlock = this.getInput('STATEMENT').connection.targetBlock();

    if (!statementBlock) {
    // disable if there is no block in the statement
      // disable block
      this.setWarningText(this.warnText_);
      if (!this.getInheritedDisabled()) this.setDisabled(true);

    } else {
    // enable and disconnect

      // enable block
      this.setWarningText(null);
      this.setDisabled(false);

      let nextBlock = statementBlock.getNextBlock();

      // Disconnect if not included in LOOP_TYPES
      if (!this.LOOP_TYPES.includes(statementBlock.type))
                  statementBlock.previousConnection.disconnect();

      // Disconnect all blocks after first statementBlock
      else if (nextBlock) nextBlock.previousConnection.disconnect();

    }
  }
}

/**
 * This mixin adds a check to make sure the 'controls_flow_statements' block
 * is contained in a loop. Otherwise a warning is added to the block.
 * The block must have FieldDropdown named 'SELECTOR'
 * or FieldTextInput named 'VAR_NAME'
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Loops.CONTROL_FLOW_LOOP_MIXIN = {
  /**
   * Called whenever anything on the workspace changes.
   * Add warning and disable if this flow block is not nested inside a loop.
   * If block has selector, update selected option.
   * If block has no selector, set textField text.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this {Blockly.Block}
   */
  onchange: function(event) {
    // Don't change state if:
    // It's at the start of a drag | It's a UI event | It's in flyout
    if ( !this.workspace.isDragging || this.workspace.isDragging() ||
         this.isInFlyout || event.type == Blockly.Events.UI ) return;

    let selector = this.getField('SELECTOR');

    if (selector) {
    // If block has selector, update selected option.
      let options = selector.getOptions(true);
      let selectId = selector.getValue();
      let firstOption = options[0][1];
      var hasOption = selectId != 'null' &&
                      options.find(option => option[1] == selectId);

      // set 'null' for update
      selector.setValue('null');

      selector.setValue(hasOption===false ? firstOption : selectId);

    } else {
    // If block has no selector, set textField text
      let fieldName = this.surroundFieldName_;
      var surroundLoop = this.getSurroundLoop_();
      let value = surroundLoop ? surroundLoop.getField(fieldName).getText() :
                                 this.defltValue_;
      this.setFieldValue(value, 'VAR_NAME');
    }

    // Add warning and disable if this flow block is not nested inside a loop
    if (hasOption || surroundLoop) {
      // delete WarningText and enable block
      this.setWarningText(null);
      this.setDisabled(false);

    } else {
      // set WarningText and disable block
      this.setWarningText(this.warnText_);
      if (!this.getInheritedDisabled()) this.setDisabled(true);

    }
  },

  getOptions_: function(block) {
    /**
     * Callback function for generating option-list
     * If FieldVariable return [[field text], [blockId]]
     * else return [[field value], [blockId]]
     * @callback  generateOptions       generator for dropdown options
     * @return {[[String], [String]]}   dropdown option-list
     * @this {Blockly.FieldDropdown}
     */
    return function() {
      let surroundLoops = block.getSurroundLoops_();
      let fieldName = block.surroundFieldName_;
      let fieldIsVar = block.surroundFieldIsVar_;
      let defltValue = block.defltValue_;

      return surroundLoops ? fieldIsVar ?
        surroundLoops.map( surroundLoop => [ surroundLoop.getField(fieldName).getText(),
                                             surroundLoop.id ] ) :
        surroundLoops.map( surroundLoop => [ surroundLoop.getFieldValue(fieldName),
                                             surroundLoop.id ] ) :
        [ [defltValue, 'null'] ]
    }
  },

  /**
   * Get the next surround loop which included in LOOP_TYPES.
   * @param  {Blockly.Block} [startBlock=this]  starting Block
   * @return {Blockly.Block}                    next surround loop
   * @this {Blockly.Block}
   */
  getSurroundLoop_: function(startBlock = this) {
    let loopTypes = this.LOOP_TYPES;

    for ( let surroundBlock = startBlock.getSurroundParent();
          surroundBlock;
          surroundBlock = surroundBlock.getSurroundParent() ) {

      let rightStatement = loopTypes.includes(surroundBlock.type);
      let notParent = surroundBlock != this.getParent();

      if (rightStatement && notParent) return surroundBlock
    }
  },

  /**
   * Get all surround loops which included in LOOP_TYPES.
   * @return {Blockly.Block[]}  Array of surroundLoops
   * @this {Blockly.Block}
   */
  getSurroundLoops_: function() {
    let surroundLoops = [];
    for ( let lastBlock = this;
          lastBlock = this.getSurroundLoop_(lastBlock);
          surroundLoops.push(lastBlock) );
    return surroundLoops.length ? surroundLoops : null
  },

  /**
   * Get variable from surround loop.
   * If block has selector, get surroundLoop by select option.
   * If block has no selector, get next surroundLoop.
   * @param  {Regex}         varRegex The pattern to detect the value.
   * @return {String}                 value from parent
   */
  getVariableFromLoop_: function(varRegex) {

    // if the first instance current on loading, then break
    if (this.isLoading_) return;

    // get block by selectId or next surround block
    let selectId = this.getFieldValue('SELECTOR');
    let surroundLoop = selectId ? this.workspace.getBlockById(selectId) :
                                  this.getSurroundLoop_();

    if (surroundLoop) {
      // locks loading to get no infinite loop
      this.isLoading_ = true;

      // save variableDB_.dbReverse_, to delete registered variables
      let tmp_dbReverse = JSON.stringify(Blockly.JavaScript.variableDB_.dbReverse_);

      // generate code from parent-block
      let surroundLoopCode = Blockly.JavaScript[surroundLoop.type](surroundLoop);

      //restore dbReverse
      Blockly.JavaScript.variableDB_.dbReverse_ = JSON.parse(tmp_dbReverse);

      // unlocks loading
      this.isLoading_ = false;

      // extracted code with 'regexValue'
      return surroundLoopCode.match(varRegex);
    }
  }

}
