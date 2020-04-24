'use strict';
// The file fixes the differences between original google-blockly and ioBroker-blockly

// the namespace is different
!Blockly.utils.xml && ( Blockly.utils.xml = Blockly.Xml.utils );

// add missing original function
if (typeof Blockly.Field.prototype.getParentInput === "undefined") {
  /**
   * Search through the list of inputs and their fields in order to find the parent input of a field.
   * @return {Blockly.Input} The input that the field belongs to, or null.
   */
  Blockly.Field.prototype.getParentInput = function() {
    if (!this.sourceBlock_) return null;
    for (var input of this.sourceBlock_.inputList) {
      if (input.fieldRow.indexOf(this) !== -1) return input;
    }
  }
}
