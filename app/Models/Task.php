<?php

namespace App\Models;

use App\Events\TrackingProjectProgress;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
    public function task_members():HasMany
    {
        return $this->hasMany(TaskMember::class); // each Task => Many TaskMember
    }

    // a static function to change the task status
    public static function changeTaskStatus($taskId, $status)
    {
        Task::where('id', $taskId)
            ->update(['status' => $status]);
    }

    public static function countCompletedTasks($projectId)
    {
        $count = Task::where('project_id', $projectId)
            ->where('status', Task::COMPLETED)
            ->count();

        return $count;
    }

    public static function countCompletedAndPendingTasks($projectId)
    {
        $taskCounts = Task::where('project_id', $projectId)
            ->selectRaw('SUM(status = ?) as pending, SUM(status = ?) as completed', [Task::PENDING, Task::COMPLETED])
            ->first();

        $pending = (int) $taskCounts->pending ?? 0;
        $completed = (int) $taskCounts->completed ?? 0;

        return [$pending, $completed];
    }

    public static  function countProjectTasks($projectId)
    {
        $count = Task::where('project_id', $projectId)->count();

        return $count;
    }

    public static function aroundNumber($number)
    {
        if (strpos($number, '.')) {
            $position = strpos($number, '.') + 1;
            return substr($number, 0, $position + 1);
        } else {
            return $number;
        }
    }

    public static function handleProjectProgress($projectId)
    {
        $totalTasks = Task::countProjectTasks($projectId);
        $totalCompletedTasks = Task::countCompletedTasks($projectId);

        $progress = Task::aroundNumber(($totalCompletedTasks * 100) / $totalTasks);
        $taskProgress = TaskProgress::where('project_id', $projectId)->first();

        if (!is_null($taskProgress)) {
            $taskProgress->where('project_id', $projectId)
                ->update(['progress' => $progress]);

            TrackingProjectProgress::dispatch($progress);

            return $progress;
        }
    }
}
