'use strict';
/**///###########################    Functions - Blocks set    ###########################//
/**//***************************    Block Setzten Funktion    ***************************///
BOB_.setArrayBlock = function(setJson) {
  //Block definieren
  Blockly.Blocks[setJson.name] = {
    replaceBracket: setJson.replaceBracket || false,
    input0: {
      options_: setJson.option0,
      addBlock_: typeof setJson.addBlock0 != 'undefined' ? setJson.addBlock0
                                                         : setJson.addBlock,
      inputCheck_: typeof setJson.inputCheck0 != 'undefined' ? setJson.inputCheck0
                                                             : setJson.inputCheck
    },
    inputs: {
      options_: setJson.options || [BOB_.op.END.dp, ...setJson.option0],
      addBlock_: setJson.addBlock,
      inputCheck_: setJson.inputCheck
    },

    init: function() {
      // Inputs set by Blockly.Constants.ARRAY_BLOCK_MIXIN.setInputAndOption_(n)

      this.setInputsInline(true);
      this.setOutput(true, setJson.outputType);
      this.setColour(this.getMsgCat('HUE'));
      this.setTooltip(setJson.tooltip);
      this.setHelpUrl(setJson.helpUrl);
      this.initSvg();
    },

    /**//***************************    Mutator    ***************************///
    valueCount_: 0,

    //Wird aufgerufen, wenn ein Block eingefügt wird
    mutationToDom: function() {
      let container = Blockly.utils.xml.createElement('mutation');
      container.setAttribute('valuecount_xml', this.valueCount_);
      return container;
    },

    domToMutation: function(xmlElement) {
      this.valueCount_ = parseInt(xmlElement.getAttribute('valuecount_xml'), 10) || 0;
      this.updateShape_();
    },

    updateShape_: function(valueNum = 0, option = false) {
      // if no input, create new
      if ( !this.getInput('value0') ) {
        for (let i = 0; i <= this.valueCount_; i++) {
          this.setInputAndOption_(i);
        }
      }

      // remove inputs after 'END'
      if (option == 'END' && valueNum < this.valueCount_ && option) {
          for (let i = valueNum+1; i <= this.valueCount_; i++) {
              this.removeInput('value'+i);
          }
          // update dummy-input
          this.removeInput('dummy');
          this.setOption_(this.appendDummyInput('dummy'), valueNum);
          this.valueCount_ = valueNum;
      } else

      // add new option
      if (option != 'END' && option
          && valueNum == this.valueCount_ || !this.valueCount_) {
        this.valueCount_ += 1;
        this.setInputAndOption_(this.valueCount_, option);
      }
    },

    setInputAndOption_: function(n, opt_option) {
    // Erstellt den Input und den Operations-Wähler
      var inputPara = (n > 0) ? this.inputs : this.input0;

        this.appendValueInput('value'+n)
            .setCheck(inputPara.inputCheck_)
            .appendShadowBlock(inputPara.addBlock_.block,
                                inputPara.addBlock_.value);

      // delete dummy-input
      this.removeInput('dummy', true);

      if (n > 0) this.setOption_(this.getInput('value'+n), n-1, opt_option);
      this.setOption_(this.appendDummyInput('dummy'), n);
      this.initSvg();
    },

    setOption_: function(input, n, opt_option) {
      var inputPara = (n > 0) ? this.inputs : this.input0;
      input.insertFieldAt(0, new Blockly.FieldDropdown(inputPara.options_,
                // validator
                function(option) {
                  this.sourceBlock_.updateShape_(n,option);
                }), 'operator'+n);
      if (n > 0 && opt_option) this.getField('operator'+n).setValue(opt_option);
    }
  }

  //Toolbox
  BOB_.registerBlock(setJson.name, null, setJson.xmlCode);

  /**//***************************    Javascript    ***************************///
  Blockly.JavaScript[setJson.name] = function(block) {
    // Bitet verschiedene Rechenoperationen an
    var maxOrder = 0, pair = [], code = '';
    var bracket = /(?<=%\{).*(?=%\})|^(?:(?<!%\{).)*$/;
    var param = [ '',
                  /((?<=[^%])|^)%4/g,
                  /((?<=[^%])|^)%3/g ];

    for (let i = 0; block.getField('operator'+i); i++) {
      // op 0=Name; 1=code; 2=Order;
      var op = BOB_.getOP( block, 'operator'+(i-1) ) || BOB_.op.ATOMIC;
      var value = Blockly.JavaScript.valueToCode(block, 'value'+i, Blockly.JavaScript.ORDER_NONE)
                      || block.getFieldValue('value'+i) || '0';

      if (i > 0 && block.replaceBracket) {
        // if value = variable then use square, else remove '/"
        if (!/^['"][A-Za-z_]*[\w]*['"]$|^[\d]+$/.test(value)
            && value != 'true' && value != 'false')
          op = BOB_.op.SQUARE;
          value = value.replace(/^['"]|['"]$/g, '');
      }
      pair.push( op.code.replace(param[2], value) );
      maxOrder = (op.order > maxOrder) ? op.order : maxOrder;
    }
    pair.forEach(value => {
      code = code.replace( bracket, value.replace( param[1], code.match(bracket) ) );
      return code;
    });
    code = code.replace(/(%\{)|(%\})/g, '');
    return [code, maxOrder];
  }
}

/**//***************************    Javascript    ***************************//*/
let arrayBlock_Java = function(block) {
  // Bitet verschiedene Rechenoperationen an
  let maxOrder = 0;
  for (let i = 0; block.getField('operator'+i); i++) {
    // 0=Name; 1=code; 2=Order;
    var op = BOB_.getOP(block,'operator'+i);
    var value = Blockly.JavaScript.valueToCode(block, 'value'+i, op.order) || '0';
    var code = BOB_.genOpCode(code, value, op);
    maxOrder = (op.order > maxOrder) ? op.order : maxOrder;
  }
  return [code, maxOrder];
}

/**///###########################    multiarithmetic setzen    ###########################//
BOB_.setArrayBlock({
  name: 'math_multiarithmetic',
//  check: ['Boolean', 'Number'],
  option0: Blockly.ownBlocks.dp.math,
  outputType: 'Number',
  inputCheck: ['Boolean', 'Number'],
  tooltip: '',
  helpUrl: '',
  addBlock: {block: 'math_number', value: {'NUM': 0}},
  xmlCode:  ['  <block type="%%BLOCK_NAME%%">',
             '    <mutation valuecount_xml="2"></mutation>',
             '    <field name="operator0">PLUS</field>',
             '    <field name="operator1">MINUS</field>',
             '    <field name="operator2">END</field>',
             '    <value name="value0">',
             '      <shadow type="math_number">',
             '        <field name="NUM">10</field>',
             '      </shadow>',
             '    </value>',
             '    <value name="value1">',
             '      <shadow type="math_number">',
             '        <field name="NUM">4</field>',
             '      </shadow>',
             '    </value>',
             '    <value name="value2">',
             '      <shadow type="math_number">',
             '        <field name="NUM">6</field>',
             '      </shadow>',
             '    </value>',
             '  </block>'
            ]
});

/**///###########################    logic_multicompare    ###########################//
BOB_.setArrayBlock({
  name: 'logic_multicompare',
//  check: ['Boolean', 'Number'],
  option0: Blockly.ownBlocks.dp.logic,
  outputType: 'Boolean',
  inputCheck: ['Boolean', 'Number'],
  tooltip: '',
  helpUrl: '',
  addBlock: {},
  xmlCode:  ['  <block type="%%BLOCK_NAME%%">',
             '    <mutation valuecount_xml="2"></mutation>',
             '    <field name="operator0">AND</field>',
             '    <field name="operator1">OR</field>',
             '    <field name="operator2">END</field>',
             '  </block>'
            ]
});

/**///###########################    system_prop    ###########################//
BOB_.setArrayBlock({
  name: 'system_prop2',
  replaceBracket: true,
  option0: [BOB_.op.DOT.dp, BOB_.op.SQUARE.dp],
  outputType: null,
  inputCheck: ['Boolean', 'String', 'Number'],
  inputCheck0: ['Object', 'String'],
  tooltip: '',
  helpUrl: '',
  addBlock0: {block: 'system_getObject'},
  addBlock: {block: 'text'},
  xmlCode: ['  <block type="%%BLOCK_NAME%%">',
            '    <mutation valuecount_xml="1"></mutation>',
//            '    <field name="operator0">DOT</field>',
//            '    <field name="operator1">END</field>',
            '    <value name="value0">',
//            '      <shadow type="field_oid">',
//            '        <field name="oid">default</field>',
//            '      </shadow>',
            '      <block type="system_getObject">',
            '        <value name="OBJECT">',
  //          '          <shadow type="field_oid">',
  //          '            <field name="oid">default</field>',
  //          '          </shadow>',
            '        </value>',
            '      </block>',
            '    </value>',
//            '    <value name="value1">',
//            '      <shadow type="text">',
//            '        <field name="TEXT"></field>',
//            '      </shadow>',
//            '    </value>',
            '  </block>'
          ] /**/
});

/** ///###########################    field_oids    ###########################//
BOB_.setArrayBlock({
  name: 'system_field_oids',
  option0: [BOB_.op.OR.dp],
  outputType: ['String', 'Regex'],
  inputCheck: 'String',
  tooltip: '',
  helpUrl: '',
  addBlock: {block: 'field_oid'}//,
//  xmlCode: ['  <block type="%%BLOCK_NAME%%">',
});

Blockly.JavaScript['system_field_oids'] = function(block) {

  var oid, oids = [];
  for (var i = 0; block.getField('operator'+i); i++) {
      var id = Blockly.JavaScript.valueToCode(block, 'value'+i, Blockly.JavaScript.ORDER_COMMA);
      if (id && oids.indexOf(id) === -1) oids.push(id);
  }

  var triggerBlock = this.getParent();
  if (!(triggerBlock && triggerBlock.type == 'on_ext')) return ['', 0];

  oid = oids.join(' + "|" + ');
  if (triggerBlock.itemCount_ = 1) {
    oid = oid.replace(/\./g, '\\\\.').replace(/\(/g, '\\\\(').replace(/\)/g, '\\\\)').replace(/\[/g, '\\\\[');
    oid = 'new RegExp(' + (oid || '') + ')';
  }
  return [oid, Blockly.JavaScript.ORDER_ATOMIC];
}

/** ///###########################    system_prop    ###########################//
Blockly.JavaScript['system_prop2'] = function(block) {
  // Bitet verschiedene Rechenoperationen an
  var maxOrder = 0, pair = [], code = '';
  for (let i = 0; block.getField('operator'+i); i++) {
    // 0=Name; 1=code; 2=Order;
    var op = BOB_.getOP( block, 'operator'+(i-1) ) || BOB_.op.ATOMIC;
    var value = Blockly.JavaScript.valueToCode(block, 'value'+i, Blockly.JavaScript.ORDER_NONE) || '0';

    // check is variable
    if (i > 0) {
      if (!/^['"][A-Za-z_]*[\w]*['"]$|^[\d]+$/.test(value)
          && value != 'true' && value != 'false')
        op = BOB_.op.SQUARE;
        value = value.replace(/^['"]|['"]$/g, '');
    }
    pair.push( op.code.replace(/((?<=[^%])|^)%2/g, value) );
    maxOrder = (op.order > maxOrder) ? op.order : maxOrder;
  }
  pair.forEach(value => code = value.replace(/((?<=[^%])|^)%1/g, code) );
  return [code, maxOrder];
} /**/
