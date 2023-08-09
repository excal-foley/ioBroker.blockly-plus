'use strict';
/**
 * #######################################################################
 * ############################  DEVELOPMENT  ############################
 * #######################################################################
 */

//goog.provide('Blockly.Blocks.Other');

goog.require('Blockly.JavaScript');

Blockly.Multiplex = {};
Blockly.Multiplex.field = {};
Blockly.Multiplex.fields = {};
Blockly.Multiplex.item = {};
Blockly.Multiplex.validator = {};

var systemLang = systemLang || 'en';//// TODO: delete this and mak compatible with ioBroker

Blockly.Words['multiplex_logic_container']      = {'en': 'Logic Operators',             'de': 'Logik Operatoren'};
Blockly.Words['multiplex_arith_container']      = {'en': 'Arithmetic Operators',        'de': 'Mathematische Operatoren'};
Blockly.Words['multiplex_property_container']   = {'en': 'Property Operators',          'de': 'Eigenschafts Operatoren'};
Blockly.Words['multiplex_all_container']        = {'en': 'All Operators',               'de': 'Alle Operatoren'};
//Blockly.Words['multiplex_logic_Tooltip']        = {'en': '',                            'de': ''};
//Blockly.Words['multiplex_arith_Tooltip']        = {'en': '',                            'de': ''};
//Blockly.Words['multiplex_property_Tooltip']     = {'en': '',                            'de': ''};
//Blockly.Words['multiplex_logic_HelpUrl']        = {'en': '',                            'de': ''};
//Blockly.Words['multiplex_arith_HelpUrl']        = {'en': '',                            'de': ''};
//Blockly.Words['multiplex_property_HelpUrl']     = {'en': '',                            'de': ''};

// --- define operators --------------------------------------------------
// sign is optional, if the language-neutral sign is not appropriate
Blockly.Words['multiplex_operators_DOT']       = {'en': 'Fixed Property',      'de': 'Feste Eigenschaft',    'sign': {}             };
Blockly.Words['multiplex_operators_SQUARE']    = {'en': 'Variable Property',   'de': 'Variable Eigenschaft', 'sign': {}             };
Blockly.Words['multiplex_operators_ROUND']     = {'en': 'Function Invocation', 'de': 'Funktionsaufruf',      'sign': {}             };
Blockly.Words['multiplex_operators_NEGATIV']   = {'en': 'Negativ',             'de': 'Negativ',              'sign': {}             };
Blockly.Words['multiplex_operators_NOT']       = {'en': 'Not',                 'de': 'Nicht',                'sign': {}             };
Blockly.Words['multiplex_operators_ADD']       = {'en': 'Add',                 'de': 'Plus',                 'sign': {}             };
Blockly.Words['multiplex_operators_SUBTR']     = {'en': 'Subtract',            'de': 'Minus',                'sign': {}             };
Blockly.Words['multiplex_operators_MULTI']     = {'en': 'Multiply',            'de': 'Mal',                  'sign': {}             };
Blockly.Words['multiplex_operators_DIVI']      = {'en': 'Divide',              'de': 'Geteilt',              'sign': {}             };
Blockly.Words['multiplex_operators_MOD']       = {'en': 'Modulo',              'de': 'Rest',                 'sign': {}             };
Blockly.Words['multiplex_operators_POW']       = {'en': 'Power',               'de': 'Potenz',               'sign': {'de': 'hoch'} };
Blockly.Words['multiplex_operators_ROOT']      = {'en': 'ˣRoot',               'de': 'ˣWurzel',              'sign': {}             };
Blockly.Words['multiplex_operators_LT']        = {'en': 'lower then',          'de': 'kleiner als',          'sign': {}             };
Blockly.Words['multiplex_operators_LE']        = {'en': 'lower equal',         'de': 'kleiner gleich',       'sign': {}             };
Blockly.Words['multiplex_operators_GT']        = {'en': 'greater then',        'de': 'größer als',           'sign': {}             };
Blockly.Words['multiplex_operators_GE']        = {'en': 'greater equal',       'de': 'größer gleich',        'sign': {}             };
Blockly.Words['multiplex_operators_EQUAL']     = {'en': 'equal',               'de': 'gleich',               'sign': {}             };
Blockly.Words['multiplex_operators_NOTEQUAL']  = {'en': 'not equal',           'de': 'nicht gleich',         'sign': {}             };
Blockly.Words['multiplex_operators_AND']       = {'en': 'and',                 'de': 'und',                  'sign': {}             };
Blockly.Words['multiplex_operators_OR']        = {'en': 'or',                  'de': 'oder',                 'sign': {}             };
Blockly.Words['multiplex_operators_SET']       = {'en': 'set',                 'de': 'setzen',               'sign': {}             };
Blockly.Words['multiplex_operators_SET_ADD']   = {'en': 'set Add',             'de': 'setzen Plus',          'sign': {}             };
Blockly.Words['multiplex_operators_SET_SUBTR'] = {'en': 'set Subtract',        'de': 'setzen Minus',         'sign': {}             };
Blockly.Words['multiplex_operators_SET_MULTI'] = {'en': 'set Multiply',        'de': 'setzen Mal',           'sign': {}             };
Blockly.Words['multiplex_operators_SET_DIVI']  = {'en': 'set Divide',          'de': 'setzen Geteilt',       'sign': {}             };
Blockly.Words['multiplex_operators_SET_MOD']   = {'en': 'set Modulo',          'de': 'setzen Rest',          'sign': {}             };
Blockly.Words['multiplex_operators_SET_POW']   = {'en': 'set Power',           'de': 'setzen Potenz',        'sign': {}             };
Blockly.Words['multiplex_operators_SET_DEFLT'] = {'en': 'set if empty',        'de': 'setzen falls leer',    'sign': {}             };

