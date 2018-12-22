import './pollyfill';
import {Utils} from './Utils';

export class Calf {
  constructor(params) {
    let instance = {};
    Object.assign(instance,params.data);
    Object.assign(instance,params.methods);

    this.dataSource = instance;                   // 可修改数据
    this.cloneData = Utils.deepClone(params.data); // 参考数据
    this.dataChangeHandles = {};
    this.vNodes = [];
    this.mustacheNodes = {};

    this.dataFrameCheck();
    params.mounted.call(instance);
  }

  dataFrameCheck(){
    let that = this;
    that.checkDataObj();

    window.requestAnimationFrame(() => {
      that.dataFrameCheck();
    });

  }
  checkDataObj(){
    let that = this;
    for(let [key, value] of Object.entries(that.dataSource)){

      if((typeof value === 'object' || typeof value === 'function') && value !== null) {

        if (Array.isArray(value)) {

        }else if(value instanceof Function){
          //todo 函数待处理
        } else {
          that.checkDataObj();
        }
      }else{
        if(value !== that.cloneData[key]){
          let handles = that.dataChangeHandles[`${key}-changeHandles`];
          if(handles && handles.length){
            handles.forEach(handle => handle(value));
          }
          that.cloneData[key] = value;
          console.log(`${key}的值为:${value};`);
        }
      }
    }
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
              // this.gendirective.mapDirectElement(element,attr);
            });
          }
          this.genDomTree(element);
          break;
      }
    });
  }

}
