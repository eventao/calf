import {Util} from './Util';

export class Calf {
  constructor(params) {
    this.dataSource = params.data;                // 可修改数据
    this.cloneData = Util.deepClone(params.data); // 参考数据
    this.dataFrameCheck();
    this.dataChangeHandles = {};
  }
  dataFrameCheck(){
    let that = this;
    that.checkDataObj();
    window.requestAnimationFrame(function(){
      that.dataFrameCheck();
    });
  }
  checkDataObj(){
    let that = this;
    for(let [key, value] of Object.entries(that.dataSource)){
      if(typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {

        }else if(value instanceof Function){
          //todo 函数待处理
        } else {
        }
      }else{
        if(value !== that.cloneData[key]){
          let handles = that.dataChangeHandles[`${key}-changeHandles`];
          if(handles && handles.length){
            handles.forEach(handle => handle(value));
          }
          that.cloneData[key] = value;
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
              this.gendirective.mapDirectElement(element,attr);
            });
          }
          this.genDomTree(element);
          break;
      }
    });
  }

}
