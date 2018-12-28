export class DomAnalise {

  static mustach(text) {
    const result = [], keies = [];
    if (text && text.indexOf('{{') > -1) {
      const leftMustaches = text.split('{{');
      leftMustaches.forEach(function (slice) {
        if (slice.indexOf('}}') > -1) {
          const propertyKey = slice.split('}}')[0];
          if (propertyKey) {
            result.push({
              propertyKey,
            });
            keies.push(propertyKey);
          }
          const noneValue = slice.split('}}')[1];
          if (noneValue) {
            result.push(noneValue);
          }
        } else {
          result.push(slice);
        }
      });
    }
    return {
      keies,
      result
    };
  }

  static keiesCalc(keies,data) {
    if (keies && keies.length) {

      for(let [key,v] of Object.entries(data)){
        let declare = new Function(`let ${key} = ${JSON.stringify(v)}`);
        declare();
      }
      keies.forEach(key => {
        let func;
        try{
          func = new Function(key);
          let result = func();
        }catch(e){
          console.log(e);
        }

      });
    }
  }

}