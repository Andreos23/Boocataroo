<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ad;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    //
    public function locations(Request $request) {
        $locations = DB::table('ads')->select('location')->distinct()->get();
        $locations_final = array();
        foreach($locations as $test_location)
            array_push($locations_final, $test_location->location);
        sort($locations_final);
        return response()->json($locations_final);
    } 

    public function ads(Request $request) {
        $ads = array();
        // location
        // jobTitles
        // jobType
        // specialities
        // email
        // phone

        if ($request->has('location')) {
            $ads = DB::table('ads')->where('location', $request->get('location'))->distinct()->get();
        } else {
            return response()->json(["message" => "Error location."], 404);
        }

        if ($request->has('jobTitles') && count($request->get('jobTitles')) != 0) {
            $new_ads = array();
            $jobTitles = $request->get('jobTitles');
            foreach($ads as $ad) {
                $ok = 0;
                foreach($jobTitles as $jobTitle) {
                    if (stripos($ad->description, $jobTitle) !== false || stripos($ad->title, $jobTitle) !== false) {
                        $ok = 1;
                        break;
                    }
                }
                if ($ok == 1)
                    array_push($new_ads, $ad);
            }
            $ads = $new_ads;
        }

        if ($request->has('jobType')) {
            $new_ads = array();
            $jobType = $request->get('jobType');
            foreach($ads as $ad) {
                if ($ad->job_type == $jobType || stripos($ad->description, $jobType) !== false || stripos($ad->title, $jobType))
                    array_push($new_ads, $ad);
            }
            $ads = $new_ads;
        }

        if ($request->has('specialities') && count($request->get('specialities')) != 0) {
            $new_ads = array();
            $specialities = $request->get('specialities');
            foreach($ads as $ad) {
                $ok = 0;
                foreach($specialities as $speciality) {
                    if (stripos($ad->description, $speciality) !== false || stripos($ad->title, $speciality) !== false) {
                        $ok = 1;
                        break;
                    }
                }
                if ($ok == 1)
                    array_push($new_ads, $ad);
            }
            $ads = $new_ads;
        }

        $email = false;
        if ($request->has('email') && $request->get('email') == true) {
            $email = true;
        }

        $phone = false;
        if ($request->has('phone') && $request->get('phone') == true) {
            $phone = true;
        }

        DB::table('statistics')->insert(
            ['email' => $email, 'phone' => $phone]
        );

        return response()->json($ads);
    }
}
