/**
 * Logging class which ignores logging unless we set a level to output
 */
var Log = {
	levels: $A(['off', 'info', 'debug', 'error']),
	_level: 'off',
	_levelNotFoundValue: -1,
	
	// writes to the log if the level is appropriate and we have our Firebug console
	write: function(level, msg) {
		if (Log.getLevel() == 'off') return;
		var cur_level = Log.getLevelIndex(Log.getLevel());
		var req_level = Log.getLevelIndex(level);
		// only log if level exists and it is greater than or equal the the current level
		if (req_level != Log._levelNotFoundValue && cur_level <= req_level) {
			try {
				console.log(level + ': ' + msg);
			} catch(e) {
				// fail silently
			}
		}
	},
	
	// creates functions to write to the log at the various levels
	info: 	function(msg) { Log.write('info', msg); },
	debug: 	function(msg) { Log.write('debug', msg); },
	error: 	function(msg) { Log.write('error', msg); },
	
	// gets the levels array index of a level
	getLevelIndex: function(level) { return (Log.levels.include(level) ? Log.levels.indexOf(level) : Log._levelNotFoundValue); },
	
	// returns the current level string value
	getLevel: function() { return Log._level; },
	
	// sets the level of logging to output
	level: function(level) { 
		Log._level = Log.levels.include(level) ? level : null;
		if (Log._level == null) { throw('Log level does not exist'); }
	}
}
Log.level('info');