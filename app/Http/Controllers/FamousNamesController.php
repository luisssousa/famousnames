<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\File;

class FamousNamesController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function index()
    {
        return view('famous', 
                    [
                        'gmap' => env('GOOGLE_MAPS_API_KEY'), 
                        'names' => $this->getNames(env('FAMOUS_NAMES_FILE'))
                    ]);
    }

    private function getNames(string $file): array
    {
        return File::json(base_path($file))['famousNames'];
    }
}
