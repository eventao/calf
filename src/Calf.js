import {Util} from './Util';

export class Calf {
  constructor(params) {
    this.dataSource = params.data;                // 可修改数据
    this.cloneData = Util.deepClone(params.data); // 参考数据
    this.dataFrameCheck();
    this.dataChangeHandles = {};
  }
  dataFrameCheck(){
    let that = this;
    that.checkDataObj();
    window.requestAnimationFrame(function(){
      that.dataFrameCheck();
    });
  }
  checkDataObj(){
    let that = this;
    for(let [key, value] of Object.entries(that.dataSource)){
      if(typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {

        }else if(value instanceof Function){
          //todo 函数待处理
        } else {
        }
      }else{
        if(value !== that.cloneData[key]){
          let handles = that.dataChangeHandles[`${key}-changeHandles`];
          if(handles && handles.length){
            handles.forEach(handle => handle(value));
          }
          that.cloneData[key] = value;
        }
      }
    }
  }


}