// sets the default-value from an empty input to this check-value [check-type, default-value]
Blockly.Constants.checkInputDeflt = [ [null, '0'], ['Number', '0'], ['Boolean', 'false'], ['String', "''"], ['Array', '[]'], ['Colour', '#000000'] ];
Blockly.Constants.invalidChr = /(^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)|(^\d+(?=\D|$))|[\W]*/g;

Blockly.Constants.Operators = {
  dropdownByIds: function(ids) {
  	let list = [];
      ids.forEach( id => {
      	if (this[id]) list.push(this[id].dropdown);
      });
      if (!list.length || !ids.length) return 'error';
  	return list
  },
  dropdownByType: function(type) {
  	if (!type) return 'error';
    return Object.values(this).filter(op => op.type == type).map(op => op.dropdown)
  },
  add: function(id, sign, type, code, order, validator, languageSigns = {}) {
    this[id] = {
      id: id,
      //name: this.word //Blockly.Words['multiplex_operators_'+id],
      _sign: sign,
      type: type,
      code: code,
      order: order,
      validator: validator,
      get dropdown() { return [this.sign, this.id] },
      get word() { return Blockly.Words['multiplex_operators_'+this.id][systemLang] },
      get langSign() {
        return Blockly.Words['multiplex_operators_'+this.id].sign[systemLang] || null
      },
      get sign() { return this.langSign || this._sign || this.word }
    }
  }
}

