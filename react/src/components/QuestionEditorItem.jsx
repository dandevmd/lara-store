import React, { useEffect, useState } from "react";
import { stateStorage } from "../state/ContextProvider";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const QuestionEditorItem = ({
    index = 0,
    question,
    key,
    questionChange,
    deleteQuestion,
    addQuestion,
}) => {
    const [model, setModel] = useState({ ...question });
    const { questionType } = stateStorage();

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
                        className="flex items-center py-1 px-4 text-white rounded-sm bg-gray-600 hover:bg-slate-700"
                        onClick={() => deleteQuestion(model)}
                    >
                        <MinusIcon className="w-4 mr-2" />{" "}
                    </button>

                    <button
                        className="flex items-center py-1 px-4 text-white rounded-sm bg-gray-600 hover:bg-slate-700"
                        onClick={() => addQuestion(model)}
                    >
                        <PlusIcon className="w-4 mr-2" />
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
            </div>
        </div>
    );
};

export default QuestionEditorItem;
