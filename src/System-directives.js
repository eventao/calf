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

  attrAnalyse(element, dires, dataSource) {
    let attrs = element.attributes,result = {};
    attrs.forEach(attr => {
      let found = dires.filter(d => d.name === attr.name);
      if (found.length) {
        let foundAttr = found[0];

        if(foundAttr.name === 'c-for'){
          result.isReturnParent = true;
          element.removeAttribute(foundAttr.name);
        }

        foundAttr.params.bind(element, {express: attr.value, data: dataSource});
      }
    });
    return result;
  }

}
