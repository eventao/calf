import {Util} from './Util';


export class Calf {
  constructor(params) {
    this.cloneData = Util.deepClone(params.data);
    this.dataSource = params.data;
    this.dataFrameCheck();
  }
  dataFrameCheck(){
    let that = this;
    that.checkDataObj(that.dataSource);
    window.requestAnimationFrame(function(){
      that.dataFrameCheck();
    });
  }
  checkDataObj(obj){
    for(let [key, value] of Object.entries(obj)){
      if(typeof value === 'object'){
        if(Array.isArray(value)){

        }else{

        }
      }else{

      }
    }
  }

}
