<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Repo\CandidateRepo as CandidateRepo;
use App\Repo\UserRepo as UserRepo;
use App\Repo\RoleRepo as RoleRepo;

class AdminController extends BaseController
{
	public $userData;
	public $candidateRepo;
    function __construct() {
       $this->userData = \Session::get('user');
       $this->candidateRepo = new CandidateRepo;
    }

	public function showLogin()
	{
		if(\Session::has('user'))
		{
			return redirect('dashboard');
		}
		else
		{
			if(isset($_COOKIE['linktrix']))
		    {
			    parse_str($_COOKIE['linktrix']);

			    // Make a verification
		 		$userRepo = new UserRepo(new RoleRepo);
		 		$resp = $userRepo->loginUser($usr, $hash, false);
		 		if($resp === true)
		 		{
					return redirect('dashboard');
		 		}
		    }			
		}

		return view('admin.login', ['page_title' => 'Login']);
	}

	public function showDashboard()
	{
		return view('admin.dashboard', ['page_title' => 'Dashboard', 'user' => $this->userData]);
	}	

	public function showCandidates()
	{
		$role = $this->candidateRepo->getUserRole();
		return view('admin.candidates', ['page_title' => 'Candidates','role' => $role ,'user' => $this->userData]);
	}	

	public function addCandidate()
	{
		if(!empty($_GET['candidate_id']))
		{
			$role = $this->candidateRepo->getUserRole();
			$isOwner = $this->candidateRepo->isOwner(base64_decode($_GET['candidate_id']), $role);			
			if($isOwner === false)
			{
				header("Location:access-denied");
				die();				
			}
		}


		return view('admin.candidate_form', ['page_title' => 'Add Candidate', 'user' => $this->userData]);
	}

	public function showProfile()
	{
		return view('admin.edit-profile', ['page_title' => 'Edit Profile', 'user' => $this->userData]);
	}	

	public function showImport()
	{
		return view('admin.import', ['page_title' => 'Import', 'user' => $this->userData]);
	}	

	public function showUsers()
	{
		$role = $this->candidateRepo->getUserRole();		
		return view('admin.users', ['page_title' => 'Users','role' => $role , 'user' => $this->userData]);
	}

	public function showVerifyPassword()
	{
		return view('admin.reset_password', ['page_title' => 'ResetPassword', 'user' => $this->userData]);
	}

	public function showBackup()
	{
		if($this->userData['role_id'] !== 1){
			header("Location:access-denied");
			die();
		}

		return view('admin.backup', ['page_title' => 'Backup', 'user' => $this->userData]);
	}

	public function showAccessDenied()
	{
		return view('admin.access_denied', ['page_title' => 'Access Denied', 'user' => $this->userData]);
	}

	public function logout()
	{
		\Session::flush();
		if(isset($_COOKIE['linktrix']))
		{
			setcookie('linktrix', null, -1, '/');
		}


	 ?> <script>window.location = 'login'</script>
	 <?php
	}
}
