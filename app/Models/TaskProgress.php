<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'pinned_on_dashboard',
        'progress',
    ];

    const NOT_PINNED_ON_DASHBOARD = 0;
    const PINNED_ON_DASHBOARD = 1;
    const INITIAL_PROJECT_PROGRESS_PERCENT = 0;
}
