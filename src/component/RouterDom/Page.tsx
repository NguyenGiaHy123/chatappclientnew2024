import { lazy } from "react"

const TrangChu=lazy(()=>import('./TrangChu/TrangChu'))
const LoginAndRegister=lazy(()=>import('./LoginRegister/index'))
 const AllPage=[
{
path:'/login',
main:<LoginAndRegister/>
},
{
    path:'/register',
    main:<LoginAndRegister/>
}
,
{
    path:'/',
    main:<LoginAndRegister/>
},
{
    path:'/home',
    main:<TrangChu/>
},


]

export default AllPage