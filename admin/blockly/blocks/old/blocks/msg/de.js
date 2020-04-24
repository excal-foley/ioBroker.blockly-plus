'use strict';

goog.provide('Blockly.Msg.de');

goog.require('Blockly.Msg');

Blockly.Msg['CATFAVORITE'] = '\u22FF Favoriten';
Blockly.Msg['LOGIC_HUE'] = '';

Blockly.Msg['CATTIMEOUTS'] = 'Timeouts';
Blockly.Msg['TIMEOUTS_HUE'] = '70';

Blockly.Msg['CATCUSTOM'] = 'Kompatibilität';
Blockly.Msg['CUSTOM_HUE'] = '#000000';

Blockly.Msg['CATTEST'] = 'Test';
Blockly.Msg['TEST_HUE'] = '#FFFFFF';

Blockly.Msg['CATLOGIC'] = 'Logik';
Blockly.Msg['CATLOOPS'] = 'Schleifen';
Blockly.Msg['CATMATH'] = 'Mathematik';
Blockly.Msg['CATTEXT'] = 'Text';
Blockly.Msg['CATLISTS'] = 'Listen';
Blockly.Msg['CATCOLOUR'] = 'Farbe';
Blockly.Msg['CATVARIABLES'] = 'Variablen';
Blockly.Msg['CATFUNCTIONS'] = 'Funktionen';
Blockly.Msg['CATSYSTEM'] = 'System';
Blockly.Msg['CATSENDTO'] = 'SendTo';
Blockly.Msg['CATREGEX'] = 'Muster';

Blockly.Msg['MATH_HUE'] = '230';
Blockly.Msg['LOOPS_HUE'] = '120';
Blockly.Msg['LISTS_HUE'] = '260';
Blockly.Msg['LOGIC_HUE'] = '210';
Blockly.Msg['VARIABLES_HUE'] = '330';
Blockly.Msg['TEXT_HUE'] = '160';
Blockly.Msg['PROCEDURES_HUE'] = '290';
Blockly.Msg['COLOUR_HUE'] = '20';
Blockly.Msg['VARIABLES_DYNAMIC_HUE'] = '310';
Blockly.Msg['SYSTEM_HUE'] = '0';
Blockly.Msg['SENDTO_HUE'] = '0';
Blockly.Msg['REGEX_HUE'] = '140';

Blockly.Msg['logic_any2bool_trueValues'] = [ 'i', 'true', 'wahr', 'on', 'an', 'ein'];
Blockly.Msg['logic_any2bool_falseValues'] = [ '-1', '0', 'o', 'false', 'falsch', 'off', 'aus' ];

Blockly.Msg['time_ms'] = 'ms';
Blockly.Msg['time_millisecond'] = 'Millisekunde';
Blockly.Msg['time_milliseconds'] = 'Millisekunden';
Blockly.Msg['time_s'] = 's';
Blockly.Msg['time_ss'] = 'ss';
Blockly.Msg['time_sec'] = 'sec';
Blockly.Msg['time_second'] = 'Sekunde';
Blockly.Msg['time_seconds'] = 'Sekunden';
Blockly.Msg['time_m'] = 'm';
Blockly.Msg['time_mm'] = 'mm';
Blockly.Msg['time_min'] = 'min';
Blockly.Msg['time_minute'] = 'Minute';
Blockly.Msg['time_minutes'] = 'Minuten';
Blockly.Msg['time_h'] = 'h';
Blockly.Msg['time_hh'] = 'hh';
Blockly.Msg['time_hrs'] = 'Std';
Blockly.Msg['time_hour'] = 'Stunde';
Blockly.Msg['time_hours'] = 'Stunden';

Blockly.Msg['date_D'] = 't';
Blockly.Msg['date_DD'] = 'tt';
Blockly.Msg['date_day'] = 'Tag';
Blockly.Msg['date_days'] = 'Tage';
Blockly.Msg['date_M'] = 'M';
Blockly.Msg['date_MM'] = 'MM';
Blockly.Msg['date_month'] = 'Monat';
Blockly.Msg['date_months'] = 'Monate';
Blockly.Msg['date_Y'] = 'J';
Blockly.Msg['date_YY'] = 'JJ';
Blockly.Msg['date_YYYY'] = 'JJJJ';
Blockly.Msg['date_Year'] = 'Jahr';
Blockly.Msg['date_Years'] = 'Jahre';



