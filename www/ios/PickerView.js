//
//  PickerView.js
//
// Created by Olivier Louvignes on 2011-11-28.
//
// Copyright 2011-2012 Olivier Louvignes. All rights reserved.
// MIT Licensed


var exec = require('cordova/exec');

var pickerView = {
	create: function(items, options, callback) {
		options || (options = {});
		var scope = options.scope || null;

		var config = {
			items: items || {},
			title: options.title || ' ', // avoid blur with a !empty title
			style: options.style || 'default',
			sourceRect: options.sourceRect, // position for tablets
			arrowDirection: options.arrowDirection || 'any',
			doneButtonLabel: options.doneButtonLabel || 'Done',
			cancelButtonLabel: options.cancelButtonLabel || 'Cancel'
		};

		// Force strings for items data text
		for (var key in items) {
			for (var _key in items[key].data) {
				items[key].data[_key].text = items[key].data[_key].text + '';
			}
		}

		var _callback = function(result) {
			var values = result.values,
			buttonIndex = result.buttonIndex;

			if(typeof callback == 'function') {
				if(buttonIndex !== 0) { // Done
					callback.apply(scope, [values, buttonIndex]);
				} else { // Cancel
					callback.apply(scope, [{}, buttonIndex]);
				}
			}
		};

		return exec(_callback, _callback, 'PickerView', 'create', [config]);
	},
	setValue: function(values, options, callback) {
		options || (options = {});
		var scope = options.scope || null;

		var config = {
			animated : options.hasOwnProperty('animated') ? !!options.animated : true,
		};

		var _callback = function() {
			if(typeof callback == 'function') {
				callback.apply(scope, arguments);
			}
		};

		return cordova.exec(_callback, _callback, 'PickerView', 'setValue', [values, config]);
	}
}

module.exports = pickerView;
if(window.cordova){
	window.cordova.pickerView = pickerView;
}