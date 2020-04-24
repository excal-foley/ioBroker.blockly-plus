'use strict';
/**//***************************    ownBlocks Initalisieren    ***************************///
if ( Blockly.ownBlocks == null ) {
  Blockly.ownBlocks = {};
  var BOB_ = Blockly.ownBlocks;
  BOB_.Blocks = {};
  BOB_.cat = {};
  BOB_.Operator = {};
  BOB_.OP = BOB_.Operator;
  BOB_.local = /^file.*/.test(window.location.protocol);
  BOB_.mainPath = BOB_.local ? '../admin/blockly/blocks/old/'
                             : '../blockly-plus/blockly/blocks/old/';
  !Blockly.utils.xml && ( Blockly.utils.xml = Blockly.Xml.utils );
}

/**//***************************    import Scrpits Funktion    ***************************///
BOB_.importScripts = function( srcList, opt_mainPath = '' ) {
  !Array.isArray(srcList) && (srcList = [srcList]);
  srcList.forEach(function(src) {
          var script = document.createElement('script');
          script.type='text/javascript';
          script.async = false; // Force synchronous loading, to load them in the correct sequence
          script.src = opt_mainPath + src;
          document.head.appendChild(script);
  });
}

/**//***************************    registerCat    ***************************///
BOB_.registerCat = {};
/**//***************************    registerCat    ***************************///
BOB_.registerCat.local = function() {
  for ( var blockName in BOB_.Blocks ) {
    var block = BOB_.Blocks[blockName];
    var catName = blockName.split('_')[0];

    BOB_.cat[catName] = BOB_.cat[catName] || {};
    BOB_.cat[catName][blockName] = {};
    BOB_.cat[catName][blockName].xml = block.xml;
  }
}

/**//***************************    registerCat    ***************************///
BOB_.registerCat.iobroker = function() {
  Blockly.CustomBlocks = Blockly.CustomBlocks || [];
  Blockly.CustomBlocks.push('Custom');
  Blockly.Custom = {
    HUE: '#000000',
    blocks: {}
  };
  for ( var blockName in BOB_.Blocks ) {
    var block = BOB_.Blocks[blockName];
    var catName = blockName.split('_')[0];

    Blockly.Custom.blocks[blockName] = block.xml;
  }
}

/**//***************************    fügt die ownBlocks der Toolbox hinzu    ***************************//*/
// mit Kategorie
BOB_.addToToolbox = function() {
  for ( var catName in BOB_.cat ) {
    var cat = BOB_.cat[catName];
    for ( var blockName in cat ) {
      var block = cat[blockName];
      var xmlCat = '%{BKY_CAT' + catName.toUpperCase() + '}'; //ioB
      var xmlHue = '%{BKY_' + catName.toUpperCase() + '_HUE}';

      if ( typeof toolbox.children[xmlCat] === 'undefined' ) {
        var addCat = '<category name="' + xmlCat
                      + '" colour="' + xmlHue + '"></category>';
        toolbox.innerHTML = addCat + toolbox.innerHTML;
      }
      toolbox.children[xmlCat].innerHTML += block.xml;
    }
  }
  BOB_.reloadToolbox();
}

/**//***************************    fügt die ownBlocks der Toolbox hinzu    ***************************///
// ohne Kategorie
BOB_.addToToolbox = function() {
  var catName = 'Custom';
  for ( var blockName in BOB_.Blocks ) {
    var block = BOB_.Blocks[blockName];
    var xmlCat = '%{BKY_CAT' + catName.toUpperCase() + '}'; //ioB
    var xmlHue = '%{BKY_' + catName.toUpperCase() + '_HUE}';

    if ( typeof toolbox.children[xmlCat] === 'undefined' ) {
      var addCat = '<category name="' + xmlCat
                    + '" colour="' + xmlHue + '"></category>';
      toolbox.innerHTML = addCat + toolbox.innerHTML;
    }
    toolbox.children[xmlCat].innerHTML += block.xml;
  }
  BOB_.reloadToolbox();
}
/**//***************************    ToolboxNeuLaden Funktion    ***************************///
BOB_.reloadToolbox = function() {
  var toolboxText = document.getElementById('toolbox').outerHTML;
  toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g, //ioB
      function(m, p1, p2) {return p1 + MSG[p2];});  //ioB
  var toolboxXml = Blockly.Xml.textToDom(toolboxText);
  Blockly.getMainWorkspace().updateToolbox(toolboxXml);
}

/**//***************************    Funktionen ausführen    ***************************///
window.onload = function() {
//  BOB_.setWorkspaceOptions(); //ioB
  if ( BOB_.local ) {
  //  scripts.blocklyWorkspace = Blockly.getMainWorkspace();//ioBroker -> für Timeout Variable laden
  //  Blockly.getMainWorkspace = function() {return scripts.blocklyWorkspace}
  //  BOB_.ioBrokerLoad();
    BOB_.registerCat.local()
    BOB_.addToToolbox()
  } else {
    BOB_.registerCat.iobroker()
  }
}

