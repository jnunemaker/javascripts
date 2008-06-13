/**
 * Unobtrusive TabSet
 * Author: John Nunemaker
 * Website: Addicted To New (http://addictedtonew.com)
 * Requires: Prototype 1.6+
 * 
 * - Checks url to see if it should activate based on hash (ie: http://somedomain.com/#team)
 * - Ff no hash in url or hash in url is for a different tab set, it activates the first tab
 *   in the set
 * - Tabs can be bookmarked because of the url checking
 * - Sets a class of 'active' on the active tab (li), can be changed with activeClass option
 *
 * Usage:
 * <ul id="some_id">
 *   <li><a href="#about">About</a></li>
 *   <li><a href="#team">Team</a></li>
 *   <li><a href="#contact">Contact</a></li>
 * </ul>
 *
 * <div id="about">Some text...</div>
 * <div id="team">Some text...</div>
 * <div id="contact">Some text...</div>
 *
 * <script type="text/javascript">
 *   new TabSet('some_id');
 *   // new TabSet('some_id', {activeClass: 'current'}); // would change the active class to current
 * 	 // new TabSet('some_id', {stopEvent:true}); // stops the click event when tab link is clicked
 * </script>
 */
var TabSet = Class.create({ 
	/* element is the id of the tab set ul */ 
	initialize: function(element, options) { 
		this.options = $H({ activeClass: 'active', stopEvent: false }).merge(options); 
		this.element = $(element);
		this.tabs 	 = this.element.select('a');
		this.areas 	 = $A([]);
		this.tabs.each(function(tab) {
			var area = this.areaForTab(tab);
			if (area) { this.areas.push(area); }
		}.bind(this));
		this.areas.invoke('hide');
		this.addObservers();
		this.setInitialTab(); 
	},

	addObservers: function() { 
		this.tabs.each(function(tab) { tab.observe('click', this.onClick.bindAsEventListener(this)); }.bind(this)); 
	},

	setInitialTab: function() {
		var initialTab = this.tabs.first();
		if (window.location.hash) {
			this.tabs.detect(function(tab) {
				if (this.parseHash(tab.href) == this.parseHash(window.location.hash)) {
					initialTab = tab;
				}
			}.bind(this));
		} 
		this.showTab(initialTab); 
	},

	showTab: function(tab) { 
		var tab = $(tab); 
		this.areas.invoke('hide');
		this.setActiveListElement(tab);
		this.areaForTab(tab).show();
	},

	setActiveListElement: function(tab) {
		this.removeActiveClass();
		$(tab).up().addClassName(this.options.get('activeClass'));
	},

	removeActiveClass: function() {
		this.tabs.each(function(tab) {
			tab.up().removeClassName(this.options.get('activeClass')); 
		}.bind(this));
	},

	isTab: function(el) { 
		return (this.tabs.include($(el))) ? true : false; 
	},

	isArea: function(el) { 
		return (this.areas.include($(el))) ? true : false;
	},

	onClick: function(event) { 
		if (this.options.get('stopEvent')) { event.stop(); } 
		var el = Event.findElement(event, 'a'); 
		this.showTab(el); 
	},
	
	areaForTab: function(tab) {
		var tab     = $(tab);
	  var area_id = tab.readAttribute('href').split('#')[1];
	  return $(area_id);
	},
	
	parseHash: function(href) {
		var str = href.split('#').last();
	  return str;
	}
});