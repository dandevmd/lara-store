import React from "react";
import PageComponent from "../components/PageComponent";
import { useState, useEffect } from "react";
import axiosClient from "../request/axiosclient";
import TButton from "../components/core/TButton";
import {
    EyeIcon,
    PencilIcon,
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../components/Spinner";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        axiosClient
            .get("/dashboard")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                err && err.response && setError(err.response.data.message);
            });
        setLoading(false);
    }, []);

    return (
        <PageComponent title="Dashboard" buttons={""}>
            {loading ? (
                <Spinner />
            ) : (
                <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 text-gray-700 gap-5">
                    <DashboardCard
                        title="Total Surveys"
                        className="order-1 lg:order-2"
                        style={{ animationDelay: "0.1s" }}
                    >
                        {" "}
                        <div className="text-8xl pb-4 font-semibold flex flex-1 justify-center items center">
                            {data.totalSurveysCount}
                        </div>
                    </DashboardCard>
                    <DashboardCard
                        title="Total Answers"
                        className="order-1 lg:order-2"
                        style={{ animationDelay: "0.2s" }}
                    >
                        {" "}
                        <div className="text-8xl pb-4 font-semibold flex flex-1 justify-center items center">
                            {data.totalAnsw}
                        </div>
                    </DashboardCard>
                    <DashboardCard
                        title="Latest Surveys"
                        className="order-1 lg:order-2"
                        style={{ animationDelay: "0.3s" }}
                    >
                        {" "}
                        {!data.latestSurvey ? (
                            "No surveys found"
                        ) : (
                            <>
                                <img
                                    src={data.latestSurvey.image_url}
                                    alt="Survey image"
                                    className="w-[240px] mx-auto"
                                />
                                <h3 className="font-bold text-xl mb-2">
                                    {data.latestSurvey.title}
                                </h3>
                                <div className="flex justify-between">
                                    <p>Create Date:</p>
                                    <p>{data.latestSurvey.created_at}</p>
                                </div>{" "}
                                <div className="flex justify-between">
                                    <p>Expire Date:</p>
                                    <p>{data.latestSurvey.expire_date}</p>
                                </div>{" "}
                                <div className="flex justify-between">
                                    <p>Status:</p>
                                    <p>
                                        {data.latestSurvey.status
                                            ? "Active"
                                            : "Draft"}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Questions:</p>
                                    <p>{data.latestSurvey.questions}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Answers:</p>
                                    <p>{data.latestSurvey.answers}</p>
                                </div>{" "}
                                <div className="flex justify-between">
                                    <TButton
                                        to={`/surveys/${data.latestSurvey.id}`}
                                    >
                                        <PencilIcon className="w-5 h-5 mr-2 " />
                                        Edit
                                    </TButton>{" "}
                                    <TButton link>
                                        <EyeIcon className="w-5 h-5 mr-2 " />
                                        View Answers
                                    </TButton>
                                </div>
                            </>
                        )}
                    </DashboardCard>
                    <DashboardCard>
                        <h3 className="font-semibold text-lg">
                            Latest Answers
                        </h3>
                        {data &&
                            data.latestAnsw &&
                            data.latestAnsw.map((a) => (
                                <a
                                    href="#"
                                    key={a.id}
                                    className="block p-2 hover:bg-gray-100/90"
                                >
                                    <p className="font-semibold">{a.title}</p>
                                    <small>
                                        Answer Made at:<i>{a.end_date}</i>
                                    </small>
                                </a>
                            ))}
                    </DashboardCard>
                </div>
            )}
        </PageComponent>
    );
};

export default Dashboard;
