<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'name',
        'status',
    ];

    const NOT_STARTED = 0;
    const PENDING = 1;
    const COMPLETED = 2;

    // creating the relation with the TaskMember Model
    public function members()
    {
        return $this->hasMany(TaskMember::class); // each Task => many TaskMember
    }
}