///***************************    Operatoren definieren    ***************************///
Blockly.ownBlocks.op = {};
Blockly.ownBlocks.op['ATOMIC']      = { dp: ['',             'ATOMIC'],     sign: '',            code: '%3'/*%1*/,           order: Blockly.JavaScript.ORDER_ATOMIC,             input: false,        check: '' };
Blockly.ownBlocks.op['NEU']         = { dp: ['new',          'NEU'],        sign: 'new',         code: 'new %3',       order: Blockly.JavaScript.ORDER_NEW,                input: '',           check: '' };
Blockly.ownBlocks.op['DOT']         = { dp: ['.',            'DOT'],        sign: '.',           code: '%4.%3',        order: Blockly.JavaScript.ORDER_MEMBER,             input: 'TextInput',  check: /[\W]*/ };
Blockly.ownBlocks.op['SQUARE']      = { dp: ['[ ]',          'SQUARE'],     sign: '[ ]',         code: '%4[%3]',       order: Blockly.JavaScript.ORDER_MEMBER,             input: 'ValueInput', check: ['String', 'Number', 'Boolean'] };
Blockly.ownBlocks.op['ROUND']       = { dp: ['( )',          'ROUND'],      sign: '( )',         code: '%3(%2)',       order: Blockly.JavaScript.ORDER_FUNCTION_CALL,      input: '',           check: '' };
Blockly.ownBlocks.op['CURLY']       = { dp: ['{ }',          'CURLY'],      sign: '{ }',         code: '%3{%2}',       order: '',                                          input: '',           check: '' };
Blockly.ownBlocks.op['REGEX']       = { dp: ['//',           'REGEX'],      sign: '//',          code: '/%3/%4',       order: '',                                          input: '',           check: '' };
Blockly.ownBlocks.op['INK_']        = { dp: ['++_',          'INK_'],       sign: '++_',         code: '++%3',         order: Blockly.JavaScript.ORDER_INCREMENT,          input: '',           check: '' };
Blockly.ownBlocks.op['DEK_']        = { dp: ['--_',          'DEK_'],       sign: '--_',         code: '--%3',         order: Blockly.JavaScript.ORDER_DECREMENT,          input: '',           check: '' };
Blockly.ownBlocks.op['_INK']        = { dp: ['_++',          '_INK'],       sign: '_++',         code: '%3++',         order: Blockly.JavaScript.ORDER_INCREMENT,          input: '',           check: '' };
Blockly.ownBlocks.op['_DEK']        = { dp: ['_--',          '_DEK'],       sign: '_--',         code: '%3--',         order: Blockly.JavaScript.ORDER_DECREMENT,          input: '',           check: '' };
Blockly.ownBlocks.op['UNARY_PLUS']  = { dp: ['+',            'UNARY_PLUS'], sign: '+',           code: '+%2',          order: Blockly.JavaScript.ORDER_UNARY_PLUS,         input: '',           check: '' };
Blockly.ownBlocks.op['UNARY_NEGA']  = { dp: ['\u2212',       'UNARY_NEGA'], sign: '\u2212',      code: '-%2',          order: Blockly.JavaScript.ORDER_UNARY_NEGATION,     input: '',           check: '' };
Blockly.ownBlocks.op['NOT']         = { dp: ['\u2757',       'NOT'],        sign: '\u2757',      code: '!%2',          order: Blockly.JavaScript.ORDER_LOGICAL_NOT,        input: '',           check: '' };
Blockly.ownBlocks.op['TYPEOF']      = { dp: ['typeof',       'TYPEOF'],     sign: 'typeof',      code: 'typeof %4',    order: Blockly.JavaScript.ORDER_TYPEOF,             input: '',           check: '' };
Blockly.ownBlocks.op['VOID']        = { dp: ['void',         'VOID'],       sign: 'void',        code: '%3 void %4',   order: Blockly.JavaScript.ORDER_VOID,               input: '',           check: '' };
Blockly.ownBlocks.op['DELETE']      = { dp: ['delete',       'DELETE'],     sign: 'delete',      code: '%3 delete %4', order: Blockly.JavaScript.ORDER_DELETE,             input: '',           check: '' };
Blockly.ownBlocks.op['AWAIT']       = { dp: ['await',        'AWAIT'],      sign: 'await',       code: '%3 await %4',  order: Blockly.JavaScript.ORDER_AWAIT,              input: '',           check: '' };
Blockly.ownBlocks.op['POW']         = { dp: ['^',            'POW'],        sign: '^',           code: '%3**%4',       order: Blockly.JavaScript.ORDER_EXPONENTIATION,     input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['ROOT']        = { dp: ['√',            'ROOT'],       sign: '√',           code: '(%4)**(1/%1)', order: Blockly.JavaScript.ORDER_EXPONENTIATION,     input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['MULTI']       = { dp: ['×',            'MULTI'],      sign: '×',           code: '%3 * %4',      order: Blockly.JavaScript.ORDER_MULTIPLICATION,     input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['DIVI']        = { dp: ['÷',            'DIVI'],       sign: '÷',           code: '%3 / %4',      order: Blockly.JavaScript.ORDER_DIVISION,           input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['MOD']         = { dp: ['%',            'MOD'],        sign: '%',           code: '%3 % %4',      order: Blockly.JavaScript.ORDER_MODULUS,            input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['MINUS']       = { dp: ['\u2212',       'MINUS'],      sign: '\u2212',      code: '%3 - %4',      order: Blockly.JavaScript.ORDER_SUBTRACTION,        input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['PLUS']        = { dp: ['+',            'PLUS'],       sign: '+',           code: '%3 + %4',      order: Blockly.JavaScript.ORDER_ADDITION,           input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['ADD']         = { dp: ['+',            'ADD'],        sign: '+',           code: '%3 + %4',      order: Blockly.JavaScript.ORDER_ADDITION,           input: '',           check: '' };
Blockly.ownBlocks.op['LT']          = { dp: ['<',            'LT'],         sign: '<',           code: '%3 < %4',      order: Blockly.JavaScript.ORDER_RELATIONAL,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['LE']          = { dp: ['≤',            'LE'],         sign: '≤',           code: '%3 <= %4',     order: Blockly.JavaScript.ORDER_RELATIONAL,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['GT']          = { dp: ['>',            'GT'],         sign: '>',           code: '%3 > %4',      order: Blockly.JavaScript.ORDER_RELATIONAL,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['GE']          = { dp: ['≥',            'GE'],         sign: '≥',           code: '%3 >= %4',     order: Blockly.JavaScript.ORDER_RELATIONAL,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['IN']          = { dp: ['in',           'IN'],         sign: 'in',          code: '%3 in %4',     order: Blockly.JavaScript.ORDER_IN,                 input: '',           check: '' };
Blockly.ownBlocks.op['OF']          = { dp: ['of',           'OF'],         sign: 'of',          code: '%3 of %4',     order: Blockly.JavaScript.ORDER_IN,                 input: '',           check: '' };
Blockly.ownBlocks.op['EQUAL']       = { dp: ['=',            'EQUAL'],      sign: '=',           code: '%3 == %4',     order: Blockly.JavaScript.ORDER_EQUALITY,           input: '',           check: '' };
Blockly.ownBlocks.op['STRICT']      = { dp: ['≡',            'STRICT'],     sign: '≡',           code: '%3 === %4',    order: Blockly.JavaScript.ORDER_EQUALITY,           input: '',           check: '' };
Blockly.ownBlocks.op['NOTEQUAL']    = { dp: ['≠',            'NOTEQUAL'],   sign: '≠',           code: '%3 != %4',     order: Blockly.JavaScript.ORDER_EQUALITY,           input: '',           check: '' };
Blockly.ownBlocks.op['NOTSTRICT']   = { dp: ['≡\u0338',      'NOTSTRICT'],  sign: '≡\u0338',     code: '%3 !== %4',    order: Blockly.JavaScript.ORDER_EQUALITY,           input: '',           check: '' };
Blockly.ownBlocks.op['AND']         = { dp: ['&&',           'AND'],        sign: '&&',          code: '%3 && %4',     order: Blockly.JavaScript.ORDER_LOGICAL_AND,        input: '',           check: '' };
Blockly.ownBlocks.op['OR']          = { dp: ['||',           'OR'],         sign: '||',          code: '%3 || %4',     order: Blockly.JavaScript.ORDER_LOGICAL_OR,         input: '',           check: '' };
Blockly.ownBlocks.op['DEFLT']       = { dp: ['falls leer',   'DEFLT'],      sign: 'falls leer',  code: '%3 || %4',     order: Blockly.JavaScript.ORDER_LOGICAL_OR,         input: '',           check: '' };
Blockly.ownBlocks.op['SET_DEFLT']   = { dp: ['falls leer',   'SET_DEFLT'],  sign: 'falls leer',  code: '%3 = %3 || %4',order: Blockly.JavaScript.ORDER_LOGICAL_OR,         input: '',           check: '' };
Blockly.ownBlocks.op['THEN']        = { dp: ['then',         'THEN'],       sign: 'then',        code: '%3 ? %4',      order: Blockly.JavaScript.ORDER_CONDITIONAL,        input: '',           check: '' };
Blockly.ownBlocks.op['ELSE']        = { dp: ['else',         'ELSE'],       sign: 'else',        code: '%3 : %4',      order: Blockly.JavaScript.ORDER_CONDITIONAL,        input: '',           check: '' };
Blockly.ownBlocks.op['SET']         = { dp: [':=',           'SET'],        sign: ':=',          code: '%3 = %4',      order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: 'ValueInput', check: null };
Blockly.ownBlocks.op['SET_ADD']     = { dp: ['+=',           'SET_ADD'],    sign: '+=',          code: '%3 += %4',     order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: '',           check: '' };
Blockly.ownBlocks.op['SET_PLUS']    = { dp: ['+=',           'SET_PLUS'],   sign: '+=',          code: '%3 += %4',     order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['SET_MINUS']   = { dp: ['\u2212=',      'SET_MINUS'],  sign: '\u2212=',     code: '%3 -= %4',     order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['SET_POW']     = { dp: ['^=',           'SET_POW'],    sign: '^=',          code: '%3 **= %4',    order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['SET_MULTI']   = { dp: ['×=',           'SET_MULTI'],  sign: '×=',          code: '%3 *= %4',     order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['SET_DIVI']    = { dp: ['÷=',           'SET_DIVI'],   sign: '÷=',          code: '%3 /= %4',     order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['SET_MOD']     = { dp: ['%=',           'SET_MOD'],    sign: '%=',          code: '%3 %= %4',     order: Blockly.JavaScript.ORDER_ASSIGNMENT,         input: 'ValueInput', check: ['Number', 'Boolean'] };
Blockly.ownBlocks.op['YIELD']       = { dp: ['yield',        'YIELD'],      sign: 'yield',       code: '%3 yield %4',  order: Blockly.JavaScript.ORDER_YIELD,              input: '',           check: '' };
Blockly.ownBlocks.op['COMMA']       = { dp: [',',            'COMMA'],      sign: ',',           code: '%3, %4',       order: Blockly.JavaScript.ORDER_COMMA,              input: '',           check: '' };
Blockly.ownBlocks.op['NONE']        = { dp: ['',             'NONE'],       sign: '',            code: '',             order: Blockly.JavaScript.ORDER_NONE,               input: '',           check: '' };
Blockly.ownBlocks.op['END']         = { dp: [';',            'END'],        sign: ';',           code: '%3',           order: Blockly.JavaScript.ORDER_ATOMIC,             input: false,        check: '' };
Blockly.ownBlocks.op['ROW_COMMENT'] = { dp: ['//',           'ROW_COMMENT'],sign: '//',          code: '//%3',         order: Blockly.JavaScript.ORDER_ATOMIC,             input: '',           check: '' };
Blockly.ownBlocks.op['COMMENT']     = { dp: ['/**/',         'COMMENT'],    sign: '/**/',        code: '/*%3*/',       order: Blockly.JavaScript.ORDER_ATOMIC,             input: '',           check: '' };
Blockly.ownBlocks.op['EOB']         = { dp: [';',            'EOB'],        sign: ';',           code: '%3;',          order: Blockly.JavaScript.ORDER_COMMA,              input: '',           check: '' };

// Default Dropdown-List
Blockly.ownBlocks.dp = {};

Blockly.ownBlocks.dp.math = [ Blockly.ownBlocks.op.PLUS.dp,
                              Blockly.ownBlocks.op.MINUS.dp,
                              Blockly.ownBlocks.op.MULTI.dp,
                              Blockly.ownBlocks.op.DIVI.dp,
                              Blockly.ownBlocks.op.MOD.dp,
                              Blockly.ownBlocks.op.POW.dp,
                              Blockly.ownBlocks.op.ROOT.dp ];

Blockly.ownBlocks.dp.logic = [Blockly.ownBlocks.op.AND.dp,
                              Blockly.ownBlocks.op.OR.dp ];

Blockly.ownBlocks.dp.setOp = [Blockly.ownBlocks.op.SET_PLUS.dp,
                              Blockly.ownBlocks.op.SET_MINUS.dp,
                              Blockly.ownBlocks.op.SET_MULTI.dp,
                              Blockly.ownBlocks.op.SET_DIVI.dp,
                              Blockly.ownBlocks.op.SET_POW.dp,
                              Blockly.ownBlocks.op.SET_MOD.dp,
                              Blockly.ownBlocks.op.SET.dp,
                              Blockly.ownBlocks.op.SET_DEFLT.dp ];
