/**
 * Author: John Nunemaker http://addictedtonew.com http://orderedlist.com
 * 
 * - Hides label and puts label text inside of form element. 
 * - If no label exists, defaults to the title attribute of the element.
 * - On focus, removes the default text and the css class.
 * - On blur, adds the default text and css class back if the user did not fill in the form element.
 * - Adds a class to the form element that is removed when user puts information in. This allows 
 *   styling of the label with a lighter color than when the user has "real" text in the form element.
 *
 * NOTE: It only works with input[type=text] and textarea fields. All other elements are ignored.
 * 
 * Usage: 
 * 		$('input').labelize(); // uses blank as the class so you could use style input.blank {color:#ccc;}
 *							or
 * 		$('textarea').labelize({className:'foobar'}); // uses foobar as the class
 */
(function($) {  
	var self = null;
 	
	/**
	 * default options { className:'blank' }
	 */
	$.fn.labelize = function(options) {	
		return this.each(function() {
			if ((this.tagName.toLowerCase() == 'input' && $(this).attr('type') == 'text') || this.tagName.toLowerCase() == 'textarea') {
				new $.labelize(this, options);
			}
		});
	};
	
	$.labelize = function (e, options) {
		this.el          = $(e);
		this.options     = $.extend({className: 'blank'}, options);
		var defaultText = this.el.attr('title');
		
		$('label[for=' + this.el.attr('id') + ']').each(function(i) {
			$(this).hide();
			defaultText = this.innerHTML;
		});
		
		this.defaultText = defaultText;
		this.init();
	};
	
	$.labelize.prototype = {
		init: function() {
			var self = this;
			var val = $.trim(this.el.val());
			
			if (val == this.defaultText || val == '') { 
				this.el.val(this.defaultText);
				this.el.addClass(this.options.className);
			}
				
			this.el.focus(function(event) {
				if (self.el.val() == self.defaultText) {
					self.el.val('');
					self.el.removeClass(self.options.className);
				}
			});
			
			this.el.blur(function(event) {
				if ($.trim(self.el.val()) == '') {
					self.el.val(self.defaultText);
					self.el.addClass(self.options.className);
				}
			});
		}
	}
})(jQuery);