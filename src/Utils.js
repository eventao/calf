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

  static mustach(text){
    const result = [],keies = [];

    if(text && text.indexOf('{{') > -1){
      const leftMustaches = text.split('{{');
      leftMustaches.forEach(function(slice){
        if(slice.indexOf('}}') > -1){
          const propertyKey = slice.split('}}')[0];
          if(propertyKey){
            result.push({
              propertyKey,
            });
            keies.push(propertyKey);
          }
          const noneValue = slice.split('}}')[1];
          if(noneValue){
            result.push(noneValue);
          }
        }else{
          result.push(slice);
        }
      });
    }

    return {
      keies,
      result
    };
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

}