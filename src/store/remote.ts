import axios from "axios";

const otherWay =  (METHOD:string , HOST:string,PORT:number, )=>{
  axios({
    method: METHOD,
    url: `${HOST}:${PORT}/post`,
    headers:{
      
    },

    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  }).then(data =>console.log('data',data.data)
  ).catch(e =>console.log('no se a iniciado el servidor')
  );
}

export default otherWay