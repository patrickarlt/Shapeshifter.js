(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // define and anonymous AMD module
    define(factory);
  } else {
    // define a browser global
    root.Shapeshifter = factory();
  }
}(this, function(){
  var Shapeshifter = {
    watchers: []
  },
  bool,
  doc = document,
  docElem = doc.documentElement,
  refNode = docElem.firstElementChild || docElem.firstChild,
  // fakeBody required for <FF4 when executed in <head>
  fakeBody = doc.createElement( "body" ),
  div = doc.createElement( "div" );

  div.id = "mq-test-1";
  div.style.cssText = "position:absolute;top:-100em";
  fakeBody.style.background = "none";
  fakeBody.appendChild(div);

  Shapeshifter.matchMedia = function(q){
    div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
    docElem.insertBefore( fakeBody, refNode );
    bool = div.offsetWidth === 42;
    docElem.removeChild( fakeBody );
    return {
      matches: bool,
      media: q
    };
  };

  Shapeshifter.Watcher = function(mq, opts){
    this.query = mq;
    this.onActive = (typeof opts.active === "function") ? opts.active : new Function();
    this.onInactive = (typeof opts.inactive === "function") ? opts.inactive : new Function();
    if (this.matches()) {
      this.isActive = true;
      this.onActive(this);
    } else {
      this.isActive = false;
      this.onInactive(this);
    }
  };

  Shapeshifter.Watcher.prototype = {
    matches: function(){
      return Shapeshifter.matchMedia(this.query).matches;
    },
    active: function(){
      return this.isActive;
    },
    test: function(){
      if(this.matches() && !this.active()){
        this.isActive = true;
        this.onActive(this);
      } else if (!this.matches() && this.active()){
        this.isActive = false;
        this.onInactive(this);
      }
    }
  };

  Shapeshifter.watch = function(mq, options){
    Shapeshifter.watchers.push(new Shapeshifter.Watcher(mq, options));
  };

  Shapeshifter.stop = function(mq){
    for (var i = 0; i < Shapeshifter.watchers.length; i++) {
      watcher = Shapeshifter.watchers[i];
      console.log(watcher.query, mq, watcher.query === mq, i);
      if(watcher.query === mq) {
        Shapeshifter.watchers.splice(i, 1);
      }
    }
  };

  Shapeshifter.testAll = function(e){
    for (var i = Shapeshifter.watchers.length - 1; i >= 0; i--) {
      Shapeshifter.watchers[i].test();
    }
  };

  Shapeshifter.once = function(mq, callback){
    Shapeshifter.watchers.push(new Shapeshifter.Watcher(mq, {
      active: function(){
        Shapeshifter.stop(mq);
        callback();
      }
    }));
  };

  Shapeshifter.on = function(mq, callback){
    Shapeshifter.watchers.push(new Shapeshifter.Watcher(mq, {
      active: callback
    }));
  };

  window.addEventListener('resize', Shapeshifter.testAll);
  window.addEventListener('orientationchange', Shapeshifter.testAll);

  return Shapeshifter;
}));