Object.extend(String.prototype, {
  // if a string doesn't end with str it appends it
  ensureEndsWith: function(str) {
    return this.endsWith(str) ? this : this + str;
  },
  
  // makes sure that string ends with px (for setting widths and heights)
  px: function() {
    return this.ensureEndsWith('px');
  }
});

Object.extend(Number.prototype, {
  // makes sure that number ends with px (for setting widths and heights)
  px: function() {
    return this.toString().px();
  }
});

var Window = {
  // returns correct dimensions for window, had issues with prototype's sometimes. this was ganked from apple.
  size: function() {
		var width  = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
		var height = window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
		var x      = window.pageXOffset || (window.document.documentElement.scrollLeft || window.document.body.scrollLeft);
		var y      = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop);
		return {'width':width, 'height':height, 'x':x, 'y':y}
	}
}

// some goodies for converting numbers and strings to currency format
Object.extend(String.prototype, {
	toFloat: function() {
		f = parseFloat(this.gsub(/[^0-9\.]/, ''));
		return (isNaN(f)) ? 0.0 : f;
	},
	
	/* only supports . as separator because of parseFloat use */
	toCurrency: function(o) {
		var dollars = 0, cents = 0;
		var options = $H({ precision:2, unit:'$' }).merge(o)
		var amount  = new String(this).gsub(/[^0-9\.]/, '');
		var parts   = amount.split('.');

		if (parts.length > 1) {
			dollars = parts[0];
			cents = parts[1];
		} else {
			dollars = parseInt(parts[0]);
			cents = 0;
		}

		if (isNaN(parseInt(dollars))) { dollars = 0; }
		if (isNaN(parseInt(cents))) 	{ cents = 0; }
		return options.get('unit') + parseFloat(dollars + '.' + cents).toFixed(options.get('precision'));
	}
});

Object.extend(Number.prototype, {
	toCurrency: function() {
		return new String(this).toCurrency();
	}
});