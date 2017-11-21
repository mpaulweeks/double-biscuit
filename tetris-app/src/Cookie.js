class _CookieJar {

  set(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
  }

  get(cname, defaultValue) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
      var c = ca[i].trim();
      if (c.indexOf(name) === 0){
        return c.substring(name.length,c.length);
      }
    }
    return defaultValue;
  }

  ensure(cname, defaultValue) {
    const value = this.get(cname, defaultValue);
    this.set(cname, value, 3);
    return value;
  }
}

const CookieJar = new _CookieJar();

export default CookieJar;