//                             ( 'id',        'sign',    'type',  'code',                order,                                   Validator                       ),
Blockly.Constants.Operators.add( 'DOT',       '.',       '',      '${5}.${6}',           Blockly.JavaScript.ORDER_MEMBER,         Blockly.Constants.invalidChr    ),
Blockly.Constants.Operators.add( 'SQUARE',    '[',     '',      '${5}[${4}]',          Blockly.JavaScript.ORDER_MEMBER,         ['String', 'Number', 'Boolean'] ),
Blockly.Constants.Operators.add( 'ROUND',     '( )',     '',      '${5}(${4})',          Blockly.JavaScript.ORDER_FUNCTION_CALL,  ''                              ),
Blockly.Constants.Operators.add( 'NEGATIV',   '\u2212',  '',      '-${2}',               Blockly.JavaScript.ORDER_UNARY_NEGATION, ''                              ),
Blockly.Constants.Operators.add( 'NOT',       '\u2757',  '',      '!${2}',               Blockly.JavaScript.ORDER_LOGICAL_NOT,    ''                              ),
Blockly.Constants.Operators.add( 'ADD',       '+',       'arith', '${5} + ${6}',         Blockly.JavaScript.ORDER_ADDITION,       ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'SUBTR',     '\u2212',  'arith', '${5} - ${6}',         Blockly.JavaScript.ORDER_SUBTRACTION,    ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'MULTI',     '×',       'arith', '${5} * ${6}',         Blockly.JavaScript.ORDER_MULTIPLICATION, ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'DIVI',      '÷',       'arith', '${5} / ${6}',         Blockly.JavaScript.ORDER_DIVISION,       ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'MOD',       'mod',     'arith', '${5} % ${6}',         Blockly.JavaScript.ORDER_MODULUS,        ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'POW',       '^',       'arith', '${5}**${6}',          Blockly.JavaScript.ORDER_EXPONENTIATION, ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'ROOT',      'ˣ√',      'arith', '(${6})**(1/${3})',    Blockly.JavaScript.ORDER_EXPONENTIATION, ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'LT',        '<',       'comp',  '${5} < ${6}',         Blockly.JavaScript.ORDER_RELATIONAL,     ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'LE',        '≤',       'comp',  '${5} <= ${6}',        Blockly.JavaScript.ORDER_RELATIONAL,     ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'GT',        '>',       'comp',  '${5} > ${6}',         Blockly.JavaScript.ORDER_RELATIONAL,     ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'GE',        '≥',       'comp',  '${5} >= ${6}',        Blockly.JavaScript.ORDER_RELATIONAL,     ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'EQUAL',     '=',       'comp',  '${5} == ${6}',        Blockly.JavaScript.ORDER_EQUALITY,       ''                              ),
Blockly.Constants.Operators.add( 'NOTEQUAL',  '≠',       'comp',  '${5} != ${6}',        Blockly.JavaScript.ORDER_EQUALITY,       ''                              ),
Blockly.Constants.Operators.add( 'AND',       '&&',      'logic', '${5} && ${6}',        Blockly.JavaScript.ORDER_LOGICAL_AND,    ''                              ),
Blockly.Constants.Operators.add( 'OR',        '||',      'logic', '${5} || ${6}',        Blockly.JavaScript.ORDER_LOGICAL_OR,     ''                              ),
Blockly.Constants.Operators.add( 'SET',       '=',       'assig', '${5} = ${6}',         Blockly.JavaScript.ORDER_ASSIGNMENT,     null                            ),
Blockly.Constants.Operators.add( 'SET_ADD',   '+=',      'assig', '${5} += ${6}',        Blockly.JavaScript.ORDER_ASSIGNMENT,     ['Number', 'Boolean', 'String'] ),
Blockly.Constants.Operators.add( 'SET_SUBTR', '\u2212=', 'assig', '${5} -= ${6}',        Blockly.JavaScript.ORDER_ASSIGNMENT,     ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'SET_MULTI', '×=',      'assig', '${5} *= ${6}',        Blockly.JavaScript.ORDER_ASSIGNMENT,     ['Number', 'Boolean']           ),
Blockly.Constants.Operators.add( 'SET_DIVI',  '÷=',      'assig', '${5} /= ${6}',        Blockly.JavaScript.ORDER_ASSIGNMENT,     ['Number']                      ),
Blockly.Constants.Operators.add( 'SET_MOD',   'mod=',    'assig', '${5} %= ${6}',        Blockly.JavaScript.ORDER_ASSIGNMENT,     ['Number']                      ),
Blockly.Constants.Operators.add( 'SET_POW',   '^=',      'assig', '${5} **= ${6}',       Blockly.JavaScript.ORDER_ASSIGNMENT,     ['Number']                      ),
Blockly.Constants.Operators.add( 'SET_DEFLT', null,      'assig', '${5} = ${5} || ${6}', Blockly.JavaScript.ORDER_LOGICAL_OR,     null                            ),


