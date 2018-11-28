
Calf.directive('focus',{
  bind:function(el,binding,vnode){
    let s = JSON.stringify;
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')

  }
});

const calf = new Calf({
  el: '#app',
  data: {
    message: 'hello world!',
    tudo: '吃饭',
  },
  mounted:function(){
    //this.testFrame();
  },
  methods:{
    testFrame(){
      const that = this;
      let persones = ['小明','小亮','小王','小猪','小毛','小花'];
      let thins = ['吃饭','睡','饿','开心','过去','回来'];
      let r1 = Math.random();
      let nameI = Math.floor(r1 * persones.length);
      this.message = persones[nameI];

      let thingI = Math.floor(Math.random() * thins.length);
      this.tudo = thins[thingI];

      setTimeout(function(){
        that.testFrame();
      },1500);
    }
  }
});

