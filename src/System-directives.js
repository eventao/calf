export class SystemDirectives {

  constructor(calfInstance) {

    calfInstance.directives = calfInstance.directives || [];
    calfInstance.directives.push({
      name: 'c-for',
      params: {
        bind: function (el, binding, vnode, oldVnode) {
          let split = '', tokenes;
          if (binding.express.indexOf('of') > -1) {
            split = 'of';
          } else if (binding.express.indexOf('in') > -1) {
            split = 'in';
          }

          if (split) {
            tokenes = binding.express.split(split);
            if(tokenes.length > 1){
              tokenes.forEach((token,i) => tokenes[i] = token.trim());
              let parentEle = el.parentNode;
              let dataKey = tokenes[1],dataList = binding.data[dataKey];
              dataList.forEach(item => {
                // tokenes[0]
                parentEle.appendChild(el.cloneNode(true));
              });
              console.log(123);
            }
          }

        },
        inserted: function (el, binding, vnode, oldVnode) {
        },
        update: function (el, binding, vnode, oldVnode) {

        },
        componentUpdated: function (el, binding, vnode, oldVnode) {
        },
        unbind:function(el, binding, vnode, oldVnode){
        }

      }
    });
  }

  attrAnalyse(element, dires, dataSource,parents) {
    let attrs = element.attributes,vNodes = [];
    attrs.forEach(attr => {
      let found = dires.filter(d => d.name === attr.name);
      if (found.length) {
        found.forEach(foundDir => {
          let now = new Date();
          let vNode = {
            id:`${now.getTime()}${Math.random()}`,
            element,
            parents,
            nodeType:1,
            dir:foundDir.name,
            express:attr.value,
            updateHandle:foundDir.params.update,
            keies:''
          };
          let bindData = foundDir.params.bind(element, {express: attr.value, data: dataSource});
          vNode.keies = bindData ? bindData.keies : '';
          vNodes.push(vNode);
        });
      }
    });
    return vNodes;
  }

}
