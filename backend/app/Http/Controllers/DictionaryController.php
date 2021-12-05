<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ad as Ad;

class DictionaryController extends Controller
{
    //
    public function index()
    {
        ini_set('max_execution_time', 600);
        $ads = Ad::all();
        $words = [];
        foreach($ads as $ad) {
            $description = strtolower(preg_replace("/[^a-zA-Z ]/", " ", $ad->description));
            $words = array_merge($words, preg_split('/\s+/', $description, -1, PREG_SPLIT_NO_EMPTY));
        }
        $dictionary = array_count_values($words);
        asort($dictionary);
        print_r($dictionary);
    }
}
