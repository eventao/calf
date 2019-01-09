export class Utils{

  static deepClone(data){
    let result = {};

    data.traverse((k, v, kstr) => {

    });
    for (let [key, value] of Object.entries(data)) {
      if(typeof value === 'object'){
        if(Array.isArray(value)){
          result[key] = [];
          value.forEach(vItem => {
            let cItem = this.deepClone(vItem);
            result[key].push(cItem);
          });
        }else{
          result[key] = this.deepClone(value);
        }
      }else{
        result[key] = null;
      }
    }

    return result;
  }

  static joinMustach(key,value,formatArray){
    let result = [];
    formatArray.forEach(item => {
      if(typeof item === 'object' && item.propertyKey === key){
        result.push(value);
      }else{
        result.push(item);
      }
    });
    return result.join('');
  }

  static invokCodeString(data,codeStr){
    let codes = [];
    Object.keys(data).forEach(dataKey => {
      let code = `let ${dataKey} = ${JSON.stringify(data[dataKey])};`;
      codes.push(code);
    });
    let funcValue = new Function(`${codes.join('')} return ${codeStr}`);
    return funcValue();
  }

}