Blockly.Multiplex.BLOCK = function(json, container, items, initFixInput) {
  return {
    init: function() {
      if (initFixInput) initFixInput(this);
      this.jsonInit(json);

      // Configure the mutator UI.
      this.updateShape_()
      this.setMutator(new Blockly.Mutator(items));
    },

    getLastFixInput: function() {
      //let inputNumbers = this.inputList.map(input => +input.name.match(/(?<=^INPUT)(-?\d?\d)(?=$)/g)[0]);
      let inputNumbers = this.inputList.map(input => +input.itemNr);
      let min = Math.min(...inputNumbers);
      return (min < 0) ? this.getInput('INPUT' + min) : null
    },

    strongTyped_: true,

    elements_: [ items[0], items[0] ],

    /**
     * Create XML to represent number of text inputs.
     * @return {!Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
      let mutation = Blockly.utils.xml.createElement('mutation');
      mutation.setAttribute('elements', this.elements_.join(','));
      return mutation;
    },
    /**
     * Parse XML to restore the text inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
      this.elements_ = xmlElement.getAttribute('elements').split(',');
      if (this.elements_ == "" && this.elements_.length == 1) this.elements_ = [];
      this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
      let containerBlock = workspace.newBlock(container);
      let containerInput = containerBlock.getInput('STACK');
      let lastFixInput = this.getLastFixInput();
      let containerCheck = (lastFixInput && lastFixInput.connection
                                && lastFixInput.connection.check_) || null;// TODO: make check variable
      containerInput.setCheck(containerCheck);
      containerBlock.initSvg();
      let connection = containerInput.connection;
      for (let itemName of this.elements_) {
        var itemBlock = workspace.newBlock(itemName);
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
      let itemBlock = containerBlock.getInputTargetBlock('STACK');
      if (!itemBlock) return;
      //itemBlock.valueConnection_ = [];
      let i = 0;
      while (itemBlock) {
        for (let itemInput of itemBlock.inputList) {
          var input = this.inputList.filter(input => input.itemNr >= 0)[i];
          itemInput.valueConnection_ = input && input.connection
                                        && input.connection.targetConnection;
          itemInput.fieldPara_ = {};
          input.fieldRow.forEach((field) => {
            if (field.name) {
              var fieldName = field.name.replace(/(?<=\D)\d+$/, '');
              itemInput.fieldPara_[fieldName] = field.getValue();
            }
          });
        }
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
        i++;
      }
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
      let itemBlock = containerBlock.getInputTargetBlock('STACK');
      // Count number of inputs.
      let connections = [], fieldsPara = [];
      this.elements_ = [];
      while (itemBlock) {
        this.elements_.push(itemBlock.type);
        for (let itemInput of itemBlock.inputList) {
          connections.push(itemInput.valueConnection_);
          fieldsPara.push(itemInput.fieldPara_);
        }
        itemBlock = itemBlock.nextConnection &&
            itemBlock.nextConnection.targetBlock();
      }
      // Disconnect any children that don't belong.
      for (let input of this.inputList.filter(input => input.itemNr >= 0)) {
        var connection = input.connection && input.connection.targetConnection;
        if (connection && connections.indexOf(connection) == -1) {
          connection.disconnect();
        }
      }/**/
      this.updateShape_();
      // Reconnect any child blocks.
      for (let i = 0; i < this.inputList.length; i++) {
        Blockly.Mutator.reconnect(connections[i], this, 'INPUT' + i);

        for (let fieldName in fieldsPara[i]) {
          if (this.getField(fieldName + i))
                this.getField(fieldName + i).setValue(fieldsPara[i][fieldName]);
        }
      }
      this.initSvg();
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
      // Remove all inputs.
      let input;
      while (input = this.inputList.filter(input => input.itemNr >= 0)[0]) {
        this.removeInput(input.name);
      }
      // Add all inputs.
      for (let i in this.elements_) {
        var item = Blockly.Blocks[ this.elements_[i] ];
        item.setElements(this, +i);
      }
    }
  }
}

