// A simple templating solution inspired by John Resig's microtemplates and Tim Caswells port as node.js module
// John Resig - http://ejohn.org/ - MIT Licensed
// Modified for node.JS by Tim Caswell <tim@creationix.com>
// Rewritten by Andreas Kalsch to preserve newlines and accept single quotes

module.exports = function tmpl(str, data){
	
	// Generate a reusable function that will serve as a template
	// generator (and which will be cached).
  
	var parts = str.split(/<%|%>/);

	var fnBody = "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){";
	for (var ii = parts.length, i = 0; i < ii; i++) {
	
		fnBody += i % 2
			? (
				parts[i][0] == '=' 
					? "print("+parts[i].substr(1)+");"
					: parts[i]
			)
			: "p.push('"+parts[i].replace(/\n/g, '\\n\\\n').replace(/'/g, "\\'")+"');";
		fnBody += "\n";
	}
	fnBody += "}return p.join('');";
  
	var fn = new Function("obj", fnBody);
  
	// Provide some basic currying to the user
	return data ? fn( data ) : fn;
}