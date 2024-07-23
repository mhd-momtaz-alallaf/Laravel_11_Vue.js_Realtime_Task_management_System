<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TaskMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'task_id',
        'member_id',
    ];

    // the relation between the TaskMember and Member Model.
    public function member():HasOne
    {
        return $this->hasOne(Member::class, 'id'); // each TaskMember => One Member
    }
}
