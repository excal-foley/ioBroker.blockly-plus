'use strict';

Blockly.Constants.Regex = Blockly.Constants.Regex || {};

/**///###########################    RegEx    ###########################//
BOB_.registerBlock('regex_regex');

Blockly.Blocks['regex_regex'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('/');
    this.appendDummyInput('MUSTER')
        .appendField(new Blockly.FieldTextInput('\\([^\\(\\)]*\\)'), 'MUSTER')
        .appendField('/');
    this.appendDummyInput('FLAG')
        .appendField(new Blockly.FieldTextInput('ig'), 'FLAG');

    this.setInputsInline(true);
    this.setColour(this.getMsgCat('HUE'));
    this.setOutput(true, 'Regex');
    this.setTooltip(Blockly.Words['field_oid_tooltip'][systemLang]);
    this.initSvg();
  }
};

Blockly.JavaScript['regex_regex'] = function(block) {
  var muster = block.getFieldValue('MUSTER');
  var flag = block.getFieldValue('FLAG');
  return ['/' + muster + '/' + flag, Blockly.JavaScript.ORDER_ATOMIC];
};

/**///###########################    StringToRegEx    ###########################//
BOB_.registerBlock('regex_StringToRegEx');

Blockly.Blocks['regex_StringToRegEx'] = {
  init: function() {
    this.appendValueInput('MUSTER')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('/')
        .appendShadowBlock('text', {TEXT: '\\([^\\(\\)]*\\)'});
    this.appendValueInput('FLAG')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('/')
        .appendShadowBlock('text', {TEXT: 'ig'});

    this.setInputsInline(true);
    this.setColour(this.getMsgCat('HUE'));
    this.setOutput(true, 'Regex');
    this.setTooltip(Blockly.Words['field_oid_tooltip'][systemLang]);
    this.initSvg();
  }
};

Blockly.JavaScript['regex_StringToRegEx'] = function(block) {
  var muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_ATOMIC);
  var flag = Blockly.JavaScript.valueToCode(block, 'FLAG', Blockly.JavaScript.ORDER_ATOMIC);
  flag = flag == "''" ? '' : ', ' + flag;
  //flag && (flag = ', ' + flag);
  return ['new RegExp(' + muster + flag + ')', Blockly.JavaScript.ORDER_ATOMIC];
};

/**///###########################    RegEx Test    ###########################//
BOB_.registerBlock('regex_test');
Blockly.Blocks['regex_test'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('Entspricht')
        .appendShadowBlock('text', {TEXT: '(in Klammern)'} );
    this.appendValueInput('MUSTER')
        .setCheck('Regex')
        .appendField('dem Muster')
        .appendShadowBlock('regex_regex');

    this.setOutput(true, ['Array','String'])

    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setColour(this.getMsgCat('HUE'));
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  }
};

Blockly.JavaScript['regex_test'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_ATOMIC);
  var code = muster + '.test(' + text + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


/**///###########################    RegEx match    ###########################//
BOB_.registerBlock('regex_match');
Blockly.Blocks['regex_match'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('Findet in')
        .appendShadowBlock('text', {TEXT: '(in Klammern)'} );

    this.appendValueInput('MUSTER')
        .setCheck(['String', 'Regex'])
        .appendField('Muster')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendShadowBlock('regex_regex');

    this.setInputsInline(true);
    this.setColour(this.getMsgCat('HUE'));
    this.setTooltip('');
    this.setHelpUrl('');
    this.updateShape_();
    this.initSvg();
  },

  /**//***************************    Mutator    ***************************///
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
    var selector = this.getField('SELECTOR');
    option === null && selector && ( option = selector.getValue() );
    this.NrInput_ = /Nr/.test(option);

    option == 'all'
        ? this.setOutput(true, ['String', 'Array'])
        : this.setOutput(true, 'String');

    if (this.NrInput_) {
      var selector = this.createSelector_(option);
      /*var nrInput =*/ this.appendValueInput('NR')
                        .setCheck('Number')
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField(selector, 'SELECTOR')
                      /*  .setAlign(Blockly.ALIGN_RIGHT);
      nrInput*/.appendShadowBlock('math_number', {NUM: 2} );
      this.moveInputBefore('NR', 'MUSTER');
    } else {
      this.getInput('MUSTER')
          .insertFieldAt(0, this.createSelector_(option), 'SELECTOR')
    }
    this.initSvg();
  },

  createSelector_: function(option = null) {
    var nrInput = this.getInput('NR');
    this.getField('SELECTOR') && this.getInput( nrInput ? 'NR' : 'MUSTER' ).removeField('SELECTOR');
    this.removeInput('NR', true);

    var selector = new Blockly.FieldDropdown([
        ['Erstes','first'], ['Letztes','last'], ['alle','all'], ['Nr','Nr'], ['Nr von hinten','NrBehind'] ]);
    option && selector.setValue(option);
    selector.setValidator(function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    return selector;
  }
}

/**//***************************    JavaScript    ***************************///
Blockly.JavaScript['regex_match'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_ATOMIC);
  var selectorNr = block.getFieldValue('SELECTOR');
  var nr = Blockly.JavaScript.valueToCode(block, 'NR', Blockly.JavaScript.ORDER_ATOMIC) || 1;
  var codeNr, functionName;

  selectorNr === 'all'   ? codeNr = '' :
  selectorNr === 'first' ? codeNr = '[0]' :
  selectorNr === 'Nr'    ? codeNr = '[' + nr + '-1]' : '';
  selectorNr === 'last' ||
  selectorNr === 'NrBehind' ? (
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
    codeNr = '.' + functionName + '(' + nr + ')'
  ) : '';

  //var code = text + '.match(' + muster + ')' + codeNr;
  var code;
  selectorNr === 'all' ?
      code =       text + '.match(' + muster + ')' +             codeNr + ' || null' :
      code = '(' + text + '.match(' + muster + ')' + ' || [])' + codeNr + ' || null' ;
  return [code, Blockly.JavaScript.ORDER_LOGICAL_OR];
};


/**///###########################    RegEx replace    ###########################//
BOB_.registerBlock('regex_replace');
Blockly.Blocks['regex_replace'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('Ersetzt in')
        .appendShadowBlock('text', {TEXT: 'Hallo %1, wie gehts?'} );
    this.appendValueInput('MUSTER')
        .setCheck(['String', 'Regex'])
        .appendField('Muster')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendShadowBlock('regex_regex');
    this.appendValueInput('NEW_TEXT')
        .setCheck(['String', 'Number'])
        .appendField('mit')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendShadowBlock('text', {TEXT: 'Max'} );

    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.setColour(this.getMsgCat('HUE'));
    this.setTooltip('');
    this.setHelpUrl('');
    this.initSvg();
  }
};

Blockly.JavaScript['regex_replace'] = function(block) {
  var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var muster = Blockly.JavaScript.valueToCode(block, 'MUSTER', Blockly.JavaScript.ORDER_ATOMIC);
  var newText = Blockly.JavaScript.valueToCode(block, 'NEW_TEXT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = text + '.replace(' + muster +', ' + newText + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
/**/
