export class Directive {

    constructor() {
        this.directives = this.directives || {};
    }
    //映射指令与dom元素
    mapDirectElement(element, attr) {
        const dir = this.directives[attr.name];
        if (dir) {
            dir.bindElementes = dir.bindElementes || {};
            let attrValue = attr.value;
            if(attr.value.indexOf('of') > -1){
              attrValue = attr.value.split('of')[1].trim();
            }
            dir.bindElementes[attrValue] = dir.bindElementes[attrValue] || [];
            dir.bindElementes[attrValue].push(element);

            if(dir.inserted){
                dir.inserted(element);
            }
        }
    }

    //数据更新时,
    dataUpdate(dataKey, newValue) {
        for (let v of Object.values(this.directives)) {
            if (v.bindElementes && v.bindElementes[dataKey]) {
                v.bindElementes[dataKey].forEach(element => {
                    v.bind(element, {value: newValue}, null);
                });
            }
        }
    }

    //dom更新值到响应式对象
    domChangeToObserve(vm){
        const directives = this.directives;
        Object.keys(directives).forEach(key => {
            const keyEleMaps = directives[key].bindElementes;
            if(keyEleMaps){
                for(let [dataKey,elements] of Object.entries(keyEleMaps)){
                    const eventInit = directives[key].eventInit;
                    if(eventInit){
                        eventInit(elements,dataKey,vm);
                    }
                }
            }
        });
    }

}