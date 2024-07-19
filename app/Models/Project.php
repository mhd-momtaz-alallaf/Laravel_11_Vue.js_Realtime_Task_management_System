<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Number;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'status',
        'startDate',
        'endDate',
    ];

    const NOT_STARTED = 0;
    const PENDING = 1;
    const COMPLETED = 2;

    // a static function to create a slug for the project name.
    static function generateSlug($projectName){
        return Str::slug($projectName) . '-' . Str::lower(Str::random(4));
    }
}