Blockly.Multiplex.JAVASCRIPT = function(block) {
  let code = new Blockly.Multiplex.codeGenerator(block);
  for (let input of block.inputList) code.addLinks(input.codeMap);
  return code.getCode()
}

/**
 * [description]
 * @param  {?string} newValue        [description]
 * @this   {Blockly.FieldDropdown}
 * @return {string}                 newValue without changes
 */
Blockly.Multiplex.validator.DROPDOWN = function(newValue = this.getValue()) {
  let block = this.sourceBlock_;
  if (block) {
    let input = this.getParentInput();
    let oldValue = this.getValue();
    if (oldValue != newValue && block.mutator && block.mutator.isVisible())
          block.mutator.setVisible(false);
    //let input = this.getParentInput();
    let itemNr = input.itemNr;
    let newElement = 'multiplex_' + newValue;
    block.elements_[itemNr] = newElement;
    let check = Blockly.Constants.Operators[newValue].validator || null;
    if (input.type==1) input.setCheck(check);
  }
  return newValue;
}

// --- fields --------------------------------------------------

Blockly.Multiplex.field.push_INPUT_CODE = function(input) {
  let type = {1:'INPUT', 2:'STATEMENT', 5:'DUMMY'}[input.type];
  if (type!='DUMMY') input.codeMap.push([type, type + input.itemNr]);
}

Blockly.Multiplex.field.INPUT = function( block, itemNr, inputType,
                                        pushCode=false, check=null ) {
  let input =
    (inputType == 'VALUE') ? block.appendValueInput('INPUT' + itemNr) :
    (inputType == 'SATEMENT') ? block.appendStatementInput('INPUT' + itemNr) :
    (inputType == 'DUMMY') ? block.appendDummyInput('INPUT' + itemNr) : null;

  input.setAlign(Blockly.ALIGN_RIGHT);
  input.itemNr = itemNr;
  input.codeMap = input.codeMap || [];
  if (inputType != 'DUMMY') input.setCheck(check);

  if (pushCode) Blockly.Multiplex.field.push_INPUT_CODE(input);
  return input
}

// --- set_element_function  --------------------------------------------------
Blockly.Multiplex.set_element_function = function(fields, itemGroup, operatorId) {
  return function(block, itemNr) {
    let input;
    for (let field of fields) {

      if (/^input_/.test(field.type)) {

        input =
          (field.type == 'input_dummy') ? block.appendDummyInput('INPUT' + itemNr) :
          (field.type == 'input_statement') ? block.appendStatementInput('INPUT' + itemNr) :
          (field.type == 'input_value') ? block.appendValueInput('INPUT' + itemNr) : null;

        input.setAlign(Blockly.ALIGN_RIGHT);
        input.itemNr = itemNr;
        input.codeMap = input.codeMap || [];
        if (field.type != 'input_dummy') input.setCheck(field.check || null);

        if (field.push != false) Blockly.Multiplex.field.push_INPUT_CODE(input);


      } else if (field.type == 'push') {

        Blockly.Multiplex.field.push_INPUT_CODE(input);


      } else if (field.type == 'field_dropdown') {

        let n = input.itemNr;
        let validator = Blockly.Multiplex.validator[field.validator];
        let options = field.options ||
              Blockly.Constants.Operators.dropdownByIds(itemGroup.operatorIds);
        let selector = new Blockly.FieldDropdown(options, validator);
        if (n > -1) input.appendField(selector, 'OPERATOR' + n);
        let value = field.value || operatorId;
        if (value) selector.setValue(value);
        selector.callValidator && selector.callValidator();

        input.codeMap.push(['FIELD_OPERATOR', 'OPERATOR' + n]);

      } else if (field.type == 'field_label_operator') {

        input.appendField(Blockly.Constants.Operators[operatorId].sign)
        input.codeMap.push(['OPERATOR', operatorId]);


      } else if (field.type == 'field_input') {

        let n = input.itemNr;
        let operator = Blockly.Constants.Operators[operatorId];
        let validator = function(newValue) {
          return newValue.replace(operator.validator, '');
        };
        let textInput = new Blockly.FieldTextInput('default', validator);
        textInput.setSpellcheck(false);
        input.appendField(textInput, 'TEXT' + n);

        input.codeMap.push(['FIELD_TEXT', 'TEXT' + n]);


      } else {
        // 'input_statement', 'field_label', 'field_label_serializable', 'field_number', 'field_checkbox', 'field_variable'
        throw `field type: "${field.type}" not found`

      }
    }
  }
}

