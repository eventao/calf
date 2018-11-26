const calf = new Calf({
  el: '#app',
  data: {
    message: 'hello world!',
    tudo: '吃饭',
  },
  mounted:function(){
    this.tudo = '不吃饭!';
  }
});

