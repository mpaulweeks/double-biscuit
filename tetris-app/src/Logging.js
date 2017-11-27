
class _Logger {
  constructor(){
    this._debug = document.location.host.indexOf('localhost') >= 0;
    this._info = this._debug && document.location.search.indexOf('info') >= 0;
  }

  debug(...messages){
    if (this._debug){
      console.log(...messages);
    }
  }

  info(...messages){
    if (this._info){
      console.log(...messages);
    }
  }
}

const Logger = new _Logger();

export default Logger;