// --- ############## --------------------------------------------------
Blockly.Multiplex.item.BLOCK = function(json, inputCount=1) {
  return function() {
    this.contextMenu = false;
    this.jsonInit(json);
    for (let i = 2; i == (inputCount); i++) this.appendDummyInput();
  }
}

// --- generateBlock --------------------------------------------------
Blockly.Multiplex.generateBlock = function(json) {

  let getStyle = function(style, title, args=0) {
    for(var n=1,message=title;n<=args;n++) message += ' %'+n;
    return { message0: message, ...style }
  }

  // defined names
  let blockName = 'multiplex_'+json.name;
  let containerName =  blockName+'_container';

  // generate items
  let itemNames = [];

  if (json.itemGroups) for (let itemGroup of json.itemGroups) {

    //let list = Blockly.Constants.Operators.dropdownByIds(itemGroup.operatorIds);
    for (let operatorId of itemGroup.operatorIds) {
      let itemName = 'multiplex_'+operatorId;
      itemNames.push(itemName);

      let title = Blockly.Constants.Operators[operatorId] ?
                  Blockly.Constants.Operators[operatorId].word : operatorId;
      Blockly.Blocks[itemName] = new function() {
        this.init = Blockly.Multiplex.item.BLOCK(getStyle(itemGroup.style, title));
        this.setElements = new Blockly.Multiplex.set_element_function(itemGroup.fields, itemGroup, operatorId);
      }
    }
  }

  if (json.items) for (let item of json.items) {
    let itemName = 'multiplex_'+item;
    itemNames.push(itemName);
  }

  // generate container
  Blockly.Blocks[containerName] = {
    init: function() {
      let title = Blockly.Words[containerName][systemLang];
      this.jsonInit(getStyle(json.container.style, title, 2));
      this.contextMenu = false;
    }
  }

  // generate block
  Blockly.Blocks[blockName] = new Blockly.Multiplex.BLOCK(
      json.block.style, containerName, itemNames,
      (block) => {
        (new Blockly.Multiplex.set_element_function([{"type": "input_value"}]))(block, -1);
      }
  );

  Blockly.JavaScript[blockName] = Blockly.Multiplex.JAVASCRIPT;
  Blockly[json.category].blocks[blockName] = json.xml || `<block type="${blockName}"></block>`;
}

Blockly.Multiplex.fields.DROPDOWN_INPUT = [
      {"type": "input_value", "push": false},
      {"type": "field_dropdown", "validator": "DROPDOWN"},
      {"type": "push"} ];

Blockly.Multiplex.item.NUMBER = {
      fields: [{"type": "input_value"}],
      operatorIds: ['Number'],
      style: { "colour": 230, "style": null, "tooltip": "", "previousStatement": "-Number-", "nextStatement": "Number" } };

Blockly.Multiplex.logic = {
  name: 'logic',
  category: 'Develop',
  itemGroups: [{
    operatorIds: ['AND', 'OR'],
    fields: Blockly.Multiplex.fields.DROPDOWN_INPUT,
    style: { "colour": 200, "style": null, "tooltip": "", "previousStatement": "Boolean", "nextStatement": "Boolean" }
  }],
  container: {style: { "colour": 200, "sytle": null, "tooltip": "", "args0": [ {"type": "input_dummy"}, { "type": "input_statement", "name": "STACK", "check": null} ] } },
  block: {style: { "colour": 200, "style": null, "tooltip": "", "helpUrl": "", "output": "Boolean", "inputsInline": true } }
}

