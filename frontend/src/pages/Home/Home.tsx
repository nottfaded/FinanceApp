import { Outlet } from "react-router-dom";
import { MainDrawer } from '../../components/MainDrawer';



export function Home() {
    


    return (
        <div className='h-screen w-full'>
            <MainDrawer />
            <Outlet />
        </div>
    )
}
