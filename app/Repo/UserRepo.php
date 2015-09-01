<?php namespace App\Repo;
use App\Models\User as User;
use App\Models\Candidate as Candidate;
use App\Models\SupervisorConsultant as SupervisorConsultant;
class UserRepo
{
	public $roleRepo;
	public $login;
    function __construct(RoleRepo $roleRepo) {
       $this->roleRepo = $roleRepo;
       $this->login = false;
    }

	public function loginUser($email, $password)
	{
		$resp = false;
		$this->login = true;
		$sessionData = array();
		$userData = $this->userExistsByEmail($email);
		if(!empty($userData)) {
			if($userData['status'])
			{
				if (\Hash::check($password, $userData['password'])) {
					$this->setUserSession($userData);
					$resp = true;
				}				
			}
			else
			{
				return 'disable';
			}
		}
		return $resp;		
	}

	public function allUsers($candidateId)
	{
		$allUsers = array('users' => array(), 'creater_id' => '');
		if(!empty($candidateId))
		{
			$candidate = Candidate::find($candidateId);
			
			if(!empty($candidate))
				$allUsers['creater_id'] = $candidate->creator_id;
		}


		$users = User::where('status', 1)->get()->toArray();
		if(!empty($users))
		{
			foreach ($users as $key => $user) {
				$allUsers['users'][] = array('id' => $user['id'], 'name' => $user['name'], 'role_id' => $user['role_id']);
			}
		}
		return $allUsers;
	}

	public function changeStatus($userId, $status)
	{
		$user = $this->get($userId, true);
		if(!empty($user))
		{
			$user->status = $status;
			$user->update();
			return true;
		}
		else
		{
			return false;
		}
	}


	public function resetPassword($password, $userCode)
	{
		$rs = User::where('user_code', $userCode)->first();
		if(!empty($rs))
		{
			$rs->password = \Hash::make($password);
			$rs->user_code = '';
			$rs->update();
			return true;
		}
		else
		{
			return false;
		}
	}

	public function forgotPassword($email)
	{
		$userData = $this->userExistsByEmail($email);
		if(!empty($userData)) {
			// Update code
			$userCode = $this->updateUserCode($userData);
			$url = url('verify-password?code='.$userCode);
			$to = $email;
			$subject = 'Forgot Password - Linktrix';
			$txt = '<html><body>
			Hello "'.$userData['name'].'",<br> 
			Click on the link below to reset password <br><a href="'.$url.'">Reset Password</a></body></html>';
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: jasonbourne501@gmail.com";
			mail($to,$subject,$txt,$headers);			

			return true;
		}
		else
		{
			return false;
		}
		return $resp;		
	}

	public function updateUserCode($userData)
	{
		$userCode = md5($userData['email']);
		$userRec = User::find($userData['id']);
		$userRec->user_code = $userCode;
		$userRec->update();
		return $userCode;
	}

	public function getSupervisorConsultants($userId, $edit)
	{
		$users = $this->getUsers(0, 3);
		if(!empty($users['data']))
		{
			foreach ($users['data'] as $key => &$user) {
				$isConsultant = $this->isSuperVisorConsultant($userId, $user['id']);
				$user['is_consultant'] = $isConsultant;
			}
		}
		else
		{
			$users['data'] = array();
		}

		if(empty($edit) && !empty($users['data']))
		{
			$newArr = array();
			foreach ($users['data'] as $key => $a) {
	
				if($a['is_consultant'] === 1)
				{
					$newArr[] = $a;
				}
			}
			$users['data'] = $newArr;
		}

		return $users['data'];
	}

	public function getSupervisorConsultantsId($userId)
	{
		$users = array();
		$consultants = SupervisorConsultant::where('supervisor_id', $userId)->get();
		if(!empty($consultants))
		{
			foreach ($consultants as $key => $consultant) {
				$users[] = $consultant->consultant_id;
			}
		}

		return $users;
	}


	public function isSuperVisorConsultant($supervisorId, $consultantId)
	{
		return SupervisorConsultant::where('supervisor_id', $supervisorId)->where('consultant_id', $consultantId)->count();
	}

	public function setUserSession($userData)
	{
		unset($userData['password']);
		$sessionData = $userData;				
		$role = $this->roleRepo->get($userData['role_id']);
		if(!empty($role))
		{
			$sessionData['role'] = $role;
		}
		\Session::put('user', $sessionData);
	}

	public function pictureUpload($pic)
	{
		$destinationPath = \Utility::getRoot('user_pictures');
		$extension = $pic->getClientOriginalExtension();
		$fileName = time().'.'.$extension;
		$url = \Utility::getUrl('app/user_pictures').$fileName;
		$pic->move($destinationPath, $fileName);
		return array('file_name' => $fileName, 'url' => $url);
	}

	public function userExistsByEmail($email, $id = 0)
	{
		$user = User::where('email', $email);
		if(!empty($id))
		{
			$user->where('id', '!=' ,$id);
		}

		$user = $user->first();
		if(!empty($user))
			return $this->get($user->id);
		else
			return false;
	}

	public function updateProfile($params)
	{
		$userId = \Session::get('user')['id'];
		$userExists = $this->userExistsByEmail($params['email'], $userId);
		if(!$userExists)
		{
			$user = $this->get($userId, true);
			$user->name = $params['name'];
			$user->email = $params['email'];
			$user->contact_number = $params['contact_number'];
			$user->pic = $params['pic'];			
			$user->update();

			// Update session
			$this->setUserSession($this->get($userId));
			return array('url' => \Session::get('user')['url']);
		}
		else
		{
			return false;
		}
	}

