import './pollyfill';
import {Utils} from './Utils';

export class Calf {
  constructor(params) {
    let instance = {};
    Object.assign(instance, params.data);
    Object.assign(instance, params.methods);

    params.data.traverse(function (k, v, kstr) {
      console.log(`${kstr ? kstr + ',    ' : ''}${k}:${v}`);
    });

    this.dataSource = instance;                   // 可修改数据
    this.cloneData = Utils.deepClone(params.data); // 参考数据
    this.dataChangeHandles = {};
    this.vNodes = [];
    this.mustacheNodes = {};

    let app = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;
    this.genDomTree(app);

    this.listenDataChange(params.data);
    this.dataFrameCheck();
    this.dataInitValue(params.data);

    params.mounted.call(instance);
  }

  dataFrameCheck() {
    let that = this;
    that.checkDataObj(that.dataSource, that.cloneData);

    window.requestAnimationFrame(() => {
      that.dataFrameCheck();
    });

  }

  checkDataObj(dataObj, cloneObj, pKey) {

    let that = this;
    for (let [key, value] of Object.entries(dataObj)) {
      let parenesKey = `${pKey ? pKey + '.' : ''}${key}`;

      if ((typeof value === 'object' || typeof value === 'function') && value !== null) {
        if (value instanceof Function) {
          // todo 函数待处理
        } else {
          that.checkDataObj(value, cloneObj[key], parenesKey);
        }
      } else {

        if (value !== cloneObj[key]) {
          let handles = that.dataChangeHandles[`${parenesKey}-changeHandles`];
          if (handles && handles.length) {
            handles.forEach(handle => handle(value, parenesKey));
          }
          cloneObj[key] = value;
          // console.log(`${key}的值为:${value};`);
        }

      }
    }

  }

  genDomTree(sourceNode) {
    const that = this;
    sourceNode.childNodes.forEach(element => {
      switch (element.nodeType) {
        //文本节点解析
        case 3:
          const text = element.nodeValue.trim();
          let resultArray = Utils.mustach(text);

          const vNode = {
            element,
            keies: resultArray.keies,
            pieces: resultArray.result,
            prevPieces: resultArray.result
          };
          this.vNodes.push(vNode);

          if (resultArray.keies && resultArray.keies.length) {
            resultArray.keies.forEach(key => {
              that.mustacheNodes[key] = that.mustacheNodes[key] || [];
              that.mustacheNodes[key].push(vNode);
            });
          }
          break;

        case 1:
          //元素属性解析
          if (element.attributes.length) {
            element.attributes.forEach(attr => {
              // this.gendirective.mapDirectElement(element,attr);
            });
          }
          this.genDomTree(element);
          break;
      }
    });
  }

  listenDataChange(data) {
    const that = this, keyValues = Object.entries(data);
    keyValues.forEach(kv => {

      let key = kv[0];
      let handles = that.dataChangeHandles[key + '-changeHandles'] = that.dataChangeHandles[key + '-changeHandles'] || [];
      handles.push(function (newValue, dataKey) {

        // mustache绑定数据变化
        if (that.mustacheNodes[dataKey]) {
          that.mustacheNodes[dataKey].forEach(function (vNode) {

            if (vNode.pieces && vNode.pieces.length) {

              let prevPieces = [];
              vNode.pieces.forEach(function (item, j) {
                if (typeof item === 'object' && item.propertyKey === dataKey) {
                  prevPieces.push(newValue);
                } else {
                  prevPieces.push(vNode.prevPieces[j]);
                }
              });
              if (prevPieces.length) {
                vNode.prevPieces = prevPieces;
                vNode.element.nodeValue = prevPieces.join('');
              }
            }

          });
        }


      });
    });
  }

  dataInitValue(data) {
    const that = this;
    const keyValues = Object.entries(data);
    keyValues.forEach(function (kv) {
      let key = kv[0];
      that.dataSource[key] = kv[1];
    });
  }


}
