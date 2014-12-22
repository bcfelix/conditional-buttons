conditional-buttons
===================

JQuery Based Conditional Buttons. Enable and disable buttons using registered expressions, and trigger to change state. Good for application bar buttons.

See a [demo](http://bcfelix.github.io/conditional-buttons/)

## Setup
###Load required file(s)
The only required file is *jquery.conditionalbuttons.min.js*.

Additionally, you can optionally add [contextual-eval.min.js](https://github.com/bcfelix/contextual-eval) to simply the expressions.

``` javascript
//-- with contextual-eval --//
$('#btn-zoom').conditionalbuttons('checkedBoxes[0] == true');
//-- without contextual-eval --//
$('#btn-zoom').conditionalbuttons('c.checkedBoxes[0] == true');
```

## Usages
You have ways to register buttons.

##### Generally you will do this:
``` javascript
$('#btn-zoom').conditionalbuttons('checkedBoxes[0] == true');
```

##### Optional you may pass an object to enable additional features:
``` javascript
//-- these settings are optional --//
$('#btn-zoom').conditionalbuttons({
  // expression</code>
  condition: 'checkedBoxes[0] == true',
  // custom callback when button stage become enabled
  activeCallback: function(button) {
    button.css('color', 'red');
  },
  // custom callback when button stage become disabled
  disableCallback: function(button) {
    button.css('color', 'silver');
  }
});
```

##### Internally button registration is done in the statically way:
``` javascript
$.conditionalbuttons(
  // button jQuery selector
  '#btn-zoom',
  // expression
  'checkedBoxes[0] == true',
  // optional custom callback when button stage become enabled
  activeCallback: function(button) {
    button.css('color', 'red');
  },
  // optional custom callback when button stage become disabled
  disableCallback: function(button) {
    button.css('color', 'silver');
  }
);
```


## Examples
### Register Expressions
##### The following expressions have registered (contextual-eval used):
Note: multiple expressions added to the same button will joined by OR operator.
``` javascript
//-- additional feature is registered using object --//
$('#btn-zoom').conditionalbuttons({
  condition: 'checkedBoxes[0] == true',
  activeCallback: function(button) {
    button.css('color', '#ef4836');
  },
  disableCallback: function(button) {
    button.css('color', '#95a5a6');
  }
});
//-- mulitple expressions added onto a button will joined using OR operator --//
$('#btn-zoom').conditionalbuttons('checkedBoxes[4] == true');
$('#btn-remove, #btn-star').conditionalbuttons('checkedBoxes[0] == true && checkedBoxes[1] == true');
$('#btn-map, #btn-cloud, #btn-plus').conditionalbuttons('checkedBoxes[0] == false && checkedBoxes[2] == true && checkedBoxes[3] == true');
$('.btn-group button').conditionalbuttons('checkedBoxes[5] == true');
```

##### Change button stages by calling trigger:
``` javascript
//-- normalize your conditions is more preferable --//
var controls = $('.control input');
controls.click(function() {
  var ctx = [];
  for(var i = 0; i < controls.length; i++) {
    ctx[i] = controls[i].checked ? true : false;
  }
  $.conditionalbuttons.trigger({checkedBoxes: ctx});
});
```

## See Demo
See a [demo](http://bcfelix.github.io/conditional-buttons/)

## See Also
[Contextual Evaluation](https://github.com/bcfelix/contextual-eval">https://github.com/bcfelix/contextual-eval)
