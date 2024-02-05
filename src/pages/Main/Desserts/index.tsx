import { useSnack } from "../../../hooks/useSnack"

import { Head } from "../../../components/Head"
import { Snacks } from "../../../components/Snacks"
import { SnackTitle } from "../../../components/SnackTitle"


export default function Desserts() {
  const { desserts } = useSnack()

  return (
    <>
      <Head title='Sobremesas' description="Nossas melhores sobremesas"/>
      <SnackTitle>Sobremesas</SnackTitle>
      <Snacks snacks={desserts}></Snacks>
    </>
  )
}
