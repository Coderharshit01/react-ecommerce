
import { useState,useEffect } from "react";

export  function useFetch(url) {
    const [data , setData] = useState(null)
    const [loading , setLoading] = useState(false)
    useEffect(()=>{
        async function fetchData() {
            setLoading(true)
            try{
                const response = await fetch(url)
                if(!response.ok) throw new Error("Fetch Failed")
                const dat = await response.json()
            setData(dat)
            } catch(err) {
                console.log(err)
            } finally{
                setLoading(false)
            }

        }
        fetchData()
    },[url])
return {data,loading}
}
