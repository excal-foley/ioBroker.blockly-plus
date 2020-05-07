'use strict';

Blockly.Words['BLOCKLY-PLUS_shortcut_words']               = {'en': 'Shortcut Words',                     'de': 'Kurze Wörter'      };
Blockly.Words['BLOCKLY-PLUS_shortcut_words_tooltip']       = {'en': '',                     'de': ''            };
Blockly.Words['BLOCKLY-PLUS_shortcut_words_helpurl']       = {'en': '',                     'de': ''            };

Blockly.Other.blocks['BLOCKLY-PLUS_shortcut_words'] =
    '  <block type="BLOCKLY-PLUS_shortcut_words"></block>';

Blockly.JavaScript['BLOCKLY-PLUS_shortcut_words'] = (block) => '';

Blockly.Blocks['BLOCKLY-PLUS_shortcut_words'] = {
  init: function() {

    this.appendDummyInput()
        .appendField(Blockly.Words['BLOCKLY-PLUS_shortcut_words'][systemLang]);

    if (!this.workspace.options.maxInstances) this.workspace.options.maxInstances = [];
    this.workspace.options.maxInstances[this.type] = 1;

    //this.setNextStatement(true, null);
    this.setColour(Blockly.Constants.Logic.HUE);
    this.setTooltip(Blockly.Words['BLOCKLY-PLUS_shortcut_words_tooltip'][systemLang]);
    this.setHelpUrl(Blockly.Words['BLOCKLY-PLUS_shortcut_words_helpurl'][systemLang]);
    Blockly.BlocklyPlus.Marker(this);


    if (this.isInFlyout || this.isInMutator || this.isInsertionMarker_) return;

    console.debug('Words change to shortcut');

    let replaceMsg = function(msgName, obj) {
      if (obj[systemLang] && Blockly.Msg[msgName]) Blockly.Msg[msgName] = obj[systemLang];
    }

    let replaceWord = function(wordName, obj) {
      if (Blockly.Words[wordName]) Object.assign(Blockly.Words[wordName], obj);
    }


    replaceMsg( 'PROCEDURES_DEFNORETURN_TITLE',                  { 'de': 'Funktion' });
    replaceMsg( 'PROCEDURES_DEFRETURN_TITLE',                    { 'de': Blockly.Msg['PROCEDURES_DEFNORETURN_TITLE'] });
    replaceMsg( 'TEXT_JOIN_TITLE_CREATEWITH',                    { 'de': 'Text' });
    replaceMsg( 'TEXT_INDEXOF_OPERATOR_FIRST',                   { 'de': 'suche erstes Auftreten von' });
    replaceMsg( 'TEXT_INDEXOF_OPERATOR_LAST',                    { 'de': 'suche letztes Auftreten von' });
    replaceMsg( 'LISTS_CREATE_EMPTY_TITLE',                      { 'de': 'leere Liste' });
    replaceMsg( 'LISTS_CREATE_WITH_INPUT_WITH',                  { 'de': 'Liste' });
    replaceMsg( 'LISTS_INLIST',                                  { 'de': 'in Liste' });
    replaceMsg( 'LISTS_GET_INDEX_INPUT_IN_LIST',                 { 'de': Blockly.Msg['LISTS_INLIST'] });
    replaceMsg( 'LISTS_GET_SUBLIST_INPUT_IN_LIST',               { 'de': Blockly.Msg['LISTS_INLIST'] });
    replaceMsg( 'LISTS_INDEX_OF_INPUT_IN_LIST',                  { 'de': Blockly.Msg['LISTS_INLIST'] });
    replaceMsg( 'LISTS_SET_INDEX_INPUT_IN_LIST',                 { 'de': Blockly.Msg['LISTS_INLIST'] });

    replaceMsg( 'LOGIC_TERNARY_CONDITION',                       { 'de': 'falls' });
    replaceMsg( 'LOGIC_TERNARY_IF_TRUE',                         { 'de': 'dann' });
    replaceMsg( 'LOGIC_TERNARY_IF_FALSE',                        { 'de': 'sonst' });
    replaceMsg( 'LOGIC_NEGATE_TITLE',                            { 'de': '! %1' });

    replaceMsg( 'VARIABLES_SET',                                 { 'de': '%1 := %2' });
    replaceMsg( 'MATH_CHANGE_TITLE',                             { 'de': '%1 += %2' });

    replaceMsg( 'CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK',       { 'de': 'Beenden von Schleife' });
    replaceMsg( 'CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE',    { 'de': 'Nächste Ausführung von Schleife' });


    //Ändert Deutsches Timeformat von 'SS' auf 'hh'
    replaceWord( 'time_get_default_format',            { 'de': 'JJJJ.MM.TT hh:mm:ss.sss' });
    replaceWord( 'time_get_hh_mm',                     { 'de': 'hh:mm' });
    replaceWord( 'time_get_hh_mm_ss',                  { 'de': 'hh:mm:ss' });
    replaceWord( 'time_get_hh_mm_ss.sss',              { 'de': 'hh:mm:ss.sss' });
    replaceWord( 'time_astro_default_format',          { 'de': 'JJJJ.MM.TT hh:mm:ss.sss' });
    replaceWord( 'time_get_custom',                    { 'de': 'Benutzerdefiniert' });

    replaceWord( 'timeouts_settimeout',                { 'de': 'Verzögere' });
    //replaceWord( 'timeouts_settimeout_name',           { 'de': 'Verzögerung' });
    replaceWord( 'timeouts_settimeout_in',             { 'de': 'um' });
    //replaceWord( 'timeouts_settimeout_tooltip',        { 'de': 'Ausführung verzögern' });

    replaceWord( 'timeouts_cleartimeout',              { 'de': 'stop Verzögerung' });
    //replaceWord( 'timeouts_cleartimeout_tooltip',      { 'de': 'Ausführungsverzögerung anhalten' });

    replaceWord( 'timeouts_setinterval',               { 'de': 'Wiederhole' });
    //replaceWord( 'timeouts_setinterval_name',          { 'de': 'Intervall' });
    //replaceWord( 'timeouts_setinterval_in',            { 'de': 'alle' });
    //replaceWord( 'timeouts_setinterval_tooltip',       { 'de': 'Zyklische Ausführung' });

    replaceWord( 'timeouts_clearinterval',             { 'de': 'stop Wiederholung' });
    //replaceWord( 'timeouts_clearinterval_tooltip',     { 'de': 'Ausführungsintervall anhalten' });

    replaceWord( 'get_value_OID',                      { 'de': 'von' });

    replaceWord( 'convert_tonumber',                   { 'de': 'nach Zahl' });
    replaceWord( 'convert_toboolean',                  { 'de': 'zu Logik' });
    replaceWord( 'convert_tostring',                   { 'de': 'zu Text' });
    replaceWord( 'convert_type',                       { 'de': 'Typ von' });
    replaceWord( 'convert_to_date',                    { 'de': 'zu Datum/Zeit' });
    replaceWord( 'convert_to',                         { 'de': 'zu' });
    replaceWord( 'convert_json2object',                { 'de': 'JSON zu Objekt' });
    replaceWord( 'convert_object2json',                { 'de': 'Objekt zu JSON' });

  }
}
