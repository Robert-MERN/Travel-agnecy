import axios from "axios"

const request = ()=>{
    axios.create({
        baseURL: "http://localhost:9900/api/flight",
    })
}

export default request