'use strict';

//To-Do:
// sendto_telegram_setKeyboard sento löschen

goog.provide('Blockly.JavaScript.Test');

goog.require('Blockly.JavaScript');

// --- SendTo telegram --------------------------------------------------
Blockly.Words['telegram_setKeyboard']               = {'en': 'telegram',                    'de': 'telegram',                           'pt': 'telegram',                       'pl': 'telegram',                           'nl': 'telegram',                       'it': 'telegram',                       'es': 'telegram',                       'fr': 'telegram',                           'ru': 'telegram'};
Blockly.Words['telegram_setKeyboard_keyboard']      = {'en': 'keyboard',                    'de': 'Tastatur'};
Blockly.Words['telegram_setKeyboard_resize']        = {'en': 'fix size',                    'de': 'feste Größe'};
Blockly.Words['telegram_setKeyboard_one_time']      = {'en': 'auto hide',                   'de': 'automatisch Ausblenden'};
Blockly.Words['telegram_setKeyboard_message']       = {'en': 'message',                     'de': 'Meldung',                            'pt': 'mensagem',                       'pl': 'wiadomość',                          'nl': 'bericht',                        'it': 'Messaggio',                      'es': 'mensaje',                        'fr': 'message',                            'ru': 'сообщение'};
//Blockly.Words['telegram_setKeyboard_username']      = {'en': 'Recipient (optional)',        'de': 'Empfänger (optional)',               'pt': 'Nome do usuário (opcional)',     'pl': 'Nazwa użytkownika (opcjonalnie)',    'nl': 'Gebruikersnaam (optioneel)',     'it': 'Nome utente (facoltativo)',      'es': 'Nombre de usuario (opcional)',   'fr': 'Nom d\'utilisateur (facultatif)',    'ru': 'имя пользователя (не обяз.)'};
Blockly.Words['telegram_setKeyboard_silent']        = {'en': 'without notification',        'de': 'ohne Benachrichtigung',              'pt': 'sem notificação',                'pl': 'bez powiadomienia',                  'nl': 'zonder kennisgeving',            'it': 'senza notifica',                 'es': 'sin notificación',               'fr': 'sans notification',                  'ru': 'без уведомления'};
Blockly.Words['telegram_setKeyboard_anyInstance']   = {'en': 'all instances',               'de': 'Alle Instanzen',                     'pt': 'todas as instâncias',            'pl': 'wszystkie przypadki',                'nl': 'alle instanties',                'it': 'tutte le istanze',               'es': 'todas las instancias',           'fr': 'toutes les instances',               'ru': 'На все драйвера'};
Blockly.Words['telegram_setKeyboard_msg_text']      = {'en': 'updated keyboard',            'de': 'Tastatur aktualisiert'};//,                     'pt': 'todas as instâncias',            'pl': 'wszystkie przypadki',                'nl': 'alle instanties',                'it': 'tutte le istanze',               'es': 'todas las instancias',           'fr': 'toutes les instances',               'ru': 'На все драйвера'};
Blockly.Words['telegram_setKeyboard_tooltip']       = {'en': 'Send message to telegram',    'de': 'Sende eine Meldung über Telegram',   'pt': 'Enviar mensagem para telegrama', 'pl': 'Wyślij wiadomość do telegramu',      'nl': 'Stuur bericht naar telegram',    'it': 'Invia messaggio al telegramma',  'es': 'Enviar mensaje al telegrama',    'fr': 'Envoyer un message au télégramme',   'ru': 'Послать сообщение через Telegram'};
Blockly.Words['telegram_setKeyboard_help']          = {'en': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'de': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'pt': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'pl': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'nl': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'it': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'es': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'fr': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md', 'ru': 'https://github.com/ioBroker/ioBroker.telegram/blob/master/README.md'};

Blockly.Test.blocks['sendto_telegram_setKeyboard'] =
    '<block type="sendto_telegram_setKeyboard">'
    +'  <field name="INSTANCE"></field>'
    +'  <field name="NOT_RESIZE">TRUE</field>'
    +'  <field name="ONE_TIME">FALSE</field>'
    +'  <field name="SILENT">TRUE</field>'
    +'  <value name="KEYBOARD">'
    +'    <block type="lists_create_with" id=",qDArs}+9RL{epNGzo?S">'
    +'      <mutation items="3"></mutation>'
    +'      <value name="ADD0">'
    +'        <block type="lists_create_with" id="(0eJ!JI)v`%n9=YuNiG2">'
    +'          <mutation items="2"></mutation>'
    +'          <value name="ADD0">'
    +'            <block type="text" id=")/7];`UXy0m`N{@35Nx/">'
    +'              <field name="TEXT">💡 Light on</field>'
    +'            </block>'
    +'          </value>'
    +'          <value name="ADD1">'
    +'            <block type="text" id="dkp|{_u.`3a*#^0jf;gr">'
    +'              <field name="TEXT">⚫ Light off</field>'
    +'            </block>'
    +'          </value>'
    +'        </block>'
    +'      </value>'
    +'      <value name="ADD1">'
    +'        <block type="lists_create_with" id=";bW1{`v`4kcpu}JaR9;:">'
    +'          <mutation items="1"></mutation>'
    +'          <value name="ADD0">'
    +'            <block type="text" id="(q-,Z6w#wM;`zGm[lBOt">'
    +'              <field name="TEXT">🔃 System reboot</field>'
    +'            </block>'
    +'          </value>'
    +'        </block>'
    +'      </value>'
    +'      <value name="ADD2">'
    +'        <block type="lists_create_with" id=".qf~F#VtjmTmc--P?#N0">'
    +'          <mutation items="1"></mutation>'
    +'          <value name="ADD0">'
    +'            <block type="text" id="zF|TebVMU:tA[bm+Whcj">'
    +'              <field name="TEXT">⛔ System off</field>'
    +'            </block>'
    +'          </value>'
    +'        </block>'
    +'      </value>'
    +'    </block>'
    +'  </value>'
    +'  <value name="MESSAGE">'
    +'    <shadow type="text" id="W.2rx!i{ub-S@!)Y,U:Q">'
    +'      <field name="TEXT">Message received</field>'
    +'    </shadow>'
    +'  </value>'
    +'</block>';

Blockly.Blocks['sendto_telegram_setKeyboard'] = {
    init: function() {
        var options = [[Blockly.Words['telegram_setKeyboard_anyInstance'][systemLang], '']];
        if (typeof main !== 'undefined' && main.instances) {
            for (var i = 0; i < main.instances.length; i++) {
                var m = main.instances[i].match(/^system.adapter.telegram.(\d+)$/);
                if (m) {
                    var k = parseInt(m[1], 10);
                    options.push(['telegram.' + k, '.' + k]);
                }
            }
            if (options.length === 0) {
                for (var u = 0; u <= 4; u++) {
                    options.push(['telegram.' + u, '.' + u]);
                }
            }
        } else {
            for (var n = 0; n <= 4; n++) {
                options.push(['telegram.' + n, '.' + n]);
            }
        }

        this.appendDummyInput('INSTANCE')
            .appendField(Blockly.Words['telegram_setKeyboard'][systemLang])
            .appendField(new Blockly.FieldDropdown(options), 'INSTANCE')
            .setAlign(Blockly.ALIGN_RIGHT);

        this.appendValueInput('KEYBOARD')
            .appendField(Blockly.Words['telegram_setKeyboard_keyboard'][systemLang])
            .setAlign(Blockly.ALIGN_RIGHT);

        this.appendValueInput('MESSAGE')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Words['telegram_setKeyboard_message'][systemLang]);
        //    .appendShadowBlock('text',{TEXT: 'Neue Tastatur'});

        //var input = this.appendValueInput('USERNAME')
        //    .setCheck('String')
        //    .appendField(Blockly.Words['telegram_setKeyboard_username'][systemLang]);

        this.appendDummyInput('NOT_RESIZE')
            .appendField(Blockly.Words['telegram_setKeyboard_resize'][systemLang])
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'NOT_RESIZE')
            .setAlign(Blockly.ALIGN_RIGHT);

        this.appendDummyInput('ONE_TIME')
            .appendField(Blockly.Words['telegram_setKeyboard_one_time'][systemLang])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldCheckbox('FALSE'), 'ONE_TIME');

        this.appendDummyInput('SILENT')
            .appendField(Blockly.Words['telegram_setKeyboard_silent'][systemLang])
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldCheckbox('TRUE'), 'SILENT');

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        this.setColour(Blockly.Sendto.HUE);
        this.setTooltip(Blockly.Words['telegram_setKeyboard_tooltip'][systemLang]);
        this.setHelpUrl(Blockly.Words['telegram_setKeyboard_help'][systemLang]);
        this.initSvg();
    }
};

