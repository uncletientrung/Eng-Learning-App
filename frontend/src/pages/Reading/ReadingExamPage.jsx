import {useParams, useSearchParams} from "react-router-dom";
import ReadingExam from "../../components/sections/reading/reading-test/ReadingExam.jsx";
import PartSelectionPage from "../../components/sections/PartSelectionPage.jsx";
import {useEffect, useState} from "react";

const ReadingExamPage = () =>{
    const [ReadingTest, setReadingTest] = useState(null);

    const {examid} = useParams();
    const [sp] = useSearchParams()
    const mode = sp.get("mode");
    const part = sp.get("part");

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch(`http://localhost:5167/api/reading-tests/${examid}`);
            const data = await response.json();
            setReadingTest(data);
        }
        fetchdata();
    },[])

    if(mode==="full_test"){
        return <ReadingExam mode="full_test"  ReadingTest={ReadingTest}/>
    }
    else if(part!=null){
        return <ReadingExam mode="practice" part={part} ReadingTest={ReadingTest}/>
    }
    else return <PartSelectionPage examid={examid} type="reading" ReadingTest={ReadingTest}/>
}
export default ReadingExamPage;