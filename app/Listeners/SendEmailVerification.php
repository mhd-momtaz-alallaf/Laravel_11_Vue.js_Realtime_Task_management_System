<?php

namespace App\Listeners;

use App\Events\NewUserCreated;
use App\Mail\SendVerificationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendEmailVerification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */

    // Listening for NewUserCreated event, the listener will get the user instance from the event, then will send the email to the created user.
    public function handle(NewUserCreated $event): void
    {
        Mail::to($event->user->email)->send(new SendVerificationMail($event->user));
    }
}
