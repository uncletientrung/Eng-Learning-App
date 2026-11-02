import {useParams, useSearchParams} from "react-router-dom";
import ListeningExam from "./ListeningExam.jsx";
import PartSelectionPage from "../../components/sections/PartSelectionPage.jsx";

const ListeningExamPage = () =>{
    const {examid} = useParams();
    const [sp] = useSearchParams()
    const mode = sp.get("mode");
    const part = sp.get("part");
    if(mode==="full_test"){
        return <ListeningExam mode="full_test" />
    }
    else if(part!=null){
        return <ListeningExam mode="practice" part={part}/>
    }
    else return <PartSelectionPage examid={examid}/>
}
export default ListeningExamPage;