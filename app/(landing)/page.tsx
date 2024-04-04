import {Button} from "@/components/ui/button"
import  Link  from "next/link"

const LandingPage=()=>{
    return(
        <div className="flex flex-col justify-center align-middle items-center gap-6">
         Landing Page (Unprotected)
        
        <Link href={"/sign-up"}>
        <Button>
            LogOut
        </Button>
        </Link>
 
        <Link href={"/sign-in"}>
        <Button>
            Register
        </Button>
        </Link>
        </div>
    )
}

export default LandingPage