Blockly.JavaScript['sendto_telegram_setKeyboard'] = function(block) {
    var dropdown_instance = block.getFieldValue('INSTANCE');
    var value_keyboard = Blockly.JavaScript.valueToCode(block, 'KEYBOARD', Blockly.JavaScript.ORDER_ATOMIC);
    var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC) || 'Neue Tastatur';
    var value_resize = (block.getFieldValue('NOT_RESIZE') === 'FALSE' ? true : false);
    var value_one_time = (block.getFieldValue('ONE_TIME') === 'TRUE' ? true : false);
    //var value_username = Blockly.JavaScript.valueToCode(block, 'USERNAME', Blockly.JavaScript.ORDER_ATOMIC);
    var silent = block.getFieldValue('SILENT');

    return 'sendTo("telegram' + dropdown_instance + '", {' +
        (value_message !== '' ? '\n    text: ' + value_message + ',' : '') +
        //(value_username ? ', \n    ' + (value_username.startsWith('-',1) ? 'chatId: ' : 'user: ') + value_username : '') +

        '\n    reply_markup: {' +
        '\n        keyboard: ' + value_keyboard +
        ',\n        resize_keyboard: ' + value_resize +
        ',\n        one_time_keyboard: ' + value_one_time +
        '\n    }' +
        (silent === 'TRUE' ? ', \n    disable_notification: true' : '') +
        '\n});\n'
};
