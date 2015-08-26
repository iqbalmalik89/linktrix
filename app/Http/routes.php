<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Front End Routes







// Admin Routes
$app->get('login', 'App\Http\Controllers\AdminController@showLogin');
$app->get('', 'App\Http\Controllers\AdminController@showLogin');
$app->get('dashboard', 'App\Http\Controllers\AdminController@showDashboard');
$app->get('logout', 'App\Http\Controllers\AdminController@logout');
$app->get('edit-profile', 'App\Http\Controllers\AdminController@showProfile');
$app->get('users', 'App\Http\Controllers\AdminController@showUsers');
$app->get('candidates', 'App\Http\Controllers\AdminController@showCandidates');
$app->get('add-candidate', 'App\Http\Controllers\AdminController@addCandidate');
$app->get('verify-password', 'App\Http\Controllers\AdminController@showVerifyPassword');
$app->get('import', 'App\Http\Controllers\AdminController@showImport');
$app->get('backup', 'App\Http\Controllers\AdminController@showBackup');
$app->get('access-denied', 'App\Http\Controllers\AdminController@showAccessDenied');


// $app->get('/set', function() {
// 	app('session')->set('key', 'Iqbal');
// 	$sessionData = Session::all();
// 	print_r($sessionData);
// });

// $app->get('/get', function() {
// 	$sessionData = Session::all();
// 	print_r($sessionData);
// });


//Api Routes
$app->group(['prefix' => '/api/'], function($app)
{
	// Profiles
	$app->post('login', 'App\Http\Controllers\UserController@loginUser');
	$app->post('pic_upload', 'App\Http\Controllers\UserController@pictureUpload');
	$app->post('profile', 'App\Http\Controllers\UserController@updateProfile');	
	$app->post('password', 'App\Http\Controllers\UserController@updatePassword');		
	$app->post('forgot', 'App\Http\Controllers\UserController@forgotPassword');
	$app->post('reset_password', 'App\Http\Controllers\UserController@resetPassword');



	$app->get('users', 'App\Http\Controllers\UserController@getUsers');
	$app->get('user', 'App\Http\Controllers\UserController@getUser');	
	$app->post('user', 'App\Http\Controllers\UserController@addUpdateUser');	
	$app->delete('user', 'App\Http\Controllers\UserController@deleteUser');
	$app->get('get_consultants', 'App\Http\Controllers\UserController@getSupervisorConsultants');
	$app->post('supervisor_consultants', 'App\Http\Controllers\UserController@addSupervisorConsultants');
	$app->get('tags', 'App\Http\Controllers\TagController@getTags');
	$app->post('user_status', 'App\Http\Controllers\UserController@changeStatus');
	$app->get('allusers', 'App\Http\Controllers\UserController@allUsers');


	//Candidate
	$app->post('candidate', 'App\Http\Controllers\CandidateController@addupdateCandidate');
	$app->delete('candidate', 'App\Http\Controllers\CandidateController@deleteCandidate');
	$app->get('candidates', 'App\Http\Controllers\CandidateController@getCandidates');
	$app->get('candidate', 'App\Http\Controllers\CandidateController@getCandidate');
	$app->get('candidate_owner', 'App\Http\Controllers\CandidateController@getCandidateOwner');
	$app->post('candidate_owner', 'App\Http\Controllers\CandidateController@addCandidateOwner');
	$app->get('export_candidates', 'App\Http\Controllers\CandidateController@exportCandidates');
	$app->get('export_download', 'App\Http\Controllers\CandidateController@exportDownload');
	$app->post('unlock_candidate', 'App\Http\Controllers\CandidateController@unlockCandidate');
	$app->get('job_title', 'App\Http\Controllers\CandidateController@getJobTitle');
	$app->get('check_duplicate_check', 'App\Http\Controllers\CandidateController@checkDuplicateCheck');
	$app->post('change_creator', 'App\Http\Controllers\CandidateController@changeCreator');
	$app->post('undelete_candidate', 'App\Http\Controllers\CandidateController@undeleteCandidate');
	$app->post('undelete_request', 'App\Http\Controllers\CandidateController@undeleteRequest');
	$app->post('sharing_save', 'App\Http\Controllers\CandidateController@saveShare');
	$app->post('sec_info_sharing', 'App\Http\Controllers\CandidateController@secInfoShare');
	$app->post('primary_sharing', 'App\Http\Controllers\CandidateController@savePrimarySharing');


	$app->post('cv_upload', 'App\Http\Controllers\CandidateController@cvUpload');
	$app->get('cv_download', 'App\Http\Controllers\CandidateController@cvDownload');

	$app->post('csv_upload', 'App\Http\Controllers\CandidateController@csvUpload');
	$app->get('import_csv', 'App\Http\Controllers\CandidateController@importCsv');

	//bAckup
	$app->post('backups', 'App\Http\Controllers\BackupController@getBackups');
	$app->post('backup', 'App\Http\Controllers\BackupController@createSQLDump');
	$app->post('backup_status', 'App\Http\Controllers\BackupController@changeStatus');
	$app->get('downloadbackup', 'App\Http\Controllers\BackupController@backupDownload');


});





