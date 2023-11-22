import ResearchBarComponent from "./ResearchBarComponent";
import {useParams} from "react-router-dom";

export default function CommandPage(){
    const { id } = useParams();
    return(
        <div className="h-screen">
            <ResearchBarComponent id={id}></ResearchBarComponent>
        </div>
    )
}
