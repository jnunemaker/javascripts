/* just here to make it quicker to find in reference for myself */
var QuicksilverLiveSearch = Class.create({
	/**
	 * Sets up the caches and adds observers
	 */
	initialize: function(field, list) {
		this.field = $(field);
		this.list  = $(list);
		
		if (this.field && this.list) {
			this.rows  = $A([]);
			this.cache = $A([]);
			this.setupCache();
			
			// kill normal submit of form since it's live
			this.form = this.field.up('form');
			this.form.observe('submit', function(e) { e.stop(); });
			
			// setup observer on the search field to run the filter when typing
			this.field.observe('keyup', this.filter.bindAsEventListener(this));
			
			// run the filter initially for any text that may be in it
			this.filter();
		}
	},
	
	/**
	 * Caches inner html of children in array for later manipulation. 
	 */
	setupCache: function() {
		// loop through immediate descendents (in this case li's) and push
		// their lowercase text to the cache and the li to the rows
		this.list.immediateDescendants().each(function(child) {
			this.cache.push(child.innerHTML.toLowerCase());
			this.rows.push(child);
		}.bind(this));
		this.cache_length = this.cache.length;
	},
	
	/**
	 * Runs the filter that only shows the rows 
	 * that have a score based on the search term.
	 */
	filter: function() {
		// if nothing is in the field show all the rows
		if (!this.field.present()) { this.rows.invoke('show'); return; }
		
		// get the scores and hide the low scoring items
		this.displayResults(this.getScores($F(this.field).toLowerCase()));
	},
	
	/**
	 * Hides all the rows and shows on the ones with a score over 0
	 */
	displayResults: function(scores) {
		// hide all rows default
		this.rows.invoke('hide');
		
		// show each row that had a score
		scores.each(function(score) { this.rows[score[1]].show(); }.bind(this))
	},
	
	/**
	 * Get the score of each row in the cache and return sorted 
	 * result set of [score, index of row in this.rows]
	*/
	getScores: function(term) {
		var scores = $A([]);
		
		// loop through the cache and get the score for each item 
		// appending them to the return set if they have a score
		// greater than 0; basically building an array like this:
		// [[0.69, 2], [0.33, 34], ...] where the first element is
		// the string score and the second is the index of the item
		// that scored that
		for (var i=0; i < this.cache_length; i++) {
			var score = this.cache[i].score(term);
			if (score > 0) { scores.push([score, i]); }
		}
		
		// sort the scores descending by the algorithm score (the first element in the array)
		return scores.sort(function(a, b) { return b[0] - a[0]; });
	}
});