import { lazy, Suspense } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import Loading from "../components/common/Loading"
import PrivateRoute from "./PriveteRoutes"
import useFirebaseAuth from "../hook/useFirebaseAuth"
const SignIn = lazy(()=>import("../pages/SignIn"))
const About = lazy(()=>import("../pages/About"))
const Info = lazy(()=>import("../pages/Info"))
const Project = lazy(()=>import("../pages/Project"))
const Resume = lazy(()=>import("../pages/Resume"))
const ResumeFile = lazy(()=>import("../pages/ResumeFile"))
const Categories = lazy(()=>import("../pages/Categories"))
const MyRoutes = ()=>{
const { user, loading } = useFirebaseAuth();
if (loading) {
return <div>Loading...</div>;
}
return (
<Suspense fallback={<Loading/>}>
  <Routes>
  <Route index element={<Navigate to='/signIn' />} />
    <Route path="/signIn" element={user?<Navigate to='/home' />:<SignIn />} />
    <Route path="/home" element={<PrivateRoute/>}>
      <Route index element={<h1>Wellcome in my dashboard</h1>}/>
      <Route path="about" element={<About/>}/>
      <Route path="info" element={<Info/>}/>
      <Route path="categories" element={<Categories/>}/>
      <Route path="project" element={<Project/>}/>
      <Route path="resume" element={<Resume/>}/>
      <Route path="resumeFile" element={<ResumeFile/>}/>
      <Route path="*" element={<p>page not found</p>} />
    </Route>
  <Route path="*" element={<p>page not found</p>} />
  </Routes>
</Suspense>
)
}
export default MyRoutes