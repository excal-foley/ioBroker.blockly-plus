'use strict';

//Blockly.Constants.Regex = Blockly.Constants.Regex || {};

Blockly.Words['BLOCKLY-PLUS_regex_example_text']          = {'en': 'This (bracketed) text is found',  'de': 'Der (eingeklammerte) Text wird gefunden'  };
Blockly.Words['BLOCKLY-PLUS_regex_example_muster']        = '\\([^\\(\\)]*\\)';
Blockly.Words['BLOCKLY-PLUS_regex_example_replace']       = {'en': 'excluded',  'de': 'ausgeklammerte'  };


// --- regex_Fix --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_Fix_tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_Fix_helpurl']            = {'en': '',              'de': ''            };

Blockly.Test.blocks['BLOCKLY-PLUS_regex_Fix'] =
    '  <block type="BLOCKLY-PLUS_regex_Fix">'
    +'  </block>';

Blockly.Blocks['BLOCKLY-PLUS_regex_Fix'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('/');
    this.appendDummyInput('MUSTER')
        .appendField(new Blockly.FieldTextInput(Blockly.Words['BLOCKLY-PLUS_regex_example_muster']), 'MUSTER')
        .appendField('/');
    this.appendDummyInput('FLAG')
        .appendField(new Blockly.FieldTextInput('ig'), 'FLAG');

    this.setInputsInline(true);
    this.setOutput(true, 'Regex');
    this.setColour(Blockly.Constants.Text.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_Fix_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_Fix_helpurl'][systemLang]);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_Fix'] = function(block) {
  let muster = block.getFieldValue('MUSTER');
  let flag = block.getFieldValue('FLAG');
  return [`/${muster}/${flag}`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// --- regex_Str --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_Str_tooltip']            = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_Str_helpurl']            = {'en': '',              'de': ''            };

Blockly.Test.blocks['BLOCKLY-PLUS_regex_Str'] =
    '<block type="BLOCKLY-PLUS_regex_Str">'
    +'  <value name="MUSTER">'
    +'    <shadow type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_muster']}</field>`
    +'    </shadow>'
    +'  </value>'
    +'  <value name="FLAG">'
    +'    <shadow type="text">'
    +'      <field name="TEXT">ig</field>'
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['BLOCKLY-PLUS_regex_Str'] = {
  init: function() {
    this.appendValueInput('MUSTER')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('/');
        //.appendShadowBlock('text', {TEXT: Blockly.Words['BLOCKLY-PLUS_regex_example_muster']});
    this.appendValueInput('FLAG')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('/');
        //.appendShadowBlock('text', {TEXT: 'ig'});

    this.setInputsInline(true);
    this.setOutput(true, 'Regex');
    this.setColour(Blockly.Constants.Text.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_Str_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_Str_helpurl'][systemLang]);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_Str'] = function(block) {
  let muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_COMMA);
  let flag = Blockly.JavaScript.valueToCode(block, 'FLAG', Blockly.JavaScript.ORDER_COMMA);
  flag = (flag == "''") ? '' : ', '+flag;
  return [`new RegExp(${muster}${flag})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


// --- regex_test --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_test_match']              = {'en': 'Match',         'de': 'Entspricht'        };
Blockly.Words['BLOCKLY-PLUS_regex_test_pattern']            = {'en': 'with pattern',  'de': 'dem Muster'        };
Blockly.Words['BLOCKLY-PLUS_regex_test_tooltip']            = {'en': '',              'de': ''                  };
Blockly.Words['BLOCKLY-PLUS_regex_test_helpurl']            = {'en': '',              'de': ''                  };

Blockly.Test.blocks['BLOCKLY-PLUS_regex_test'] =
    '<block type="BLOCKLY-PLUS_regex_test">'
    +'  <value name="TEXT">'
    +'    <block type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]}</field>`
    +'    </block>'
    +'  </value>'
    +'  <value name="MUSTER">'
    +'    <shadow type="BLOCKLY-PLUS_regex_Fix">'
    +`      <field name="MUSTER">${Blockly.Words['BLOCKLY-PLUS_regex_example_muster']}</field>`
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
    this.appendValueInput('MUSTER')
        .setCheck('Regex')
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_test_pattern'][systemLang]);
        //.appendShadowBlock('regex_regex');

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(Blockly.Constants.Text.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_test_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_test_tooltip'][systemLang]);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_test'] = function(block) {
  let text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE);
  let muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_MEMBER);
  return [`${muster}.test(${text})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


// --- regex_match --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_match_find']              = {'en': 'Find in',       'de': 'Findet in'       };
Blockly.Words['BLOCKLY-PLUS_regex_match_pattern']           = {'en': 'pattern',       'de': 'Muster'          };

Blockly.Words['BLOCKLY-PLUS_regex_match_first']             = {'en': 'first',         'de': 'erstes'          };
Blockly.Words['BLOCKLY-PLUS_regex_match_last']              = {'en': 'last',          'de': 'letztes'         };
Blockly.Words['BLOCKLY-PLUS_regex_match_all']               = {'en': 'all',           'de': 'alle'            };
Blockly.Words['BLOCKLY-PLUS_regex_match_nr']                = {'en': '#',             'de': 'Nr'              };
Blockly.Words['BLOCKLY-PLUS_regex_match_nr_behind']         = {'en': 'behind #',      'de': 'Nr von hinten'   };

Blockly.Words['BLOCKLY-PLUS_regex_match_tooltip']           = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_match_helpurl']           = {'en': '',              'de': ''            };

Blockly.Test.blocks['BLOCKLY-PLUS_regex_match'] =
    '<block type="BLOCKLY-PLUS_regex_match">'
    +'  <mutation nr_input="false"></mutation>'
    +`  <field name="SELECTOR">${Blockly.Words['BLOCKLY-PLUS_regex_match_first'][systemLang]}</field>`
    +'  <value name="TEXT">'
    +'    <block type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]}</field>`
    +'    </block>'
    +'  </value>'
    +'  <value name="MUSTER">'
    +'    <shadow type="BLOCKLY-PLUS_regex_Fix">'
    +`      <field name="MUSTER">${Blockly.Words['BLOCKLY-PLUS_regex_example_muster']}</field>`
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

    this.appendValueInput('MUSTER')
        .setCheck(['String', 'Regex'])
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_match_pattern'][systemLang])
        .setAlign(Blockly.ALIGN_RIGHT);
        //.appendShadowBlock('regex_regex');

    this.setInputsInline(true);
    this.setColour(Blockly.Constants.Text.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_match_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_match_helpurl'][systemLang]);
  },

  NrInput_: false,

  mutationToDom: function() {
    let container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('nr_input', this.NrInput_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.NrInput_ = (xmlElement.getAttribute('nr_input') == 'true');
    this.updateShape_();
  },

  updateShape_: function(option = null) {
    let selector = this.getField('SELECTOR');
    option === null && selector && ( option = selector.getValue() );
    this.NrInput_ = /Nr/.test(option);

    this.setOutput(true, (option == 'ALL') ? ['String', 'Array'] : 'String')

    if (this.NrInput_) {
      let selector = this.createSelector_(option);
      this.appendValueInput('NR')
          .setCheck('Number')
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(selector, 'SELECTOR')
          .setAlign(Blockly.ALIGN_RIGHT);
          //.appendShadowBlock('math_number', {NUM: 2} );
      this.moveInputBefore('NR', 'MUSTER');
    } else {
      this.getInput('MUSTER')
          .insertFieldAt(0, this.createSelector_(option), 'SELECTOR')
    }
    this.initSvg();
  },

  createSelector_: function(option = null) {
    let nrInput = this.getInput('NR');
    this.getField('SELECTOR') && this.getInput( nrInput ? 'NR' : 'MUSTER' ).removeField('SELECTOR');
    this.removeInput('NR', true);

    let list = [
      [ Blockly.Words['BLOCKLY-PLUS_regex_match_first'][systemLang],     'FIRST'    ],
      [ Blockly.Words['BLOCKLY-PLUS_regex_match_last'][systemLang],      'LAST'     ],
      [ Blockly.Words['BLOCKLY-PLUS_regex_match_all'][systemLang],       'ALL'      ],
      [ Blockly.Words['BLOCKLY-PLUS_regex_match_nr'][systemLang],        'NR'       ],
      [ Blockly.Words['BLOCKLY-PLUS_regex_match_nr_behind'][systemLang], 'BEHIND_NR']
    ];

    let validator = function(newValue) {
      this.sourceBlock_.updateShape_(newValue);
    }
    let selector = new Blockly.FieldDropdown(list, validator);
    if (option) selector.setValue(option);

    return selector;
  }
}

Blockly.JavaScript['BLOCKLY-PLUS_regex_match'] = function(block) {
  let text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER);
  let muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_NONE);
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
      ["Array.prototype." + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + " = function (n = 1) {",
       "  if (this == null) return void 0;",
       //"  if (n === null) return this[this.length - 1];",
       //"  return this.slice(Math.max(this.length - n, 0));",
       "  return this[Math.max(this.length - n, 0)];",
       "};"
      ]
    ),
    codeNr = `.${functionName}(${nr}-1)`
  ) : '';

  let code = (selectorNr === 'ALL') ?
      `${text}.match(${muster})${codeNr} || null` :
      `(${text}.match(${muster}) || [])${codeNr} || null` ;
  return [code, Blockly.JavaScript.ORDER_LOGICAL_OR];
};


