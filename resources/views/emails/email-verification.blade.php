<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Management System</title>
</head>
<body>
    <div class="container" >
        <div class="card card-body" style="margin-left: 40px;margin-left: 50px;">
            <div align="center">
                <a href="{{url('/')}}">
                    <img width="100" src="{{url('/others/logo.png')}}">
                </a>
            </div>
            <h3>E-mail verification.</h3>
            <p>Hello, <br/><br/>
                we have sent to you this email to check if this Email : <a href="#">{{$user->email}}</a> you provide is a valid one; click on the link to verifiy it.

                <a style="font-weight:bold;color:blue" target="_blank" href="{{env('APP_URL')}}/check_email/{{$user->remember_token}}">
                    Check my email
                </a>
            </p>
            <br/>
            <p>Yours sincerely.</p>
        </div>
    </div>
</body>
</html>
