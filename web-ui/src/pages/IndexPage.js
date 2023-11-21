import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const IndexPage = () => {
  const navigate = useNavigate()
  useEffect(() =>{
      const token = localStorage.getItem("CHAT_TOKEN")
      if(!token){
        navigate("/login") 
      }else{
        navigate("/dashboard")
      }
      // eslint-disable-next-line
  }, [])

	return <div>IndexPage</div>
}

export default IndexPage
