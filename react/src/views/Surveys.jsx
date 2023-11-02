import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import PaginationTable from "../components/PaginationTable";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../request/axiosclient.jsx";

const Surveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});

    const getSurveys = (url) => {
        url = url || "/survey";
        axiosClient.get(url).then(({ data }) => {
            data?.data && setSurveys(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    useEffect(() => {
        getSurveys();
    }, []);

    const onPageClick = (link) => {
        getSurveys(link.url);
    };

    return loading ? (
        <h1 className="text-3xl font-bold text-center text-purple-500 mt-5">
            Loading...
        </h1>
    ) : (
        <PageComponent
            title="Surveys"
            buttons={
                <TButton color="green" to="/surveys/create">
                    <PlusCircleIcon className="w-6 h-6 mr-2" />
                    Create Survey
                </TButton>
            }
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys?.map((survey) => (
                    <SurveyListItem survey={survey} key={survey.id} />
                ))}
            </div>
            <PaginationTable meta={meta} onPageClick={onPageClick} />
        </PageComponent>
    );
};

export default Surveys;