Blockly.Multiplex.arith = {
  name: 'arith',
  category: 'Develop',
  itemGroups: [{
    fields: Blockly.Multiplex.fields.DROPDOWN_INPUT,
    operatorIds: ['ADD', 'SUBTR', 'MULTI', 'DIVI', 'MOD', 'POW', 'ROOT'],
    style: { "colour": 230, "style": null, "tooltip": "", "previousStatement": "Number", "nextStatement": "Number" }
  }],
  container: {style: { "colour": 230, "sytle": null, "tooltip": "", "args0": [ {"type": "input_dummy"}, { "type": "input_statement", "name": "STACK", "check": null} ] } },
  block: {style: { "colour": 230, "style": null, "tooltip": "", "helpUrl": "", "inputsInline": true, "output": "Boolean" } }
}

Blockly.Multiplex.property = {
  name: 'property',
  category: 'Develop',
  itemGroups: [ {
    fields: [ {"type": "input_dummy"},
              {"type": "field_label_operator"},
              {"type": "field_input"} ],
    operatorIds: ['DOT'],
    style: { "colour": 100, "style": null, "tooltip": "", "previousStatement": "Property", "nextStatement": "Property" }
  }, {
    fields: [ {"type": "input_value", "push": false},
              {"type": "field_label_operator"},
              {"type": "push"} ],
    operatorIds: ['SQUARE'],
    style: { "colour": 100, "style": null, "tooltip": "", "previousStatement": "Property", "nextStatement": "Property" }
  } ],
  container: {style: { "colour": 100, "sytle": null, "tooltip": "", "args0": [ {"type": "input_dummy"}, { "type": "input_statement", "name": "STACK", "check": null} ] } },
  block: {style: { "colour": 100, "style": null, "tooltip": "", "helpUrl": "", "inputsInline": true, "output": "Boolean" } }
}

Blockly.Multiplex.all = {
  name: 'all',
  category: 'Develop',
  items: ['ADD', 'SUBTR', 'MULTI', 'DIVI', 'MOD', 'POW', 'ROOT', 'AND', 'OR', 'DOT', 'SQUARE'],
  container: {style: { "colour": "#000000", "sytle": null, "tooltip": "", "args0": [ {"type": "input_dummy"}, { "type": "input_statement", "name": "STACK", "check": null} ] } },
  block: {style: { "colour": "#000000", "style": null, "tooltip": "", "helpUrl": "", "inputsInline": true, "output": "Boolean" } }
}

Blockly.Multiplex.generateBlock(Blockly.Multiplex.logic);
Blockly.Multiplex.generateBlock(Blockly.Multiplex.arith);
Blockly.Multiplex.generateBlock(Blockly.Multiplex.property);
Blockly.Multiplex.generateBlock(Blockly.Multiplex.all);


// --- math_set_operators --------------------------------------------------
Blockly.Develop.blocks['math_set_operators'] =
    '  <block type="math_set_operators">'
    +'  </block>';

Blockly.Blocks['math_set_operators'] = {
  init: function() {
    //Validator for input-change
    let validator = function(operatorId) {
      var input = this.sourceBlock_.getInput('value');
      let check = Blockly.Constants.Operators[operatorId].validator || null;
      input.setCheck(check);
    }

    let operator_select = new Blockly.FieldDropdown(
              Blockly.Constants.Operators.dropdownByType('assig'), validator)

    this.appendValueInput('value')
        .appendField(new Blockly.FieldVariable('Variable'), 'variable')
        .appendField(operator_select, 'operator');

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Constants.Variables.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    Blockly.BlocklyPlus.Marker(this);
  }
}

