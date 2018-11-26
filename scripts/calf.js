(function (window) {

  const dataChangeHandles = {};

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
              dataChangeHandles[key + '-set'](newValue);
            } else if (Array.isArray(dataChangeHandles[key + '-set'])) {
              dataChangeHandles[key + '-set'].forEach(function (cb) {
                cb(newValue);
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
      obObj[key] = value;

    });


    return ObserveVm;
  }

  /**
   * 遍历dom节点
   * @param sourceNode
   */
  function genDomTree(sourceNode) {
    let mustacheNodes = {};

    sourceNode.childNodes.forEach(function (element) {
      switch(element.nodeType){
        case 3:
          const text = element.nodeValue.trim();

          let resultArray = Utils.mustach(text);
          // resultArray.keies
          if(resultArray.keies && resultArray.keies.length){

            resultArray.keies.forEach(function(propertyKey){
              let setHandles = dataChangeHandles[propertyKey + '-set'] = dataChangeHandles[propertyKey + '-set'] || [];
              setHandles.push(function(newValue){
                let newText = Utils.joinMustach(propertyKey,newValue,resultArray.result);
                element.replaceData(0,element.data.length,newText);
              });
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

    const observeData = genObserve(params.data);
    Object.assign(window.Calf.prototype,observeData);

    params.mounted.call(this);
  };



})(window);




