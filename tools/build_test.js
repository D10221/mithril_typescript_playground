var shell = require('shelljs');

var files = "";

shell.ls('-R', 'test/*.ts').forEach(function(f) {
	files = files + " "+ f;  
}, this);

var r = shell.exec("tsc --module commonjs " + files );

if(r.code && r.output){
	shell.echo(r.output)
}

shell.exit(r.code);