import { useParams } from "react-router-dom";

export default function Profile() {

  let params = useParams()

  return (
    <div>
      <h1>This is Profile page.</h1>
      <p>param: {params.id}</p>
    </div>
  )
}
