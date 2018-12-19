module.exports = class RouterConfit{
  static config(router){
    router.get('/api',function(req,res){
      res.json({name:'success!'});
    });
  }
};