Blockly.JavaScript['math_set_operators'] = function(block) {
// Nutzt für Variablen einen Zuweisungsoperator
  let code = new Blockly.Multiplex.codeGenerator(block);
  code.addLinks([ ['VARIABLE', 'variable'],
                  ['FIELD_OPERATOR', 'operator'],
                  ['INPUT', 'value']  ]);
  return code.getCode(false)
}

// --- codeGenerator JavaScript --------------------------------------------------
Blockly.Multiplex.codeGenerator  = function(block, arg = []) {
  this.links = [];
  this.maxOrder = 0;
  this.lastOrder = 99;
  this.addLinks = (arg) => arg.forEach(item => this.addLink(...item));

  this.addLink = function(type, name) {
    let code, order = 99;

    // getFieldValue if type = Field_* and remove 'Field_' from type
    let regField = /(?<=^FIELD_).+$/;
    if (regField.test(type)) {
      type = type.match(regField)[0];
      name = block.getFieldValue(name);
    }

    if (type == 'INPUT') {
      if (this.lastInput) throw 'input follow input without operation';
      this.lastInput = name;
      return
    } else if (type == 'OPERATOR') {
      code = Blockly.Constants.Operators[name].code;
      order = Blockly.Constants.Operators[name].order;
    } else if (type == 'VARIABLE') {
      code = Blockly.JavaScript.variableDB_.getName(
              block.getFieldValue(name), Blockly.Variables.NAME_TYPE);
    } else if (type == 'TEXT') {
      code = name;
    } else if (!isNaN(type)) {
      code = name;
      order = type;
    } else { throw `Type: "${type}" with name: "${name}" not found!` }

    this.pushLastInput(order);
    this.links.push(code);
    this.lastOrder = order;
    this.lastInput = null;
    if (order > this.maxOrder) this.maxOrder = order;
  };

  // valueToCode if last link was input
  this.pushLastInput = function(order = 99, deflt) {
    if (this.lastInput) {
      let minOrder = Math.min(this.lastOrder, order);
      let inputCode = Blockly.JavaScript.valueToCode(block,
                                                      this.lastInput, minOrder);
      if (!deflt) {
        let inputChecks = block.getInput(this.lastInput).connection.check_ || [null];
        for (let check of Blockly.Constants.checkInputDeflt) {
          if (inputChecks.includes(check[0])) { deflt = check[1]; break }
        }
      }

      this.links.push(inputCode || ''+deflt);
      this.lastInput = null;
    }
  };

  this.addLinks(arg);
  /**
   * @param  {Boolean} [withOrder=true]       true = return [code, order]
   * @param  {...[string, string]} type+name  type = ['Field_']+('INPUT', 'OPERATOR', 'VARIABLE')
   *                                  name = name of field or code
   * @return {string|array}                 Generated code
   */
  this.getCode = function(withOrder = true, ...arg) {
    this.addLinks(arg);
    this.pushLastInput();

    // replace code with code in direction 'way'
    // if n == odd then way = +1 -> left to right
    // if n == even then way = -1 -> right to left
    // define search-regex for parameter replace ${num}
    let paramset = (num) => param = new RegExp(`(?<=^|[^\\\\])(\\$\\{${num}\\})`, 'g');
    let links = this.links, n = 0, way, param;
    while (links.length > 1 && n <= 99) {
      for (let i = -links.length; i <= links.length; i++) {
        if (i == 0) continue;
        var pos = links.length - Math.abs(i);
        if (way != -Math.sign(i)) {
          way = -Math.sign(i);
          links[pos] = links[pos].replace(paramset(++n), '');
        }
        if ( param.test(links[pos + way]) ) {
          links[pos] = links[pos + way].replace(param, links[pos]);
          links.splice(pos + way, 1);
          i--;
        }
      }
    }
    if (links.length > 1) console.error(`In Block ${block.type} can't generate Javacode!`);
    links = links[0].replace('\\${', '${');
    return withOrder ? [links, this.maxOrder] : (links + ';\n')
  };
}