// --- regex_Fix --------------------------------------------------
Blockly.Words['BLOCKLY-PLUS_regex_replace_in']                  = {'en': 'Replace in',    'de': 'Ersetzt in'  };
Blockly.Words['BLOCKLY-PLUS_regex_replace_muster']              = {'en': 'pattern',       'de': 'Muster'      };
Blockly.Words['BLOCKLY-PLUS_regex_replace_with']                = {'en': 'with',          'de': 'mit'         };
Blockly.Words['BLOCKLY-PLUS_regex_replace_tooltip']             = {'en': '',              'de': ''            };
Blockly.Words['BLOCKLY-PLUS_regex_replace_helpurl']             = {'en': '',              'de': ''            };

Blockly.Test.blocks['BLOCKLY-PLUS_regex_replace'] =
    '<block type="BLOCKLY-PLUS_regex_replace">'
    +'  <value name="TEXT">'
    +'    <block type="text">'
    +`      <field name="TEXT">${Blockly.Words['BLOCKLY-PLUS_regex_example_text'][systemLang]}</field>`
    +'    </block>'
    +'  </value>'
    +'  <value name="MUSTER">'
    +'    <shadow type="BLOCKLY-PLUS_regex_Fix">'
    +`      <field name="MUSTER">${Blockly.Words['BLOCKLY-PLUS_regex_example_muster']}</field>`
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
    this.appendValueInput('MUSTER')
        .setCheck(['String', 'Regex'])
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_replace_muster'][systemLang])
        .setAlign(Blockly.ALIGN_RIGHT);
        //.appendShadowBlock('regex_regex');
    this.appendValueInput('NEW_TEXT')
        .setCheck(['String', 'Number'])
        .appendField(Blockly.Words['BLOCKLY-PLUS_regex_replace_with'][systemLang])
        .setAlign(Blockly.ALIGN_RIGHT);
        //.appendShadowBlock('text', {TEXT: Blockly.Words['BLOCKLY-PLUS_regex_example_replace'][systemLang]} );

    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(Blockly.Constants.Text.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_regex_replace_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_regex_replace_helpurl'][systemLang]);
  }
};

Blockly.JavaScript['BLOCKLY-PLUS_regex_replace'] = function(block) {
  let text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER);
  let muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_COMMA);
  let newText = Blockly.JavaScript.valueToCode(block, 'NEW_TEXT', Blockly.JavaScript.ORDER_COMMA);

  let code = `${text}.replace(${muster}, ${newText})`;
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**/
