/*!
 * jQuery Conditional Buttons v1.0
 * By: Felix Lau
 * Date: 2014-10-22
 * Dependencies: contextual-eval.js (optional - enables contextual conditions) (https://github.com/bcfelix/contextual-eval)
 */
(function($) {

	var buttons = {};

	$.conditionalbuttons = function() {
		return this;
	};

	/**
	 * Add conditional buttons.
	 */
	$.conditionalbuttons.add = function(selector, condition, activeCallback, disableCallback) {
		var targets = $(selector).attr('disabled', 'disabled');
		targets.each(function(idx, elm) {
			var target = $(elm);
			var btn = buttons[target.data('cbtnid')];
			if(btn) {
				btn.conditions.push(condition);
				btn.condition = '(' + btn.conditions.join(') || (')  + ')';
			}
			else {
				var cbtnid = '_' + Math.random().toString(36).substr(2, 9);
				btn = {element: target, conditions: [condition], condition: '(' + condition + ')', activeCallbacks: [], disableCallbacks: []};
				buttons[cbtnid] = btn;
				target.bind('conditionchanged', function(e, c) {
					var elm = buttons[$(this).data('cbtnid')];
					if((typeof ceval === 'function') ? ceval(elm.condition, c) : eval(elm.condition)) {
						$(this).removeAttr('disabled');
						for(var i = 0, j = btn.activeCallbacks.length; i < j; i++) {
							activeCallbacks[i].apply(this, [$(this)]);
						}
					}
					else {
						$(this).attr('disabled', 'disabled');
						for(var i = 0, j = btn.disableCallbacks.length; i < j; i++) {
							disableCallbacks[i].apply(this, [$(this)]);
						}
					}
				}).data('cbtnid', cbtnid);
			}
			if(typeof activeCallback === 'function') {
				btn.activeCallbacks.push(activeCallback);
			}
			if(typeof disableCallback === 'function') {
				btn.disableCallbacks.push(disableCallback);
			}
		});
	};

	/**
	 * Add conditional buttons helper.
	 */
	$.fn.conditionalbuttons = function(options) {
		var defaults = {
			condition: false,
			activeCallback: null,
			disableCallback: null
		};
		options = (typeof options === 'string') ? {condition: options} : options;
		var settings = $.extend({}, defaults, options);
		$.conditionalbuttons.add(this, settings.condition, settings.activeCallback, settings.disableCallback);
	};

	/**
	 * Trigger buttons to refresh their status.
	 */
	$.conditionalbuttons.trigger = function(data) {
		for(var i in buttons) {
			buttons[i].element.trigger('conditionchanged', [data]);
		}
	};

}(jQuery));
