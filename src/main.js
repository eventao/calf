import {Calf} from './Calf';


window.calf = new Calf({
  el:'#app',
  data:{
    pageTitle:'hello world!',
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
      let now = new Date(),
        y = now.getFullYear(),m = now.getMonth() + 1,d = now.getDate(),
        h = now.getHours(),minu = now.getMinutes(),se = now.getSeconds();

      this.now = `${(y+'').padStart(2,'0')}-${(m+'').padStart(2,'0')}-${(d+'').padStart(2,'0')} ${(h+'').padStart(2,'0')}:${(minu+'').padStart(2,'0')}:${(se+'').padStart(2,'0')}`;

      setTimeout(() => {
        this.testFrame();
      },1000);
    }
  }
});