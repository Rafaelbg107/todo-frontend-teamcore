import { Outlet } from "react-router-dom"

const HomeLayout = () => {

  return (
    <div style={{border: '1px solid blue'}}>
      <Outlet/>
    </div>
  )
}

export default HomeLayout