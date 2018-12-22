import {Calf} from './Calf';

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
    this.testFrame();
  },
  methods:{
    testFrame(){
      let now = new Date();
      this.now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      setTimeout(() => {
        this.testFrame();
      },1000);
    }
  }
});