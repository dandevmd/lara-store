<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyDashboardResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        //current user
        $user = $request->user();

        //total number of surveys
        $totalSurveysCount = Survey::query()->where('user_id', $user->id)->count();

        //latest Survey
        $latestSurvey = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        //Total numbers of answ
        $totalAnsw = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('user_id', $user->id)
            ->count();

        // latest answ
        $latestAnsw = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('user_id', $user->id)
            ->latest()
            ->getModels();

        return [
            'totalSurveysCount' => $totalSurveysCount,
            'latestSurvey' => $latestSurvey ? new SurveyDashboardResource($latestSurvey) : null,
            'totalAnsw' => $totalAnsw,
            'latestAnsw' => SurveyAnswerResource::collection($latestAnsw)
        ];
    }


}