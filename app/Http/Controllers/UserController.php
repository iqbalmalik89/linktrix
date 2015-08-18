<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Repo\UserRepo as UserRepo;

class UserController extends BaseController
{
	public $repo;
    function __construct(UserRepo $userRepo) {
       $this->repo = $userRepo;
    }

    public function pictureUpload()
    {
    	if (\Request::hasFile('profile_pic') && \Request::file('profile_pic')->isValid())
    	{
	    	$pic = \Request::file('profile_pic');
	    	$resp = $this->repo->pictureUpload($pic);
    	}

		if($resp)
		{
			$data = array('status' => 'success', 'file_name' => $resp['file_name'], 'url' => $resp['url']);
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		
    }

    public function allUsers()
    {
    	$candidateId = \Request::input('candidate_id');
    	if(!empty($candidateId))
	    	$candidateId = base64_decode($candidateId);

    	$resp = $this->repo->allUsers($candidateId);

		if($resp['users'])
		{
			$data = array('status' => 'success', 'users' => $resp['users'], 'creater_id' => $resp['creater_id']);
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		
    }

    public function changeStatus()
    {
    	$userId = \Request::input('user_id');
    	$status = \Request::input('status');    	
    	$resp = $this->repo->changeStatus($userId, $status);

		if($resp)
		{
			$data = array('status' => 'success');
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		
    }

    public function getSupervisorConsultants()
    {
		$userId = \Request::input('user_id');
		$edit = \Request::input('edit');
		$resp = $this->repo->getSupervisorConsultants($userId, $edit);
		if($resp)
		{
			return response()->json(array('status' => 'success', 'data' => $resp));
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'Consultants not found'));
		}
    }

    public function addSupervisorConsultants()
    {
		$userId = \Request::input('user_id');
		$consultants = \Request::input('consultants');

		if(!empty($userId) && !empty($consultants))
		{
			$resp = $this->repo->addSupervisorConsultants($userId, $consultants);
			if($resp)
			{
				return response()->json(array('status' => 'success', 'message' => 'Consultants added successfully.'));
			}
			else
			{
				return response()->json(array('status' => 'error', 'message' => 'Please select at least one consultant'));
			}			
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'Please select at least one consultant'));
		}
    }

    public function deleteUser()
    {
		$userId = \Request::input('user_id');
		$resp = $this->repo->deleteUser($userId);
		if($resp)
		{
			return response()->json(array('status' => 'success', 'message' => 'User deleted successfully'));
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'Some error occured'));
		}
    }

	public function loginUser()
	{
		$email = \Request::input('email');
		$password = \Request::input('password');
		$resp = $this->repo->loginUser($email, $password);

		if($resp === 'disable')
		{
			return response()->json(array('status' => 'error', 'message' => 'Your access is disabled. Contact Administrator'));
		}
		else if($resp)
		{
			return response()->json(array('status' => 'success', 'message' => 'You have logged in successfully'));
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'Authentication failed'));
		}
	}

	public function getUser()
	{
		$userId = \Request::input('user_id');
		$resp = $this->repo->get($userId);
		if($resp)
		{
			unset($resp['password']);
			return response()->json(array('status' => 'success', 'data' => $resp));
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'Authentication failed'));
		}
	}	

	public function resetPassword()
	{
		$password = \Request::input('password');
		$userCode = \Request::input('user_code');
		$resp = $this->repo->resetPassword($password, $userCode);
		if($resp)
		{
			return response()->json(array('status' => 'success'));
		}
		else
		{
			return response()->json(array('status' => 'error'));
		}		
	}

	public function forgotPassword()
	{
		$email = \Request::input('email');
		$resp = $this->repo->forgotPassword($email);
		if($resp)
		{
			return response()->json(array('status' => 'success'));
		}
		else
		{
			return response()->json(array('status' => 'error'));
		}
	}

	public function addUpdateUser()
	{
		$params = array('name' => \Request::input('name'), 
						'email' => \Request::input('email'),
						'role_id' => \Request::input('role_id'),						
						'user_id' => \Request::input('user_id'),							
						'contact_number' => \Request::input('contact_number'),						
						'pic' => \Request::input('pic_path'),
						);
		$rules = array('name' => 'required',
					   'email' => 'required',
					   'role_id' => 'required',					   
					   'contact_number' => 'required',
					  );

		$validator = \Validator::make($params,$rules);
		if (!$validator->fails())
		{
			if(empty($params['user_id']))
				$resp = $this->repo->addUser($params);
			else
				$resp = $this->repo->updateUser($params);

			if($resp)
			{
				return response()->json(array('status' => 'success', 'message' => 'User has been added successfully'));
			}
			else
			{
				return response()->json(array('status' => 'error', 'message' => 'Email already associated with other user!'));
			}
		}
		else
		{
			$msgs = \Utility::validatorFailedRep($validator->messages());
			return response()->json(array('status' => 'error', 'message' => $msgs));
		}		
	}

	public function getUsers()
	{
		$limit = \Request::input('limit');
		$roleId = \Request::input('role_id');		
		$resp = $this->repo->getUsers($limit, $roleId);
		if($resp)
		{
			return response()->json($resp);
		}
		else
		{
			return response()->json(array('data' => array()));
		}
	}

	public function updateProfile()
	{
		$params = array('name' => \Request::input('name'), 
						'email' => \Request::input('email'),
						'contact_number' => \Request::input('contact_number'),						
						'pic' => \Request::input('pic_path'),
						);
		$rules = array('name' => 'required',
					   'email' => 'required',
					   'contact_number' => 'required',
					  );

		$validator = \Validator::make($params,$rules);
		if (!$validator->fails())
		{
			$resp = $this->repo->updateProfile($params);
			if($resp)
			{
				return response()->json(array('status' => 'success', 'message' => 'Profile information updated', 'url' => $resp['url']));
			}
			else
			{
				return response()->json(array('status' => 'error', 'message' => 'Email already associated with other user!'));
			}
		}
		else
		{
			$msgs = \Utility::validatorFailedRep($validator->messages());
			return response()->json(array('status' => 'error', 'message' => $msgs));
		}
	}

	public function updatePassword()
	{
		$params = array('current_password' => \Request::input('current_password'), 
						'new_password' => \Request::input('new_password'),
						'new_cpassword' => \Request::input('new_cpassword'),						
						);
		$rules = array('current_password' => 'required',
					   'new_password' => 'required',
					   'new_cpassword' => 'required',
					  );

		$validator = \Validator::make($params,$rules);
		if (!$validator->fails())
		{
			$resp = $this->repo->updatePassword($params);
			if($resp)
			{
				return response()->json(array('status' => 'success', 'message' => 'Password updated'));
			}
			else
			{
				return response()->json(array('status' => 'error', 'message' => 'Current password is invalid'));
			}
		}
		else
		{
			$msgs = \Utility::validatorFailedRep($validator->messages());
			return response()->json(array('status' => 'error', 'message' => $msgs));
		}
	}	
}
