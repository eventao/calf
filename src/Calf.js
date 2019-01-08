import './pollyfill';
import {DomAnalise} from './DomAnalise';
import {SystemDirectives} from './System-directives';

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

  genDomTree(sourceNode) {
    const that = this;
    sourceNode.childNodes.forEach(element => {
      switch (element.nodeType) {
        // 文本节点解析
        case 3:
          const text = element.nodeValue.trim();
          let resultArray = DomAnalise.mustach(text);
          const vNode = {
            element,
            keies: resultArray.keies,
            pieces: resultArray.result,
            prevPieces: resultArray.result,
            nodeType:3,
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
          let f = this.directiveGen.attrAnalyse(element, this.directives, this.dataSource);
          if(f.isReturnParent){
            this.genDomTree(sourceNode);
          }else{
            this.genDomTree(element);
          }
          break;
      }
    });
  }

  updateVnode() {
    let that = this, data = that.dataSource;
    for (let [express,vNodes] of Object.entries(that.mustacheNodes)) {

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
          if (newNode !== vNode.value) {
            vNode.element.nodeValue = prevPieces.join('');
            vNode.value = newNode;
          }
        }
      });

    }

    requestAnimationFrame(function () {
      that.updateVnode();
    })

  }

  static directive(name, params) {
    Calf.prototype.directives = Calf.prototype.directives || [];
    Calf.prototype.directives.push({
      name,
      params
    });
  }

}
