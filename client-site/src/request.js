import axios from "axios"

const request = ()=>{
    axios.create({
        baseURL: "https://axen-trave-test.herokuapp.com/api/flight",
    })
}

export default request