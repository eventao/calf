import './pollyfill';
import {DomAnalise} from './DomAnalise';

export class Calf {

  constructor(params) {
    let instance = {};
    Object.assign(instance, params.data);
    Object.assign(instance, params.methods);

    this.dataSource = instance;                   // 可修改数据
    this.vNodes = [];
    this.mustacheNodes = {};

    let app = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;
    this.genDomTree(app);
    this.updateVnode(this.dataSource);
    params.mounted.call(instance);
  }

  genDomTree(sourceNode) {
    const that = this;
    sourceNode.childNodes.forEach(element => {
      switch (element.nodeType) {
        //文本节点解析
        case 3:
          const text = element.nodeValue.trim();
          let resultArray = DomAnalise.mustach(text);

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
          // 元素属性解析
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

  updateVnode(){
    let that = this,data = that.dataSource;
    for(let [express,vNodes] of Object.entries(that.mustacheNodes)){
      if (vNodes.length) {
        vNodes.forEach(vNode => {
          let prevPieces = [];
          vNode.pieces.forEach(function (item, j) {
            if (typeof item === 'object') {
              let codes = [];
              Object.keys(data).forEach(dataKey => {
                let code = `let ${dataKey} = ${JSON.stringify(data[dataKey])};`;
                codes.push(code);
              });
              let funcValue = new Function(`${codes.join('')} return ${item.propertyKey}`);
              let mValue = funcValue();
              prevPieces.push(mValue);

            } else {
              prevPieces.push(vNode.prevPieces[j]);
            }

          });
          if (prevPieces.length) {
            vNode.prevPieces = prevPieces;
            let newNode = prevPieces.join('');
            if(newNode !== vNode.value){
              vNode.element.nodeValue = prevPieces.join('');
              vNode.value = newNode;
            }
          }
        });
      }
    }

    requestAnimationFrame(function(){
      that.updateVnode();
    })

  }

}
