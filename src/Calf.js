import './polyfill';
import {Utils} from './Utils.js';
import {Directive} from './Directive';

export class Calf{
  constructor(params){
    this.ObserveVm = {};
    this.vNodes = [];
    this.dataChangeHandles = {};
    this.mustacheNodes = {};
    this.gendirective = new Directive(Calf);

    const sourceNode = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;
    this.$el = sourceNode;

    this.genDomTree(sourceNode);
    this.genObserve(params.data);
    this.listenDataChange(params.data);
    this.dataInitValue(params.data);

    if(params.methods){
      Object.keys(params.methods).forEach(key => {
        this.ObserveVm[key] = params.methods[key];
      });
    }
    params.mounted.call(this.ObserveVm);
  }

  genDomTree(sourceNode) {
    const that = this;
    sourceNode.childNodes.forEach((element) => {
      switch(element.nodeType){
        //文本节点解析
        case 3:
          const text = element.nodeValue.trim();
          let resultArray = Utils.mustach(text);
          const vNode = {
            element,
            keies:resultArray.keies,
            pieces:resultArray.result,
            prevPieces:resultArray.result
          };
          this.vNodes.push(vNode);

          if(resultArray.keies && resultArray.keies.length){
            resultArray.keies.forEach(key => {
              that.mustacheNodes[key] = that.mustacheNodes[key] || [];
              that.mustacheNodes[key].push(vNode);
            });
          }
          break;

        //元素节点解析
        case 1:
          if(element.attributes.length){
            element.attributes.forEach(attr => {
              this.gendirective.mapDirectElement(element,attr);
            });
          }
          this.genDomTree(element);
          break;
      }
    });
  }

  genObserve(data, ObserveObj) {
    const that = this;

    let obObj = ObserveObj ? ObserveObj : this.ObserveVm;
    const keyValues = Object.entries(data);
    keyValues.forEach((kv) => {
      let key = kv[0], value = kv[1];

      Object.defineProperty(obObj, key, {
        set: function (newValue) {
          if (obObj['_$' + key] !== newValue) {
            obObj['_$' + key] = newValue;

            const setHandle = that.dataChangeHandles[key + '-set'];
            if (typeof setHandle === 'function') {
              setHandle(newValue,key);
            } else if (Array.isArray(setHandle)) {
              setHandle.forEach(function (cb) {
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
        if(Array.isArray(value)){

        }else{
          that.genObserve(value, this.ObserveVm[key]);
        }
      }

    });

  }

  listenDataChange(data){
    const that = this,keyValues = Object.entries(data);
    keyValues.forEach(kv => {

      let key = kv[0];
      let handles = that.dataChangeHandles[key + '-set'] = that.dataChangeHandles[key + '-set'] || [];
      handles.push(function(newValue,dataKey){

        // mustache绑定数据变化
        if(that.mustacheNodes[dataKey]){
          that.mustacheNodes[dataKey].forEach(function(vNode){

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

        // 指令绑定数据变化
        that.gendirective.dataUpdate(dataKey,newValue);

      });
    });
  }

  dataInitValue(data){
    const that = this;
    const keyValues = Object.entries(data);
    keyValues.forEach(function (kv) {
      let key = kv[0];
      that.ObserveVm[key] = kv[1];
    });
    that.gendirective.domChangeToObserve(that.ObserveVm);
  }

  static directive(name,params){
    Directive.prototype.directives = Directive.prototype.directives || {};
    Directive.prototype.directives[name] = params;
  }

  /**
   * 创建组件
   * @param name
   * @param params
   */
  static component(name,params){

  }

}

Calf.directive('c-model',{
  bind:function(el,binding,vNode){
    el.value = binding.value;
  },
  inserted:function(el){},
  eventInit:function(els,dataKey,vm){
    els.forEach(el => {
      el.oninput = function(event){
        vm[dataKey] = event.target.value;
      };
    });
  }
});

Calf.directive('v-for',{
  bind:function(el,binding,vNode){
    el.value = binding.value;
  },
  inserted:function(el){},
  eventInit:function(els,dataKey,vm){
    els.forEach(el => {
      el.oninput = function(event){
        vm[dataKey] = event.target.value;
      };
    });
  }
});
