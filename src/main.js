import {Calf} from './Calf';

new Calf({
  el: '#app',
  data: {
    aSay: '',
    bSay: '',
    timer:'',
    pageTitle:'mvvm test',
    secondaryTitle:'双向绑定测试!',
  },
  mounted:function(){
    this.testFrame();
    this.timerRun();
  },
  methods:{
    testFrame(){
      const that = this;
      let persones = ['小明','小亮','小王','小治','小毛','小花'];
      let thins = ['小猪','小龙','小兔','小狗','小猫','小鹅'];

      let nameI = Math.floor(Math.random() * persones.length);
      this.aSay = persones[nameI];

      let thingI = Math.floor(Math.random() * thins.length);
      this.bSay = thins[thingI];

      setTimeout(function(){
        that.testFrame();
      },2500);
    },
    timerRun(){
      const that = this;
      let now = new Date(),
        y = now.getFullYear(),
        mon = now.getMonth() + 1,
        d = now.getDate(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();

      this.timer = `${y}-${mon}-${d} ${h}:${m}:${s} ${ms}`;
      setTimeout(function(){
        that.timerRun();
      },1);

    }
  }
});
