<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'task_id',
        'member_id',
    ];
}