/*window.addEventListener('DOMContentLoaded', function() {
  for (var script of document.getElementsByTagName('script')) {
    var filePath = 'static/js/main.0cb9602a.chunk.js';
    var src = script.getAttribute('src') || '';
    if ( src == filePath || src == "static/js/2.8cd898cb.chunk.js" || src.includes('static/js/main.') ) {
      script.onload = function() { BOB_.setWorkspaceOptions() }
    }
  }
}); */

//window.addEventListener('DOMContentLoaded', function() {
//  document.body.setAttribute('onclick' , 'Blockly.ownBlocks.setWorkspaceOptions()');
//});


/**//***************************    Ändert Workspace-Optionen    ***************************///
BOB_.setWorkspaceOptions = function() {
  !Blockly.ownBlocks.local && Blockly.ownBlocks.iobrokerLangImprove();
  Blockly.FieldDropdown.ARROW_CHAR = ''; // hide Dropdown-arrow
  Blockly.getMainWorkspace().scale = 1/1.2/1.2;
  Blockly.getMainWorkspace().options.moveOptions = {scrollbars: true,
                                                    drag: true,
                                                    wheel: true};//Ermöglicht scrollen mit scrollrad
  Blockly.getMainWorkspace().options.zoomOptions = {controls: true,
                                                    maxScale: 3,
                                                    minScale: 0.3,
                                                    scaleSpeed: 1.2,
                                                    startScale: 1/1.2/1.2,
                                                    wheel: true};
  Blockly.getMainWorkspace().resize();
  document.body.removeAttribute('onclick');
}

/**//***************************    ioBroker Scripte einbinden    ***************************//*/
BOB_.importScripts([
                    'blocks_words.js',
                    //'src/Editor.js',
                    'field_cron.js',
                    'field_oid.js',
                    'field_script.js',

                    'blocks_action.js',
                    'blocks_convert.js',
                    //'blocks_procedures.js',
                    'blocks_sendto.js',
                    'blocks_system.js',
                    'blocks_time.js',
//                      'blocks_timeout.js',
                    'blocks_trigger.js'
], '//RASPBERRYPI/ioBroker-Adapter/javascript.admin/google-blockly/own/');

var scripts = scripts || {};//ioBroker -> für Timeout Variable laden

var Blöcke = '';
BOB_.ioBrokerLoad = function() {
  var xmlDelete = "'schedule_create','cron_builder'";
  xmlDelete += "'control_ex','direct','get_attr','get_value_var','convert_from_date','time_get','time_compare','time_compare_ex'";
  var BlocksNotAdd = "'schedule_clear','control','toggle','update','get_value','get_value_async','field_oid','on_ext','on','schedule','schedule_clear','field_cron'";
  //in ownBlocks adaptiert
  BlocksNotAdd += "'regex','text_newline','timeouts_settimeout','timeouts_setinterval','timeouts_cleartimeout','timeouts_clearinterval'"
  for (var cat of Blockly.CustomBlocks) {
    if (typeof Blockly.Msg['CAT'+cat.toUpperCase()] === 'undefined') {
      Blockly.Msg['CAT'+cat.toUpperCase()] = Blockly.Words[cat][systemLang];
      Blockly.Msg[cat.toUpperCase()+'_HUE'] = Blockly[cat].HUE;
    }

    for (var block in Blockly[cat].blocks) {
      var xml = Blockly[cat].blocks[block];
      //if (block == 'selector') {alert(cat+'\n'+block);}
      if (xmlDelete.indexOf("'"+block+"'") >= 0) {xml = null;}
      if (BlocksNotAdd.indexOf("'"+block+"'") == -1) {
        BOB_.registerBlock(block, cat, xml);
      }
    }
  }
}

/**//***************************    Eigene Blöcke einbinden    ***************************///
//BOB_.local && BOB_.importScripts('//RASPBERRYPI/ioBroker-Adapter/javascript.admin/google-blockly/own/blocks_words.js');
//BOB_.importScripts('blocks/msg/de_ioBroker_change.js', BOB_.mainPath);

BOB_.importScripts([
  'blocks/msg/' + 'de' + '.js', //TO-DO
  'blocks/code.js',
//  'blocks/msg/de_ioBroker_change.js',

  'blocks/array_blocks.js',
//  'blocks/timeouts.js',
  'blocks/other_old.js',
//  'blocks/loops.js',
  'blocks/regex.js'
], BOB_.mainPath);


/**//***************************    setStatement Connector for Functions    ***************************///

/*Blockly.Blocks['procedures_defnoreturn'].init = (function() {
    var cached_function = Blockly.Blocks['procedures_defnoreturn'].init;
    return function() {
        // prefix
        cached_function.apply(this, arguments); // use .apply() to call it  //var resulut = ...
        // suffix
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        //return result;
    };
})();

/**/
