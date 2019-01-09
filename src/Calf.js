import './pollyfill';
import {DomAnalise} from './DomAnalise';
import {SystemDirectives} from './System-directives';
import {Utils} from './Utils';

export class Calf {

  constructor(params) {
    this.dataSource = {};
    Object.assign(this.dataSource, params.data);
    Object.assign(this.dataSource, params.methods);
    this.directiveGen = new SystemDirectives(this);

    this.vNodes = [];
    this.mustacheNodes = {};
    let app = typeof params.el === 'string' ? document.querySelector(params.el) : params.el;
    this.genDomTree(app);
    this.updateVnode(this.dataSource);
    params.mounted.call(this.dataSource);
  }

  genDomTree(sourceNode,parents) {
    const that = this;
    sourceNode.childNodes.forEach(element => {
      switch (element.nodeType) {
        // 文本节点解析
        case 3:
          const now = new Date();
          const text = element.nodeValue.trim();
          let resultArray = DomAnalise.mustach(text);
          if (resultArray.keies && resultArray.keies.length) {
            const vNode = {
              id:`${now.getTime()}${Math.random()}`,
              element,
              keies: resultArray.keies,
              pieces: resultArray.result,
              prevPieces: resultArray.result,
              nodeType:3,
              parents
            };
            this.vNodes.push(vNode);
            resultArray.keies.forEach(key => {
              that.mustacheNodes[key] = that.mustacheNodes[key] || [];
              that.mustacheNodes[key].push(vNode);
            });
          }
          break;
        case 1:
          // 元素属性解析
          let vNodes = this.directiveGen.attrAnalyse(element, this.directives, this.dataSource,parents);
          if(vNodes && vNodes.length){
            vNodes.forEach(vNode => {
              that.mustacheNodes[vNode.dataKey] = that.mustacheNodes[vNode.dataKey] || [];
              that.mustacheNodes[vNode.dataKey].push(vNode);
            });
            this.vNodes = this.vNodes.concat(vNodes);
            this.genDomTree(element,vNodes);
          }else{
            this.genDomTree(element,vNodes);
          }
          break;
      }
    });
  }

  updateVnode() {
    let that = this, data = that.dataSource;
    for (let [express,vNodes] of Object.entries(that.mustacheNodes)) {
      vNodes.forEach(vNode => {

        if(vNode.nodeType === 1){
          let value = Utils.invokCodeString(data,vNode.dataKey);
          vNode.updateHandle(vNode.element,{value},vNode,null);

        }else{
          let prevPieces = [];
          vNode.pieces.forEach(function (item, j) {
            if (typeof item === 'object') {
              let mValue = Utils.invokCodeString(data,item.propertyKey);
              prevPieces.push(mValue);
            } else {
              prevPieces.push(vNode.prevPieces[j]);
            }
          });
          if (prevPieces.length) {
            vNode.prevPieces = prevPieces;
            let newNode = prevPieces.join('');
            if (newNode !== vNode.value) {
              vNode.element.nodeValue = prevPieces.join('');
              vNode.value = newNode;
            }
          }


        }
      });

    }

    requestAnimationFrame(function () {
      that.updateVnode();
    });

  }

  static directive(name, params) {
    Calf.prototype.directives = Calf.prototype.directives || [];
    Calf.prototype.directives.push({
      name,
      params
    });
  }

}
