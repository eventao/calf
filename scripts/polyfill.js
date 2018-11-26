(function(){
  HTMLCollection.prototype.forEach = function(cb){
    const that = this;
    for(let i = 0; i < that.length; i++){
      cb(that.item(i));
    }
  };

  if(!Object.entries){
    Object.entries = function(obj ){
      let ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
      while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];

      return resArray;
    };
  }


})();