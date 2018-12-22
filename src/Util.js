export class Util{

  static deepClone(data){
    let result = {};
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
        result[key] = value;
      }
    }
    return result;
  }

}