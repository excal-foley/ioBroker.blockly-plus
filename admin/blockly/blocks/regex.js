'use strict';

goog.provide('Blockly.JavaScript.Regex');

goog.require('Blockly.JavaScript');

// --- Category Regex --------------------------------------------------
Blockly.Words['Regex']                                = {'en': 'Pattern',                  'de': 'Muster'};

Blockly.CustomBlocks = Blockly.CustomBlocks || [];

if (!Blockly.CustomBlocks.includes('Regex')) {
  Blockly.CustomBlocks.push('Regex');

  Blockly.Regex = {
    HUE: '#389475',
    blocks: {}
  };
}

// --- Words Example --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_example_text']          = {'en': 'This (bracketed) text is found',  'de': 'Der (eingeklammerte) Text wird gefunden'  };
Blockly.Words['BLOCKLY-PLUS_regex_example_pattern']        = '\\([^\\(\\)]*\\)';
Blockly.Words['BLOCKLY-PLUS_regex_example_replace']       = {'en': 'excluded',  'de': 'ausgeklammerte'  };

// --- regex_fix --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_fix_tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_fix_helpurl']            = {'en': '',              'de': ''            };

Blockly.Regex.blocks['BLOCKLY-PLUS_regex_fix'] =
    '  <block type="BLOCKLY-PLUS_regex_fix">'
    +'  </block>';

