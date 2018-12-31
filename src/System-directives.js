export class SystemDirectives{

  constructor(calfInstance){

    calfInstance.directives = calfInstance.directives || [];
    calfInstance.directives.push({
      name:'c-for',
      params:{
        bind:function(el,binding,vnode,oldVnode){
          console.log(binding);
        },
        inserted:function(){},
        update:function(){},
        componentUpdated:function(){}
      }
    });

  }

  attrAnalyse(element,dires,dataSource){
    let attrs = element.attributes;
    attrs.forEach(attr => {
      let found = dires.filter(d => d.name === attr.name);
      if(found.length){
        console.log(dataSource);
        found[0].params.bind(element,{express:attr.value});
      }
    });
  }

}
