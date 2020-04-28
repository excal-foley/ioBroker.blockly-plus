'use strict';

Blockly.CustomBlocks = Blockly.CustomBlocks || [];

// --- Category Other --------------------------------------------------
Blockly.Words['Other']                                = {'en': 'Other',                  'de': 'Sonstige'};

Blockly.CustomBlocks.push('Other');

Blockly.Other = {
    HUE: '#ffffff',
    blocks: {}
};

// --- Category Custom --------------------------------------------------
/**
 * These blocks are not intended for an official release
 */
Blockly.Words['Custom']                                = {'en': 'Custom',                  'de': 'Eigene'};

Blockly.CustomBlocks.push('Custom');

Blockly.Custom = {
    HUE: '#ff4d4d',
    blocks: {}
};

// --- Category Develop --------------------------------------------------
/**
 * These blocks are still under development
 */
Blockly.Words['Develop']                                  = {'en': 'Development',           'de': 'Entwicklung'};

Blockly.CustomBlocks.push('Develop');

Blockly.Develop = {
    HUE: '#000000',
    blocks: {}
};
