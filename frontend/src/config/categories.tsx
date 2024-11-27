import { BsHeartPulse } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";

const CATEGORIES_ICONS : {[key : string] : React.ReactNode}  = {
    'health_1' : <BsHeartPulse />,
    'leisure_1' : <IoWalletOutline /> 
}

export default CATEGORIES_ICONS;