import { useState, useEffect } from "react"
import { Head } from "../../../components/Head"
import { SnackTitle } from "../../../components/SnackTitle"
import { Snacks } from "../../../components/Snacks"
import { getDesserts } from "../../../services/api"

export default function Desserts() {
  const [desserts, setDesserts] = useState([])
  useEffect(() =>{
    (async () =>{
      const dessertRequest = await getDesserts()

      setDesserts(dessertRequest.data)
    })()
  }, [])
  return (
    <>
      <Head title='Sobremesas' description="Nossas melhores sobremesas"/>
      <SnackTitle>Sobremesas</SnackTitle>
      <Snacks snacks={desserts}></Snacks>
    </>
  )
}