	public function updatePassword($param)
	{
		$this->login = true;
		$userData = $this->get(\Session::get('user')['id'], true);

		if (!empty($userData)) {
			if (\Hash::check($param['current_password'], $userData->password) === false) {
				return false;
			} else {
				$userData->password = \Hash::make($param['new_password']);
				$userData->update();
				return true;
			}
		}
		else {
			return false;
		}
	}

	public function getUsers($limit, $roleId)
	{
    	$data = array();
		$users = USER::where('role_id', '=', $roleId);
		if(!empty($users))
		{
	    	$users = $users->orderBy('id', 'desc');

	    	if(!empty($limit)){
		    	$users = $users->paginate($limit);
	    	}
			else {
				$users = $users->get();
			}

			foreach ($users as $user) {
	            $data['data'][] = $this->get($user->id);
	        }

	        if(!empty($limit)){
		       	$data = \Utility::paginator($data, $users);
	        }
		}
       	return $data ;
	}

	public function get($id, $elequent = false)
	{
		$userData = User::find($id);
		if (!empty($userData)) {
			if(!$this->login)
			unset($userData->password);
			if($elequent) {
				return $userData;				
			} else {
				$userData = $userData->toArray();
				if(!empty($userData['pic']))
				{
					$userData['url'] = \Utility::getUrl('app/user_pictures').$userData['pic'];
				}
				else
				{
					$userData['url'] = 'admin_asset/images/avatar.jpg';
				}
				return $userData;
			}	
		}
		else {
			return false;
		}
	}

	public function generatePassword($length = 6)
	{
		$smallAlphaNum = range('a', 'z');
		$capAlphaNum = range('A', 'Z');
		$num = range(1, 10);
		$arrMerge = array_merge($smallAlphaNum, $capAlphaNum, $num);
		shuffle($arrMerge);
		return $password = implode('', array_slice($arrMerge, 0, $length));
	}

	public function deleteUser($userId)
	{
		$allCandidates = array();
		$user = $this->get($userId, true);
		$candidateRepo = new CandidateRepo();
		if(!empty($user))
		{
			$candidates = Candidate::where('creator_id', $userId)->get()->toArray();
			if(empty($candidates))
			{
				$user->delete();
				return true;
			}
			else
			{
				foreach ($candidates as $key => $candidate) {
					$linktrixId = $candidateRepo->getLintrixId($candidate['id']);
					$allCandidates[] = array('linktrix_id' => $linktrixId, 'name' => $candidate['first_name'] . ''. $candidate['last_name']);
				}
				return $allCandidates;
			}
		}
		else
		{
			return false;
		}
	}

	public function addSupervisorConsultants($supervisorId, $consultants)
	{
		$this->deleteSupervisorConsultants($supervisorId);
		foreach ($consultants as $key => $consultantId) {
			$this->addSupervisorConsultant($supervisorId, $consultantId);
		}
		return true;
	}

	public function addSupervisorConsultant($supervisorId, $consultantId)
	{
		$supcon = new SupervisorConsultant();
		$supcon->supervisor_id = $supervisorId;
		$supcon->consultant_id = $consultantId;
		if($supcon->save()){
			return true;
		} else {
			return false;
		}
	}


	public function deleteSupervisorConsultants($supervisorId)
	{
		SupervisorConsultant::where('supervisor_id', $supervisorId)->delete();
	}

	public function addUser($params)
	{
		$emailExists = $this->userExistsByEmail($params['email']);
		if(!$emailExists)
		{
	        $password = $this->generatePassword();
			$user = new User();
			$user->name = $params['name'];
			$user->role_id = $params['role_id'];		
			$user->email = $params['email'];
			$user->pic = $params['pic'];
			$user->password = \Hash::make($password);		
			$user->contact_number = $params['contact_number'];		
			$user->save();

//			if($_SERVER['HTTP_HOST'] != 'localhost'){
				$this->sendAuthEmail($params['name'], $params['email'], $password);
//			}
			return true;			
		}
		else
		{
			return false;
		}

	}

	public function emailExists()
	{

	}
	
	public function sendAuthEmail($name, $email, $password)
	{
		$to = $email;
		$subject = 'Login Info on Linktrix';
		$txt = '<html><body>Hello,<br> Here is your account credentials. <br><br> Email: '.$email.' <br> Password:  '.$password.' <br><a href="'.url('login').'">LOGIN ON LINKTRIX</a></body></html>';
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= "From: jasonbourne501@gmail.com";
		mail($to,$subject,$txt,$headers);





		// mail($email,$subject,$message,$headers);		
		// \Mail::send('admin.emails.cred', array('email' => $email, 'password' => $password), function($message)  use ($subject, $email, $name) {
		//     $message->to($email, $name)->subject($subject);
		//     $message->from('iqbal_malik89@yahoo.com', 'Linktrix'); 
		// });		

	}

	public function updateUser($params)
	{
		$emailExists = $this->userExistsByEmail($params['email'], $params['user_id']);
		if (!$emailExists) {
			$user = $this->get($params['user_id'], true);
			if (!empty($user)) {
				$user->email = $params['email'];
				$user->pic = $params['pic'];
				$user->role_id = $params['role_id'];
				$user->contact_number = $params['contact_number'];
				$user->name = $params['name'];
				$user->update();			
				return true;
			} else {
				return false;
			}			
		}

	}	

}