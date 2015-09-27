
export interface iLogger {
	info:(m:string)=> void;
	warning:(m:string)=> void;
	error:(m:string)=> void;
}

class logger implements iLogger {
	
	private  log: (msg:string) => void = (msg:string)=>
	{
		if(this._canLog){
			console.log(`${this._name}:${msg}`);			
		}	
	}
	
	private _canLog = false;
	private _name:string;
	
	constructor(switches){
		this._canLog = switches && switches.canLog;
		this._name = switches &&  switches.name ? switches.name : '???'; 
	}
	
	info: (msg)=> void = (msg)=>{
		this.log(`info:${msg}`)
	};
	warning: (msg)=> void = (msg)=>{
		this.log(`info:${msg}`)
	};
	error: (msg)=> void = (msg)=>{
		this.log(`info:${msg}`)
	};
}

export function loggerFty(caller:string){
	return new logger({canLog: true , name: caller});
}

export var default_logger: iLogger  = new logger({canLog: true })