Blockly.Blocks['BLOCKLY-PLUS_regex_fix'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('/');
    this.appendDummyInput('PATTERN')
        .appendField(new Blockly.FieldTextInput(Blockly.Words['BLOCKLY-PLUS_regex_example_pattern']), 'PATTERN')
        .appendField('/');
    this.appendDummyInput('FLAG')
        .appendField(new Blockly.FieldTextInput('ig'), 'FLAG');

    this.setInputsInline(true);
    this.setOutput(true, 'Regex');
    this.setColour(Blockly.Regex.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_fix_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_fix_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_fix'] = function(block) {
  let pattern = block.getFieldValue('PATTERN');
  let flag = block.getFieldValue('FLAG');
  return [`/${pattern}/${flag}`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- regex_str --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_str_tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_str_helpurl']            = {'en': '',              'de': ''            };

Blockly.Regex.blocks['BLOCKLY-PLUS_regex_str'] =
    '<block type="BLOCKLY-PLUS_regex_str">'
    +'  <value name="PATTERN">'
    +'    <shadow type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_pattern']}</field>`
    +'    </shadow>'
    +'  </value>'
    +'  <value name="FLAG">'
    +'    <shadow type="text">'
    +'      <field name="TEXT">ig</field>'
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['BLOCKLY-PLUS_regex_str'] = {
  init: function() {
    this.appendValueInput('PATTERN')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('/');
        //.appendShadowBlock('text', {TEXT: Blockly.Words['BLOCKLY-PLUS_regex_example_pattern']});
    this.appendValueInput('FLAG')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('/');
        //.appendShadowBlock('text', {TEXT: 'ig'});

    this.setInputsInline(true);
    this.setOutput(true, 'Regex');
    this.setColour(Blockly.Regex.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_str_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_str_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_str'] = function(block) {
  let pattern = Blockly.JavaScript.valueToCode(block, 'PATTERN', Blockly.JavaScript.ORDER_COMMA);
  let flag = Blockly.JavaScript.valueToCode(block, 'FLAG', Blockly.JavaScript.ORDER_COMMA);
  flag = (flag == "''") ? '' : ', '+flag;
  return [`new RegExp(${pattern}${flag})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- regex_test --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_test_match']              = {'en': 'Match',         'de': 'Entspricht'        };
Blockly.Words['BLOCKLY-PLUS_regex_test_pattern']            = {'en': 'with pattern',  'de': 'dem Muster'        };
Blockly.Words['BLOCKLY-PLUS_regex_test_tooltip']            = {'en': '',              'de': ''                  };
Blockly.Words['BLOCKLY-PLUS_regex_test_helpurl']            = {'en': '',              'de': ''                  };

Blockly.Regex.blocks['BLOCKLY-PLUS_regex_test'] =
    '<block type="BLOCKLY-PLUS_regex_test">'
    +'  <value name="TEXT">'
    +'    <block type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]}</field>`
    +'    </block>'
    +'  </value>'
    +'  <value name="PATTERN">'
    +'    <shadow type="BLOCKLY-PLUS_regex_fix">'
    +`      <field name="PATTERN">${Blockly.Words['BLOCKLY-PLUS_regex_example_pattern']}</field>`
    +'      <field name="FLAG">ig</field>'
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['BLOCKLY-PLUS_regex_test'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_test_match'][systemLang]);
    this.appendValueInput('PATTERN')
        .setCheck('Regex')
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_test_pattern'][systemLang]);
        //.appendShadowBlock('regex_regex');

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(Blockly.Regex.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_test_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_test_tooltip'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_test'] = function(block) {
  let text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE);
  let pattern = Blockly.JavaScript.valueToCode(block, 'PATTERN', Blockly.JavaScript.ORDER_MEMBER);
  return [`${pattern}.test(${text})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- regex_match --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_match_find']              = {'en': 'Find in',       'de': 'Findet in'       };
Blockly.Words['BLOCKLY-PLUS_regex_match_pattern']           = {'en': 'pattern',       'de': 'Muster'          };

Blockly.Words['BLOCKLY-PLUS_regex_match_first']             = {'en': 'first',         'de': 'erstes'          };
Blockly.Words['BLOCKLY-PLUS_regex_match_last']              = {'en': 'last',          'de': 'letztes'         };
Blockly.Words['BLOCKLY-PLUS_regex_match_all']               = {'en': 'all',           'de': 'alle'            };
Blockly.Words['BLOCKLY-PLUS_regex_match_nr']                = {'en': '#',             'de': 'Nr'              };
Blockly.Words['BLOCKLY-PLUS_regex_match_behind_nr']         = {'en': 'behind #',      'de': 'Nr von hinten'   };

Blockly.Words['BLOCKLY-PLUS_regex_match_tooltip']           = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_match_helpurl']           = {'en': '',              'de': ''            };

Blockly.Regex.blocks['BLOCKLY-PLUS_regex_match'] =
    '<block type="BLOCKLY-PLUS_regex_match">'
    +'  <mutation nr_input="false"></mutation>'
    +`  <field name="SELECTOR">${Blockly.Words['BLOCKLY-PLUS_regex_match_first'][systemLang]}</field>`
    +'  <value name="TEXT">'
    +'    <block type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]}</field>`
    +'    </block>'
    +'  </value>'
    +'  <value name="PATTERN">'
    +'    <shadow type="BLOCKLY-PLUS_regex_fix">'
    +`      <field name="PATTERN">${Blockly.Words['BLOCKLY-PLUS_regex_example_pattern']}</field>`
    +'      <field name="FLAG">ig</field>'
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['BLOCKLY-PLUS_regex_match'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_match_find'][systemLang]);
        //.appendShadowBlock('text', {TEXT: Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]} );

    this.appendValueInput('PATTERN')
        .setCheck(['String', 'Regex'])
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_match_pattern'][systemLang])
        .setAlign(Blockly.ALIGN_RIGHT);
        //.appendShadowBlock('regex_regex');

    this.setInputsInline(true);
    this.setColour(Blockly.Regex.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_match_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_match_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  },

  option_: 'FIRST',

  // save selector option
  mutationToDom: function() {
    let container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('option', this.option_);
    return container;
  },

  // restore selector option
  domToMutation: function(xmlElement) {
    this.option_ = xmlElement.getAttribute('option') || this.option_;
    this.updateShape_();
  },

  updateShape_: function(option = this.option_) {
    this.option_ = option;
    let selector = this.getField('SELECTOR');
    let hasNrInput = /NR/.test(option);

    // set output-connection
    this.setOutput(true, (option == 'ALL') ? ['String', 'Array'] : 'String');

    // has number input
    if (hasNrInput && !this.getInput('NR')) {
      // remove field, if exist
      if (selector) this.getInput('PATTERN').removeField('SELECTOR');

      // set new valueInput
      selector = this.getSelector_(selector);
      this.appendValueInput('NR')
          .setCheck('Number')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(selector, 'SELECTOR')
          .setAlign(Blockly.ALIGN_RIGHT);
          //.appendShadowBlock('math_number', {NUM: 2} );
      this.moveInputBefore('NR', 'PATTERN');

    // hasn't number input
    } else if(!hasNrInput && (!selector || selector.getParentInput().name != 'PATTERN')) {
      // remove input, if exist
      this.removeInput('NR', true);

      // set new field
      this.getInput('PATTERN').insertFieldAt(0, this.getSelector_(selector), 'SELECTOR');
    }
  },

  getSelector_: function(selector) {
    // Validator for selector
    let validator = (newValue) => this.updateShape_(newValue);

    // new selector, if it not exist
    if (!selector) {
      // @return {[human-readable, language-neutral]}  option for list
      let getOption = ( name, lowerName = name.toLowerCase() ) =>
          [ Blockly.Words['BLOCKLY-PLUS_regex_match_'+lowerName][systemLang], name ];

      // generate optionlist
      let optionList = ['FIRST', 'LAST', 'ALL', 'NR', 'BEHIND_NR'];
      optionList.forEach( (item, i) => optionList[i] = getOption(item) );

      return selector = new Blockly.FieldDropdown(optionList, validator)

    // restore validator, if selector exist
    } else {
      selector.setValidator(validator);
      return selector;
    }
  }
}

Blockly.JavaScript['BLOCKLY-PLUS_regex_match'] = function(block) {
  let text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER);
  let pattern = Blockly.JavaScript.valueToCode(block, 'PATTERN', Blockly.JavaScript.ORDER_NONE);
  let selectorNr = block.getFieldValue('SELECTOR');
  let nr = Blockly.JavaScript.valueToCode(block, 'NR', Blockly.JavaScript.ORDER_NONE) || 1;
  let codeNr, functionName;

  (selectorNr === 'ALL')   ? codeNr = '' :
  (selectorNr === 'FIRST') ? codeNr = '[0]' :
  (selectorNr === 'NR')    ? codeNr = `[${nr}-1]` : '';
  (selectorNr === 'LAST') ||
  (selectorNr === 'BEHIND_NR') ? (
    functionName = Blockly.JavaScript.provideFunction_(
      'getLastElement',
      [`Array.prototype.${Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_} = function (n=1) {`,
       `  if (this == null) return void 0;`,
       `  return this[Math.max(this.length - n, 0)];`,
       `};`
      ]
    ),
    codeNr = `.${functionName}(${nr}-1)`
  ) : '';

  let code = (selectorNr === 'ALL') ?
      `${text}.match(${pattern})${codeNr} || null` :
      `(${text}.match(${pattern}) || [])${codeNr} || null` ;
  return [code, Blockly.JavaScript.ORDER_LOGICAL_OR];
};


// --- regex_fix --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_replace_in']                  = {'en': 'Replace in',    'de': 'Ersetzt in'  };
Blockly.Words['BLOCKLY-PLUS_regex_replace_pattern']              = {'en': 'pattern',       'de': 'Muster'      };
Blockly.Words['BLOCKLY-PLUS_regex_replace_with']                = {'en': 'with',          'de': 'mit'         };
Blockly.Words['BLOCKLY-PLUS_regex_replace_tooltip']             = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_replace_helpurl']             = {'en': '',              'de': ''            };

Blockly.Regex.blocks['BLOCKLY-PLUS_regex_replace'] =
    '<block type="BLOCKLY-PLUS_regex_replace">'
    +'  <value name="TEXT">'
    +'    <block type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]}</field>`
    +'    </block>'
    +'  </value>'
    +'  <value name="PATTERN">'
    +'    <shadow type="BLOCKLY-PLUS_regex_fix">'
    +`      <field name="PATTERN">${Blockly.Words['BLOCKLY-PLUS_regex_example_pattern']}</field>`
    +'      <field name="FLAG">ig</field>'
    +'    </shadow>'
    +'  </value>'
    +'  <value name="NEW_TEXT">'
    +'    <shadow type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_replace'][systemLang]}</field>`
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['BLOCKLY-PLUS_regex_replace'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_replace_in'][systemLang]);
        //.appendShadowBlock('text', {TEXT: Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]} );
    this.appendValueInput('PATTERN')
        .setCheck(['String', 'Regex'])
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_replace_pattern'][systemLang])
        .setAlign(Blockly.ALIGN_RIGHT);
        //.appendShadowBlock('regex_regex');
    this.appendValueInput('NEW_TEXT')
        .setCheck(['String', 'Number'])
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_replace_with'][systemLang])
        .setAlign(Blockly.ALIGN_RIGHT);
        //.appendShadowBlock('text', {TEXT: Blockly.Words['BLOCKLY-PLUS_regex_example_replace'][systemLang]} );

    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(Blockly.Regex.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_replace_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_replace_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_replace'] = function(block) {
  let text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER);
  let pattern = Blockly.JavaScript.valueToCode(block, 'PATTERN', Blockly.JavaScript.ORDER_COMMA);
  let newText = Blockly.JavaScript.valueToCode(block, 'NEW_TEXT', Blockly.JavaScript.ORDER_COMMA);

  let code = `${text}.replace(${pattern}, ${newText})`;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**/
