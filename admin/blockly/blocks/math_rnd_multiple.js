'use strict';

//goog.provide('Blockly.JavaScript.Test');

goog.require('Blockly.JavaScript');

// --- math_rnd_multiple --------------------------------------------------
Blockly.Words['math_rnd_multiple_rounds']             = {'en': 'Rounds',                  'de': 'Runde'};
Blockly.Words['math_rnd_multiple_roundup']            = {'en': 'Round Up',                'de': 'Runde auf'};
Blockly.Words['math_rnd_multiple_rounddown']          = {'en': 'Round Down',              'de': 'Runde ab'};
Blockly.Words['math_rnd_multiple_multiple_of']        = {'en': 'to multiple of',          'de': 'zu Vielfaches von'};
Blockly.Words['math_rnd_multiple_absolut']            = {'en': '|  Absolute',             'de': '|  Betrag'};
Blockly.Words['math_rnd_multiple_value']              = {'en': '|  Value',                'de': '|  Wert'};
Blockly.Words['math_rnd_multiple_Tooltip']            = {'en': '',                        'de': ''};
Blockly.Words['math_rnd_multiple_HelpUrl']            = {'en': '',                        'de': ''};


Blockly.Test.blocks['math_rnd_multiple'] =
    '<block type="math_rnd_multiple">'
    +'  <field name="DIRECTION">ROUNDS</field>'
    +'  <value name="NUMBER">'
    +'    <shadow type="math_number">'
    +'      <field name="NUM">12.268</field>'
    +'    </shadow>'
    +'  </value>'
    +'  <value name="MULTIPLE">'
    +'    <shadow type="math_number">'
    +'      <field name="NUM">0.5</field>'
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['math_rnd_multiple'] = {
  init: function() {
    let validator = function(newValue) {
      var isRounds = (newValue == 'ROUNDS');
      this.sourceBlock_.updateShape_(isRounds);
    };

    this.appendValueInput('NUMBER')
        .setCheck('Number')
        .appendField(new Blockly.FieldDropdown([
                [Blockly.Words['math_rnd_multiple_rounds'][systemLang],"ROUNDS"],
                [Blockly.Words['math_rnd_multiple_roundup'][systemLang],"ROUNDUP"],
                [Blockly.Words['math_rnd_multiple_rounddown'][systemLang],"ROUNDDOWN"]
        ], validator), "DIRECTION");
      //  .appendShadowBlock('math_number', {NUM: 3.1415} );
    this.appendValueInput('MULTIPLE')
        .setCheck('Number')
        .appendField(Blockly.Words['math_rnd_multiple_multiple_of'][systemLang]);
    //    .appendShadowBlock('math_number', {NUM: 0.01} );

    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(Blockly.Constants.Math.HUE);
    this.setTooltip(Blockly.Words['math_rnd_multiple_Tooltip']);
    this.setHelpUrl(Blockly.Words['math_rnd_multiple_HelpUrl']);
    this.initSvg();
  },

  /**
   * Create XML to represent whether the 'isRounds' should be present.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    var isRounds = (this.getFieldValue('DIRECTION') == 'ROUNDS');
    container.setAttribute('is_rounds', isRounds);
    return container;
  },
  /**
   * Parse XML to restore the 'isRounds'.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    var isRounds = (xmlElement.getAttribute('is_rounds') == 'true');
    this.updateShape_(isRounds);
  },
  /**
   * Modify this block to have (or not have) an query for 'absolute or value'.
   * @param {boolean} isRounds True if this block has no query input.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function(isRounds) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('INPUT_VALUETYPE');
    if (!isRounds && !inputExists) {
      this.appendDummyInput('INPUT_VALUETYPE')
          .appendField(new Blockly.FieldDropdown([
                    [Blockly.Words['math_rnd_multiple_absolut'][systemLang], "ABSOLUT"],
                    [Blockly.Words['math_rnd_multiple_value'][systemLang], "VALUE"]
          ]), "VALUETYPE");
    } else if (isRounds && inputExists) {
      this.removeInput('INPUT_VALUETYPE');
    }
  }
}

Blockly.JavaScript['math_rnd_multiple'] = function(block) {

  let number = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_ATOMIC);
  let multiple = Blockly.JavaScript.valueToCode(block, 'MULTIPLE', Blockly.JavaScript.ORDER_ATOMIC);
  let directionText = block.getFieldValue('DIRECTION');
  let ignoreSign = block.getFieldValue('VALUETYPE') == 'ABSOLUT';

  let functionName = Blockly.JavaScript.provideFunction_(
    "RoundMultible",
    [ "/**",
      " * Round a number to multiple",
      " * @param  {number}  number             The number to round",
      " * @param  {number}  multiple           The mutible to round",
      " * @param  {number}  [direction=0]       0 = Round next Number",
      " *                                       1 = Round up",
      " *                                      -1 = Round down",
      " * @param  {boolean} [ignoreSign=false] true = ignore sign at Round up&down",
      " * @return {number}",
      " */",
      "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "( number, multiple,",
      "                        direction = 0,",
      "                        ignoreSign = false ) {",
      "  ",
      "  if (ignoreSign && number < 0) direction = -direction;",
      "  ",
      "  // convert multiple in fraction to avoid IEEE754 calculation error",
      "  let numerator = 1 / (multiple % 1 || 1);",
      "  let denominator = multiple * numerator;",
      "  ",
      "  number = number * numerator / denominator;",
      "  number = direction < 0 ? Math.floor(number) * denominator / numerator :",
      "           direction > 0 ? Math.ceil(number) * denominator / numerator :",
      "                           Math.round(number) * denominator / numerator;",
      "  return +number.toFixed(14);",
      "}"
    ]
  );
  ignoreSign = ignoreSign ? ', true' : '';
  let direction = directionText == 'ROUNDDOWN' ? ', -1' :
                  directionText == 'ROUNDUP'   ? ', 1' :
                  ignoreSign != ''             ? ', 0' :
                                                 '';
  let code = functionName + '(' + number + ', '
              + multiple + direction + ignoreSign + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}
