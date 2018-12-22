(function() {
  let lastTime = 0;

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      let currTime = new Date().getTime();
      let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      let id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  /**
   * 对象深度遍历
   * @param callback
   */
  Object.prototype.traverse = function(callback){
    let that = this;
    let traverse = function(obj,keyString){
      for(let [key, value] of Object.entries(obj)){

        if((typeof value === 'object' || typeof value === 'function') && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((valueOfArray,i) => {
              traverse(value,`${keyString ? keyString + '.':''}${key}`);
            });
          }else if(value instanceof Function){
            //todo 函数待处理
          } else {
            traverse(value,`${keyString ? keyString + '.':''}${key}`);
          }
        }else{
          callback(key,value,keyString);
        }

      }
    };
    traverse(that);
  };

}());