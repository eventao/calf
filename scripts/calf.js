(function (window) {

  const CalfPrototype = {};
  const dataChangeHandles = {};

  /**
   * 根据对象配置getter/setter
   * @type {{}}
   */
  const ObserveVm = {};
  const obDict = {};    //响应式对象设置|获取值的存储.
  /**
   * 绑定数据（数据对象转换成响应式对象）
   */
  function genObserve(data, ObserveObj) {

    let obObj = ObserveObj ? ObserveObj : ObserveVm;

    const keyValues = Object.entries(data);
    keyValues.forEach(function (kv) {

      let key = kv[0], value = kv[1];
      let dataKey = ObserveObj ? '' : key;

      Object.defineProperty(obObj, key, {
        set: function (newValue) {

          if (obDict[dataKey] !== newValue) {
            obDict[dataKey] = newValue;

            if (typeof dataChangeHandles[key] === 'function') {
              dataChangeHandles[key](newValue);
            } else if (Array.isArray(dataChangeHandles[key])) {
              dataChangeHandles[key].forEach(function (cb) {
                cb(newValue);
              });
            }

          }

        },
        get: function () {
          return obDict[dataKey];
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
   * 生成dom树对象
   * @param sourceNode Calf挂载元素
   * @returns {{tagName: string, sourceNode: *, children: Array}}
   */
  function genDomTree(sourceNode) {
    let CalfElement = {
      tagName: sourceNode.tagName,
      sourceNode: sourceNode,
      children: [],
    };

    sourceNode.children.forEach(function (element) {
      let child = genDomTree(element);
      CalfElement.children.push(child);
    });
    return CalfElement;
  }

  /**
   * calf 实例
   * @param params
   * @constructor
   */
  window.Calf = function (params) {
    const sourceNode = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;
    this.$el = sourceNode;
    let domTree = genDomTree(sourceNode);
    this.data = genObserve(params.data);
  };

  window.Calf.prototype = CalfPrototype;


})(window);




