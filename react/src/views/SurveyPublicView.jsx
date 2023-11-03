import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../request/axiosclient";
import Spinner from "../components/Spinner";
import PublicQuestionItem from "../components/PublicQuestionItem";

const SurveyPublicView = () => {
    const [survey, setSurvey] = useState({});
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`survey/get-by-slug/${slug}`)
            .then(({ data }) => {
                data && setSurvey(data.data);
            })
            .catch((err) => {
                err && err.response && setError(err.response.data.message);
            });
        setLoading(false);
    }, []);

    console.log(survey.questions);

    return loading ? (
        <Spinner />
    ) : (
        <form action="" className="container mx-auto">
            <div className="flex flex-col">
                <div className="flex flex-row mt-5">
                    <div className="col-span-6 mr-4 p-0">
                        <img src={survey.image_url} alt="" className="w-full" />
                    </div>

                    <div className="col-span-5">
                        <h1 className="text-3xl mb-3">{survey.title}</h1>
                        <p className="text-gray-500 text-sm mb-3">
                            Expire Date: {survey.expire_date}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">
                            {survey.description}
                        </p>
                    </div>
                </div>

                <div>
                    {survey &&
                        survey.questions &&
                        survey.questions.map((question, index) => (
                            <PublicQuestionItem
                                key={question.id}
                                question={question}
                                index={index}
                                surveyId={survey.id}
                            />
                        ))}
                </div>
            </div>
        </form>
    );
};

export default SurveyPublicView;
