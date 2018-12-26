import {Calf} from './Calf';
import Test from './test.calf';

window.calf = new Calf({
  el:'#app',
  data:{
    pageTitle:'mvvm 测试!',
    user:{
      username:{
        firstName:"Adele",
        lastName:"Adkins"
      },
      sex:1,
    },
    friends:[
      {
        username:{
          firstName:"Scarlett",
          lastName:"Johansson"
        },
        sex:1,
      },
      {
        username:{
          firstName:"Audrey",
          lastName:"Hepburn"
        },
        sex:1,
      },
      {
        username:{
          firstName:"Kate",
          lastName:"Winslet"
        },
        sex:1,
      },
      {
        username:{
          firstName:"Monica",
          lastName:"Bellucci"
        },
        sex:1,
      },
      {
        username:{
          firstName:"Leonardo",
          lastName:"DiCaprio"
        },
        sex:0,
      },
    ],
    now:'',
  },
  mounted(){
    console.log(Test);
    this.testFrame();
  },
  methods:{
    testFrame(){
      let now = new Date(),
        y = now.getFullYear(),m = now.getMonth() + 1,d = now.getDate(),
        h = now.getHours(),minu = now.getMinutes(),se = now.getSeconds();

      this.now = `${y > 9 ? y:'0'+y}-${m > 9 ? m:'0'+m}-${d > 9 ? d:'0'+d} ${h > 9 ? h:'0'+h}:${minu > 9 ? minu:'0'+minu}:${se > 9 ? se:'0'+se}`;

      setTimeout(() => {
        this.testFrame();
      },1000);
    }
  }
});