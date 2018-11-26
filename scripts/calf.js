(function(global){
    // 响应式对象赋值与获取的通知转发中心;
    const ObservableHandles = {};

    // 解析dom树
    function domInit(startEle){
        // 解析dom树结果
        const domInitResult = [];

        // 解析元素的文本双大括号绑定
        function moustache(ele){

            const childNodes = ele.childNodes;
            childNodes.forEach(function(node){
                switch(node.nodeType){
                    case 3:
                        const text = node.nodeValue.trim();
                        if(text){
                            const model = /\{\{(.*?)\}\}/;

                            const matchResults = model.exec(text);
                            model.search(text);
                            
                            if(matchResults && matchResults.forEach){

                                matchResults.forEach(m => {
                                    console.log(m);
                                });
                                
                                domInitResult.push({
                                    model,
                                    node,
                                    text,
                                    type:3,
                                });
                            }
                            
                        }
                        break;
                    case 1:
                        moustache(node);
                        break;
                }
            });
        }

        let eleStarted;
        if(typeof startEle === 'string'){
            eleStarted = document.querySelector(startEle);
        }else{
            eleStarted = startEle;
        }
        moustache(eleStarted);

        
        // eleStarted.children

    }

    // 将数据转换为响应式对象
    function convertDataToObserve(data){
        const ObservableDict = {};
        const Observable = {};

        Object.keys(data).forEach(function(k) {
            const v = data[k];
            if(typeof v === 'object'){

            }else{
                Object.defineProperty(Observable,k,{
                    get:function(){

                        const v = ObservableDict[k];
                        const handles = ObservableHandles[k+'-get'];
                        if(typeof handles === 'function'){
                            handles(v);
                        }else if(Array.isArray(handles)){
                            handles.forEach(function(handle){
                                handle(v);
                            });
                        }

                        return v;
                    },
                    set:function(v){
                        if(ObservableDict[k] !== v){
                            ObservableDict[k] = v;
                            
                            const handles = ObservableHandles[k+'-set'];
                            if(typeof handles === 'function'){
                                handles(v);
                            }else if(Array.isArray(handles)){
                                handles.forEach(function(handle){
                                    handle(v);
                                });
                            }

                        }
                    }

                })
            }
        });
        
    }

    global.Calf = function(params){
        convertDataToObserve(params.data);
        domInit(params.el);
    };

})(window);


