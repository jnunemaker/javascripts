/**
 * For fixing the IE6 div's can't show over selects issue. Requires Prototype 1.6+
 * 
 * Call Annoying.fix(id or element) to put an iframe behind the element 
 * that covers selects and Annoying.unfix(id or element) to hide that 
 * iframe when hiding the element.
 */
var Annoying = {
	fix: function(id_or_el) {
		var element = $(id_or_el);
		if (!element) { return; }		
		
		var iframe = Annoying.iFrameFor(element);
		
		// if we don't have an iframe and it's ie create iframe
		if(!iframe && Prototype.Browser.IE) {
			iframe = Annoying.createIframe(element);
		}
		
		// now we should have an iframe so let's 
		// show it which will hide the selects
    if(iframe) {
			setTimeout("Annoying.finalizeFix('" + element.id + "')", 50);
		}
	},
	
	// hide the iframe so the selects appear again
	unfix: function(id_or_el) {
		var element = $(id_or_el);
		var iframe  = Annoying.iFrameFor(element);
		if (!element || !iframe) { return; }
		iframe.hide();
	},
	
	// finds the iframe for a given element
	iFrameFor: function(id_or_el) {
		var element = $(id_or_el);
		if (!element) { return; }
		return $(element.id + '_iefix');
	},
	
	// adds an iframe after the element and returns the iframe
	createIframe: function(id_or_el) {
		var element = $(id_or_el);
		if (!element) { return; }
		element.insert({ after: '<iframe id="' + element.id + '_iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>'});
		return $(element.id + '_iefix');
	},
	
	// positions the iframe perfectly behind the element 
	// and over any selects that may be there
	finalizeFix: function(id_or_el) {
		var element = $(id_or_el);
		if (!element) { return; }
		var iframe = Annoying.iFrameFor(element);
		if (element && iframe) {
			try {
				iframe.clonePosition(element);
				iframe.setStyle({zIndex: 1});
				element.setStyle({zIndex: 2});
				iframe.show();
			} catch(e) {}
		}
	}
}