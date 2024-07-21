<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        // getting the search parameter that passed with the route.
        $query = $request->get('search');

        // $members = Member::select('name','email'); // the same of bellow.
        $members = DB::table('members');

        // getting only the members having the same name of the search parameter (if the query exist).
        if ($query) {
            $members->where('name', 'like', "%{$query}%");
        }

        $members->orderBy('id', 'desc');

        return response()->json(['data' => $members->paginate(10)], 200);
    }
}
