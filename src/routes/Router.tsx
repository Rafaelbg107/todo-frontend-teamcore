import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import { RoutesData } from "./RoutesData";
import HomeLayout from "../layouts/HomeLayout";


export const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<HomeLayout/>}>
            <Route
              path={RoutesData.HOME.link}
              element={RoutesData.HOME.Comp()}
            />
          </Route>
          <Route path="*" element={<Navigate to={'/home'} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}