<?php
namespace App\Services;
use Goutte\Client;
use Symfony\Component\HttpClient\HttpClient;
require 'vendor/autoload.php';

class ScraperService
{
    /**
     * Make a call to to specified url and return formatted data
     * 
     * @param string $url
     * 
     * @return array
     */
    public function scrapAllAdsOlx($url)
    {
        $client  = new Client(HttpClient::create(['timeout' => 60]));
        $crawler = $client->request('GET', $url);
        
        if ($crawler->getUri() != $url) {
            return -1;
        }

        $ads = $crawler->filter('.offer a.link')->each(function($node) {
            return $node->attr('href');
        });

        return $ads;
       //Get the job title
//         $titles = $crawler->filter('.listResults h2')->each(function ($node) {
//             return $node->text();
//         });
        
//         //Get the link to view a specific job details
//         $links = $crawler->filter('.listResults a.s-link')->each(function($node){
//             $href  = 'https://stackoverflow.com' . $node->attr('href');
//             $title = $node->attr('title');
//             $text  = $node->text();
//             return compact('href', 'title', 'text');
//         });
//        //Get all the technical tags for each job posting
//         $tags = $crawler->filter('.ps-relative.d-inline-block')->each(function($node){
//             return $node->filter('a.post-tag')->each(function($nested_node){
//                 $href  = 'https://stackoverflow.com' . $nested_node->attr('href');
//                 $title = $nested_node->attr('title');
//                 $text  = $nested_node->text();
//                 return compact('href', 'title', 'text');
//             });
//         });
//       //Job location
//        $location = $crawler->filter('.listResults h3')->each(function ($node) {
//             return $node->text();
//         });
// //Date posted
//        $time = $crawler->filter('div.fs-caption div.grid--cell:first-child')->each(function ($node) {
//             return $node->text();
//         });
    //   return compact('titles', 'location', 'time', 'links', 'tags');
    }

    public function scrapAdOlx($url)
    {
        $client  = new Client(HttpClient::create(['timeout' => 60]));
        $crawler = $client->request('GET', $url);

        if ($crawler->getUri() != $url) {
            return -1;
        }

        $title = $crawler->filter('h1.css-r9zjja-Text')->each(function($node) {
            return $node->text();
        });
        $title = $title[0];

        $description = $crawler->filter('div.css-1shxysy div.css-2t3g1w-Text')->each(function($node) {
            return $node->text();
        });
        $description = $description[0];

        $adParameters = $crawler->filter('li.css-1x63q9x p.css-xl6fe0-Text')->each(function($node) {
            return $node->text();
        });

        $salary = NULL;
        $jobType = NULL;
        $location = NULL;
        if (count($adParameters) != 3) {
            return -1;
        }

        $salary = $adParameters[0];
        $jobType = $adParameters[1];
        $location =$adParameters[2];

        return compact('title', 'description', 'salary', 'jobType', 'location', 'url');
    }

    public function scrapAllAdsJooble($url)
    {
        $client  = new Client(HttpClient::create(['timeout' => 60]));
        $crawler = $client->request('GET', $url);

        // print_r($crawler);

        if ($crawler->getUri() != $url) {
            return -1;
        }

        $ads = $crawler->filter('article a')->each(function($node) {
            return $node->attr('datahref');
        });

        return $ads;
    }

    public function scrapAdJooble($url)
    {
        $client  = new Client(HttpClient::create(['timeout' => 60]));
        $crawler = $client->request('GET', $url);

        $title = $crawler->filter('div')->each(function($node) {
            return $node->text();
        });
        $title = $title[0];

        $description_words = $crawler->filter('div._7a133 p')->each(function($node) {
            return $node->text();
        });
        $description = "";
        foreach($description_words as $word)
            $description = $description.$word;

        $salary = $crawler->filter('span.d48ec')->each(function($node) {
            return $node->text();
        });
        $salary = $salary[0];

        $jobType = $crawler->filter('div._131cd div.caption')->each(function($node) {
            return $node->text();
        });
        $jobType = $jobType[0];
        if ($jobType == "Ocupare deplină")
            $jobType = "Full time";
        else
            $jobType = "Part time";

        $location = $crawler->filter('div.ed933')->each(function($node) {
            return $node->text();
        });
        $location = $location[0];

        return compact('title', 'description', 'salary', 'jobType', 'location', 'url');
    }
}