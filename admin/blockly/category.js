'use strict';

//goog.provide('Blockly.JavaScript.Action');

//goog.require('Blockly.JavaScript');

Blockly.CustomBlocks = Blockly.CustomBlocks || [];

// --- Category Custom --------------------------------------------------
Blockly.Words['Custom']                                = {'en': 'Custom',                  'de': 'Eigene'};

Blockly.CustomBlocks.push('Custom');

Blockly.Custom = {
    HUE: '#FFFFFF',
    blocks: {}
};

// --- Category Test --------------------------------------------------
Blockly.Words['Test']                                  = {'en': 'Test',                    'de': 'Test'};

Blockly.CustomBlocks.push('Test');

Blockly.Test = {
    HUE: '#000000',
    blocks: {}
};
