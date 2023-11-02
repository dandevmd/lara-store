import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import PaginationTable from "../components/PaginationTable";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../request/axiosclient.jsx";
import Spinner from "../components/Spinner";
import { stateStorage } from "../state/ContextProvider";

const Surveys = () => {
    const [surveys, setSurveys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});
    const { showToast } = stateStorage();

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

    const deleteSurvey = (e, id) => {
        e.preventDefault();
        if (!id) return;

        axiosClient
            .delete(`/survey/${id}`)
            .then(() => {
                getSurveys();
                showToast("Survey deleted successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return loading ? (
        <Spinner />
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
            {surveys?.length === 0 && (
                <div className="text-center text-gray-700">
                    You have not created any survey
                </div>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys &&
                    surveys?.map((survey) => (
                        <SurveyListItem
                            survey={survey}
                            key={survey.id}
                            onDeleteClick={deleteSurvey}
                        />
                    ))}
            </div>
            <PaginationTable meta={meta} onPageClick={onPageClick} />
        </PageComponent>
    );
};

export default Surveys;
