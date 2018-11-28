(function (window) {

  const dataChangeHandles = {};
  let mustacheNodes = {};
  let vNodes = [];
  /**
   * 根据对象配置getter/setter
   * @type {{}}
   */
  const ObserveVm = {};

  /**
   * 绑定数据（数据对象转换成响应式对象）
   */
  function genObserve(data, ObserveObj) {

    let obObj = ObserveObj ? ObserveObj : ObserveVm;
    const keyValues = Object.entries(data);
    keyValues.forEach(function (kv) {
      let key = kv[0], value = kv[1];

      Object.defineProperty(obObj, key, {
        set: function (newValue) {
          if (obObj['_$' + key] !== newValue) {
            obObj['_$' + key] = newValue;
            if (typeof dataChangeHandles[key + '-set'] === 'function') {
              dataChangeHandles[key + '-set'](newValue,key);
            } else if (Array.isArray(dataChangeHandles[key + '-set'])) {
              dataChangeHandles[key + '-set'].forEach(function (cb) {
                cb(newValue,key);
              });
            }

          }
        },
        get: function () {
          return obObj['_$' + key];
        }
      });
      if (typeof value === 'object') {
        genObserve(value, ObserveVm[key]);
      }

    });

  }

  /**
   * 监听响应式对象发生变化
   */
  function listenDataChange(data){
    const keyValues = Object.entries(data);
    keyValues.forEach(function (kv) {

      let key = kv[0];
      let handles = dataChangeHandles[key + '-set'] = dataChangeHandles[key + '-set'] || [];
      handles.push(function(newValue,dataKey){
        if(mustacheNodes[dataKey]){
          mustacheNodes[dataKey].forEach(function(vNode){

            if(vNode.pieces && vNode.pieces.length){
              let prevPieces = [];
              vNode.pieces.forEach(function(item,j){
                if(typeof item === 'object' && item.propertyKey === dataKey){
                  prevPieces.push(newValue);
                }else{
                  prevPieces.push(vNode.prevPieces[j]);
                }
              });
              if(prevPieces.length){
                vNode.prevPieces = prevPieces;
                vNode.element.nodeValue = prevPieces.join('');
              }
            }

          });
        }
      });

    });
    return ObserveVm;
  }

  /**
   * 数据初始化
   */
  function dataInitValue(data){

    const keyValues = Object.entries(data);
    keyValues.forEach(function (kv) {
      let key = kv[0];
      ObserveVm[key] = kv[1];
    });
  }

  /**
   * 遍历dom节点
   * @param sourceNode
   */
  function genDomTree(sourceNode) {
    sourceNode.childNodes.forEach(function (element) {
      switch(element.nodeType){
        case 3:
          const text = element.nodeValue.trim();
          let resultArray = Utils.mustach(text);
          const vNode = {
            element,
            keies:resultArray.keies,
            pieces:resultArray.result,
            prevPieces:resultArray.result
          };
          vNodes.push(vNode);

          if(resultArray.keies && resultArray.keies.length){
            resultArray.keies.forEach(key => {
              mustacheNodes[key] = mustacheNodes[key] || [];
              mustacheNodes[key].push(vNode);
            });

          }

          break;
        case 1:
          genDomTree(element);
          break;
      }
    });
  }

  /**
   * calf 实例
   * @param params
   * @constructor
   */
  window.Calf = function (params) {
    const sourceNode = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;
    this.$el = sourceNode;
    genDomTree(sourceNode);
    genObserve(params.data);
    listenDataChange(params.data);
    dataInitValue(params.data);

    if(params.methods){
      Object.keys(params.methods).forEach(function(key){
        ObserveVm[key] = params.methods[key];
      });
    }

    params.mounted.call(ObserveVm);
  };

  window.Calf.directive = function(name,param){

  };

})(window);

