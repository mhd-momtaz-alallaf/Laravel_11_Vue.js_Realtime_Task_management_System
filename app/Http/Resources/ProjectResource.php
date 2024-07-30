<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (int) $this->id,
            'name' => (string) $this->name,
            'status' => (int) $this->status,
            'startDate' => (string) $this->startDate,
            'endDate' => (string) $this->endDate,
            'slug' => (string) $this->slug,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'tasks' => $this->tasks->map(function ($task) {
                return [
                    'id' => (int) $task->id,
                    'project_id' => (int) $task->project_id,
                    'name' => (string) $task->name,
                    'status' => (int) $task->status,
                    'created_at' => (string) $task->created_at,
                    'updated_at' => (string) $task->updated_at,
                    'task_members' => $task->task_members->map(function ($task_member) {
                        return [
                            'id' => (int) $task_member->id,
                            'project_id' => (int) $task_member->project_id,
                            'task_id' => (int) $task_member->task_id,
                            'member_id' => (int) $task_member->member_id,
                            'created_at' => (string) $task_member->created_at,
                            'updated_at' => (string) $task_member->updated_at,
                            'members' => $task_member->member ? [
                                'id' => (int) $task_member->member->id,
                                'name' => (string) $task_member->member->name,
                                'email' => (string) $task_member->member->email,
                                'created_at' => (string) $task_member->member->created_at,
                                'updated_at' => (string) $task_member->member->updated_at,
                            ] : null,
                        ];
                    }),
                ];
            }),
            'task_progress' => [
                'id' => (int) optional($this->task_progress)->id,
                'project_id' => (int) optional($this->task_progress)->project_id,
                'progress' => (string) optional($this->task_progress)->progress,
                'pinned_on_dashboard' => (int) optional($this->task_progress)->pinned_on_dashboard,
                'created_at' => (string) optional($this->task_progress)->created_at,
                'updated_at' => (string) optional($this->task_progress)->updated_at,
            ],
        ];
    }
}
