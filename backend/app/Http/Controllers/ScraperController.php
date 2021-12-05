<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ScraperService;
use App\Ad;

class ScraperController extends Controller
{
    public function olx(ScraperService $scraperService)
    {
        ini_set('max_execution_time', 600); //300 seconds = 5 minutes
        $url = 'https://www.olx.ro/locuri-de-munca/personal-hotelier-restaurant/bucatar-ajutor-bucatar/';
        $cnt = 1;
        $curr_data = 0;
        $data = [];
        while($curr_data != -1) {
            if ($cnt != 1)
                $finalUrl = $url.'?page='.$cnt;
            else
                $finalUrl = $url;
            // echo $finalUrl;
            $curr_data = $scraperService->scrapAllAdsOlx($finalUrl);
            if ($curr_data == -1) {
                break;
            } else {
                $data = array_merge($data, $curr_data);
            }
            $cnt++;
            return;
        }
        // print_r($data);
        foreach($data as $ad) {
            // echo($ad);
            $adParameters = $scraperService->scrapAdOlx($ad);

            if ($adParameters != -1) {
                $salary = $adParameters['salary'];
                $salary = str_replace(' ', '', $salary);
                $salary = preg_replace("/[^0-9-]/", "", $salary);
                $salaries = explode('-', $salary);
                if (count($salaries) == 2) {
                    $min_salary = $salaries[0];
                    $max_salary = $salaries[1];
                } else {
                    $min_salary = $salaries[0];
                    $max_salary = $salaries[0];
                }
                $ad = new Ad;
                $ad->title = $adParameters['title'];
                $ad->description = $adParameters['description'];
                $ad->min_salary = $min_salary;
                $ad->max_salary = $max_salary;
                $ad->job_type = $adParameters['jobType'];
                $ad->location = $adParameters['location'];
                $ad->url = $adParameters['url'];
                $ad->save();
                // print_r($ad->url);
            }
        }
        
        // return response()->json([''], 200);
    }

    public function jooble(ScraperService $scraperService) {
        ini_set('max_execution_time', 600); //300 seconds = 5 minutes
        $url = "https://ro.jooble.org/SearchResult?p=22&ukw=bucatar";
        $data = [];
        $finalUrl = $url;
        $curr_data = $scraperService->scrapAllAdsJooble($finalUrl);
        $data = array_merge($data, $curr_data);
        foreach($data as $ad) {
            // echo($ad);
            $adParameters = $scraperService->scrapAdJooble($ad);
            // print_r($adParameters);

            if ($adParameters != -1) {
                $salary = $adParameters['salary'];
                $salary = str_replace(' ', '', $salary);
                $salary = preg_replace("/[^0-9-]/", "", $salary);
                $salaries = explode('-', $salary);
                if (count($salaries) == 2) {
                    $min_salary = $salaries[0];
                    $max_salary = $salaries[1];
                } else {
                    $min_salary = $salaries[0];
                    $max_salary = $salaries[0];
                }
                $ad = new Ad;
                $ad->title = $adParameters['title'];
                $ad->description = $adParameters['description'];
                $ad->min_salary = $min_salary;
                $ad->max_salary = $max_salary;
                $ad->job_type = $adParameters['jobType'];
                $ad->location = $adParameters['location'];
                $ad->url = $adParameters['url'];
                $ad->save();
            }
        }
    }
}
