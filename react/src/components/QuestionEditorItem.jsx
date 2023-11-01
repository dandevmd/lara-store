import React, { useEffect, useState } from "react";
import { stateStorage } from "../state/ContextProvider";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const QuestionEditorItem = ({
    index = 0,
    question,
    // key,
    questionChange,
    deleteQuestion,
    addQuestion,
}) => {
    const [model, setModel] = useState({ ...question });
    const { questionTypes } = stateStorage();

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function firstToUpperCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div>
            <div className="flex justify-between mb-3 ">
                <h4>
                    {index + 1} {model.question}
                </h4>
                <div className="flex items-center">
                    <button
                        className="flex items-center py-1 px-4 text-white rounded-sm bg-gray-600 hover:bg-slate-700 mr-2"
                        onClick={() => deleteQuestion(question)}
                    >
                        <TrashIcon className="w-4 " />{" "}
                    </button>{" "}
                    <button
                        className="flex items-center py-1 px-4 text-white rounded-sm bg-gray-600 hover:bg-slate-700"
                        onClick={(e) => addQuestion(e, index + 1)}
                    >
                        <PlusIcon className="w-4 " />
                    </button>
                </div>
            </div>
            <div className="flex gap justify-between mb-3">
                <div className="flex-1">
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Question
                    </label>
                    <input
                        value={model.question}
                        onChange={(ev) =>
                            setModel({
                                ...model,
                                question: ev.target.value,
                            })
                        }
                        type="text"
                        name="question"
                        id="question"
                        className=" mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label
                        htmlFor="questionType"
                        className="block text-sm font-medium text-gray-700 w-40"
                    >
                        Question Type
                    </label>
                    <select
                        name="questionType"
                        id="questionType"
                        onChange={(ev) =>
                            setModel({
                                ...model,
                                type: ev.target.value,
                            })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        {questionTypes.map((qt, i) => (
                            <option key={i} value={qt}>
                                {firstToUpperCase(qt)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label
                    htmlFor="questionDescription"
                    className="block 
                    text-sm font-medium text-gray-700 "
                >
                    Description
                </label>
                <textarea
                    name="questionDescription"
                    id="questionDescription"
                    onChange={(ev) =>
                        setModel({
                            ...model,
                            description: ev.target.value,
                        })
                    }
                    value={model.description}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
            </div>
        </div>
    );
};

export default QuestionEditorItem;
