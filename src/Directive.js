export class Directive {

    constructor() {
        this.directives = this.directives || {};
    }

    mapDirectElement(element, attr) {
        const dir = this.directives[attr.name];
        if (dir) {
            dir.bindElementes = dir.bindElementes || {};
            dir.bindElementes[attr.value] = dir.bindElementes[attr.value] || [];
            dir.bindElementes[attr.value].push(element);

            if(dir.inserted){
                dir.inserted(element);
            }

        }
    }

    dataUpdate(dataKey, newValue) {
        for (let v of Object.values(this.directives)) {
            if (v.bindElementes && v.bindElementes[dataKey]) {
                v.bindElementes[dataKey].forEach(element => {
                    v.bind(element, {value: newValue}, null);
                });
            }
        }
    }

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