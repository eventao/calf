(function(){
    NodeList.prototype.forEach = NodeList.prototype.forEach ? NodeList.prototype.forEach :function(cb){
        const that = this;
        for(let i = 0; i < that.length; i++){
            cb(that.item(i));
        }
    };
})();