<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
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

    // the relation between the project and the task_progress model.
    public function task_progress(): HasOne
    {
        return $this->hasOne(TaskProgress::class); // each project => one task_progress.
    }

    // the relation between the project and the task model.
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class); // each project => many tasks.
    }

    // a static function to create a slug for the project name.
    static function generateSlug($projectName)
    {
        return Str::slug($projectName) . '-' . Str::lower(Str::random(4));
    }
}
