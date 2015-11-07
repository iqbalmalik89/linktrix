<?php namespace App\Repo;
use App\Models\CandidateCompany as CandidateCompany;
use App\Models\Candidate as Candidate;
use App\Models\UserCandidate as UserCandidate;
use App\Models\CandidateShare as CandidateShare;
use App\Models\CandidateShareAccess as CandidateShareAccess;
use App\Models\PrimaryAccess as PrimaryAccess;


use Goodby\CSV\Import\Standard\Lexer;
use Goodby\CSV\Import\Standard\Interpreter;
use Goodby\CSV\Import\Standard\LexerConfig;

use Goodby\CSV\Export\Standard\Exporter;
use Goodby\CSV\Export\Standard\ExporterConfig;
use Goodby\CSV\Export\Standard\CsvFileObject;
use Goodby\CSV\Export\Standard\Collection\PdoCollection;

class CandidateRepo
{
	public $userRepo;
	public $consultantId;
	public $adminEmail;

	function __construct() {
		$this->userRepo	= new UserRepo(new RoleRepo);
		$this->consultantId = '';
		$this->adminEmail = 'database@linktrix.com.sg';
    }

    public function getJobTitle()
    {
    	$titles = array();
    	$companies = CandidateCompany::distinct()->get(array('position'))->toArray();
    	if(!empty($companies))
    	{
    		foreach ($companies as $key => $position) {
    			$titles[] = trim($position['position']);
    		}
    	}
    	return $titles;
    }

    public function changeCreator($candidateId, $creatorId)
    {
    	$candidate = Candidate::find($candidateId);
    	if(!empty($candidate))
    	{
    		$candidate->creator_id = $creatorId;
    		$candidate->save();
    		return true;
    	}
    	else
    	{
    		return false;
    	}
    }

    public function getSharingAccess($userId, $sharingId)
    {
    	$count = CandidateShareAccess::where('user_id' , $userId)->where('sharing_id', $sharingId)->count();
    	return $count;
    }

	public function getCandidateOwner($candidateId, $roleId)
	{
		$usersArr = [];
		$userRepo = new UserRepo(new RoleRepo);
		$users = $userRepo->getUsers(0, $roleId);
		if(!empty($users['data']))
		{
			foreach($users['data'] as $user)
			{
				$userData = array('id' => $user['id'], 'name' => $user['name'], 'selected' => 0);
				$count = UserCandidate::where('user_id', $user['id'])->where('candidate_id', $candidateId)->count();
				if($count)
				{
					$userData['selected'] = 1;
				}

				$usersArr[] = $userData;
			}
		}

		return $usersArr;
	}

	public function deleteOwner($candidateId)
	{
		UserCandidate::where('candidate_id', $candidateId)->delete();
	}

	public function addCandidateOwner($candidateId, $admin, $supervisor, $consultant, $assistant)
	{
		$this->deleteOwner($candidateId);
		$this->addOwner($candidateId, $admin);
		$this->addOwner($candidateId, $supervisor);
		$this->addOwner($candidateId, $consultant);
		$this->addOwner($candidateId, $assistant);
		return true;
	}

	public function addOwner($candidateId, $users)
	{
		$dateCreated = date('Y-m-d H:i:s');
		if(!empty($users))
		{
			foreach ($users as $key => $user) {
				$userCandidate = new UserCandidate();
				$userCandidate->candidate_id = $candidateId;
				$userCandidate->user_id = $user;
				$userCandidate->date_created = $dateCreated;				
				$userCandidate->save();
			}
		}
	}

	public function unlockCandidate($candidateId, $consultantId)
	{

 		$resp = array('phone' => '', 
 					  'email' => '', 
 					  'home_number' => '', 
 					  'cv_url' => '',
 					  'cv_updated_at' => '',
 					  );

		$candidateData = $this->get(base64_encode($candidateId));

		$role = $this->getUserRole($consultantId);
		$isOwner = $this->isOwner($candidateId, $role);

		if(!empty($candidateData) && !$isOwner)
		{
			$decodeCandidateId = $candidateId;
			$resp['phone'] = $candidateData['phone'];
			$resp['email'] = $candidateData['email'];
			$resp['home_number'] = $candidateData['home_number'];			
			$resp['cv_url'] = $candidateData['cv_url'];
			$resp['cv_updated_at'] = $candidateData['cv_updated_at'];

			$candidateName = ucfirst($candidateData['first_name'].' '.$candidateData['last_name']);

		 	$candidateLinktrixId = $this->getLintrixId($decodeCandidateId);

		 	// Creater Name
		 	$userName = '';
			$userData = $this->userRepo->get($candidateData['creator_id']);
			if(!empty($userData))
			{
				$userName = $userData['name'];
			}

			$user = \Session::get('user');
			$accessorName = $user['name'];

			//Enter to CandidateShare
			if(empty($consultantId))
			{
				$user = \Session::get('user');
				$currentUserId = $user['id'];

				// Unlock email body
				$body = 'Hello '.$userName.', <br> '.$accessorName.' Unlocked candidate '.$candidateLinktrixId.':'.$candidateName;
			}
			else
			{
				$currentUserId = $consultantId;
				$userData = $this->userRepo->get($consultantId);				

				// Unlock email body
				$body = 'Hello '.$userName.', <br> '.$accessorName.' Unlocked candidate '.$candidateLinktrixId.':'.$candidateName.' on behalf of '.$userData['name'];
			}

			//$this->addCandidateShare($currentUserId, $decodeCandidateId);
			$this->addOwner($decodeCandidateId, array($currentUserId));
			
			// Send email to origional Owner
			$this->sendUnlockEmail('Candidate Unlocked', $decodeCandidateId, $candidateData['creator_id'], $candidateName, $body);
		}

		return $resp;
	}

	public function getCandidateShares($candidateId, $isOwner)
	{
		$candidateShareArr = array();
		$candidateShares = CandidateShare::where('candidate_id', $candidateId)->get()->toArray();
		if(!empty($candidateShares))
		{
			foreach ($candidateShares as $key => $candidateShare) {
				$candidateShareArr[] = $this->getCandidateShare($candidateShare['id'], $isOwner);
			}
		}

		return $candidateShareArr;
	}

	public function addSharingAccess($userId, $sharingId, $type)
	{
		$getSharingData = CandidateShare::find($sharingId);

		if(!empty($getSharingData))
		{
			$candidateRec = $this->get(base64_encode($getSharingData->candidate_id), true);
			if(!empty($candidateRec))
			{
			 	$candidateLinktrixId = $this->getLintrixId($getSharingData->candidate_id);
				$userData = $this->userRepo->get($getSharingData->user_id);
				$user = \Session::get('user');
				$candidateName = $candidateRec->first_name .' '. $candidateRec->last_name;


				$shareString = '';
				if($getSharingData->field_type == 'phone')
				{
					$shareString = ' Phone Number '.$getSharingData->data_field;
				}
				else if($getSharingData->field_type == 'cv')
				{
					$shareString = ' CV';
				}

				if($type == 'user')
				{
					$body = 'Hello '.$userData['name'].', <br> '.$user['name'].' accessed candidate '.$candidateLinktrixId.':'.$candidateName.' - '.$shareString;
				}
				else
				{
					$assistantData = $this->userRepo->get($userId);
					$body = 'Hello '.$userData['name'].', <br> '.$user['name'].' accessed candidate '.$candidateLinktrixId.':'.$candidateName.' - '.$shareString.' on behalf of '.$assistantData['name'];
				}



				if(!empty($candidateRec->creator_id))
				{
					$this->sendUnlockEmail('Candidate '.ucfirst($getSharingData->field_type).' Accessed', $candidateRec->id, $getSharingData->user_id, $candidateName, $body);
				}
			}

			$candidateSharing = new CandidateShareAccess();
			$candidateSharing->user_id = $userId;
			$candidateSharing->sharing_id = $sharingId;
			$candidateSharing->save();
			return true;
		}
		else
		{
			return false;
		}

	}

	public function checkPrimaryAccess($userId, $candidateId, $dataType)
	{
		$access = PrimaryAccess::where('user_id', $userId)->where('candidate_id', $candidateId)->where('data_type', $dataType)->count();
		return $access;
	}


	public function savePrimarySharing($userId, $candidateId, $dataType, $type)
	{
		$dbCandidateRec = Candidate::find($candidateId);
		$candidateRec = $this->get(base64_encode($candidateId), true);

		$access = $this->checkPrimaryAccess($userId, $candidateId, $dataType);

		if(!empty($candidateRec) && !$access)
		{
			$access = new PrimaryAccess();
			$access->user_id = $userId;
			$access->candidate_id = $candidateId;
			$access->data_type = $dataType;
			$access->save();

			if(!empty($candidateRec->creator_id))
			{
				$shareString = '';
				if($dataType == 'phone')
				{
					$shareString = ' Phone Number '.$dbCandidateRec['phone'];
					$shareStr = ' accessed ';
				}
				else if($dataType == 'email')
				{
					$shareString = ' Email '.$dbCandidateRec['email'];
					$shareStr = ' shared ';
				}
				else if($dataType == 'cv')
				{
					$shareString = ' CV';
					$shareStr = ' accessed ';
				}

				$candidateName = $candidateRec->first_name .' '. $candidateRec->last_name;

				$userData = $this->userRepo->get($candidateRec['creator_id']);

				$user = \Session::get('user');
			 	$candidateLinktrixId = $this->getLintrixId($candidateId);

				if($type == 'user')
				{
					$body = 'Hello '.$userData['name'].', <br> '.$user['name'].' '.$shareStr.' candidate '.$candidateLinktrixId.':'.$candidateName.' - '.$shareString;
				}
				else
				{
					$assistantData = $this->userRepo->get($userId);
					$body = 'Hello '.$userData['name'].', <br> '.$user['name'].' '.$shareStr.' candidate '.$candidateLinktrixId.':'.$candidateName.' - '.$shareString.' on behalf of '.$assistantData['name'];
				}


				$this->sendUnlockEmail('Candidate '.ucfirst($dataType).' '.$shareStr, $candidateRec->id, $candidateRec->creator_id, $candidateName, $body);
			}

			return true;
		}
		else
		{
			return false;		
		}
	}

	public function getCandidateShare($id, $isOwner)
	{
		if(!empty($this->consultantId))
		{
			$userId = $this->consultantId;
		}
		else
		{
			$user = \Session::get('user');
			$userId = $user['id'];
		}

		$sharingAccess = $this->getSharingAccess($userId, $id);
		$candidateShare = CandidateShare::find($id);
		if(!empty($candidateShare))
		{
			$userData = $this->userRepo->get($candidateShare->user_id);
			if($userId == $candidateShare->user_id || $sharingAccess)
				$owner = '1';
			else
				$owner = '0';

			if($owner)
			{
				$field = $candidateShare->data_field;
			}
			else
			{
				if($candidateShare->field_type == 'phone')
					$field = \Utility::mask($candidateShare->data_field);
				else
					$field = '';					
			}

			$cvUrl = '';

			if($candidateShare->field_type == 'cv' && !empty($field))
			{
				$cvUrl = \Utility::getUrl('app/cv').$candidateShare->data_field;
			}


//			echo $candidateShare->user_id.' '.$userId.'<br>';
			if($candidateShare->user_id === $userId)
				$delAccess = 1;
			else
				$delAccess = 0;

			$arr = array('id' => $candidateShare->id, 
						 'candidate_id' => $candidateShare->candidate_id, 
						 'user_id' => $candidateShare->user_id,
						 'user_name' => $userData['name'],
						 'data_field' => $field,
						 'cv_url' => $cvUrl,
						 'del_access' => $delAccess,
						 'field_type' => $candidateShare->field_type,
						 'owner' => $owner
						 );
			return $arr;
		}
		else
		{
			return false;
		}
	}

	public function removeSecSharing($shareId)
	{
		CandidateShare::where('id', $shareId)->delete();
		CandidateShareAccess::where('sharing_id', $shareId)->delete();
		return true;
	}

	public function addCandidateShare($userId, $candidateId, $fieldVaue, $type, $userType)
	{
		// $candidateShareExists = $this->candidateShareExists($userId, $candidateId);
		// if(empty($candidateShareExists))
		// {

		$exists = CandidateShare::where('user_id', $userId)->where('candidate_id', $candidateId)->
			  where('field_type', $type)->count();

		$candidateRec = $this->get(base64_encode($candidateId), true);
		if(!empty($candidateRec) && ($exists === 0))
		{
			if(!empty($candidateRec->creator_id))
			{
				$candidateName = $candidateRec->first_name .' '. $candidateRec->last_name;
				$userData = $this->userRepo->get($candidateRec->creator_id);
				$user = \Session::get('user');
				$candidateLinktrixId = $this->getLintrixId($candidateId);

				$shareString = '';
				if($type == 'phone')
				{
					$shareString = ' Phone Number';
				}
				else if($type == 'cv')
				{
					$shareString = ' CV';
				}

				if($userType == 'user')
				{
					$body = 'Hello '.$userData['name'].', <br> '.$user['name'].' added candidate '.$candidateLinktrixId.':'.$candidateName.' - '.$shareString;
				}
				else
				{
					$assistantData = $this->userRepo->get($userId);
					$body = 'Hello '.$userData['name'].', <br> '.$user['name'].' accessed candidate '.$candidateLinktrixId.':'.$candidateName.' - '.$shareString.' on behalf of '.$assistantData['name'];
				}

				$this->sendUnlockEmail('Candidate Added '.ucfirst($type), $candidateRec->id, $candidateRec->creator_id, $candidateName, $body);
			}

			$date = date('Y-m-d H:i:s');
			$newcandidateShare = new CandidateShare();
			$newcandidateShare->data_field = $fieldVaue;
			$newcandidateShare->field_type = $type;			
			$newcandidateShare->user_id = $userId;
			$newcandidateShare->candidate_id = $candidateId;
			$newcandidateShare->date_created = $date;
			$newcandidateShare->save();
			return true;			
		}
		else
		{
			return false;
		}
		// }
		// else
		// {
		// 	return false;
		// }
	}

	public function candidateShareExists($userId, $candidateId)
	{
		$rs = CandidateShare::where('user_id', $userId)->where('candidate_id', $candidateId)->count();
		return $rs;
	}

	public function getLintrixId($candidateId)
	{
		if(!is_numeric($candidateId))
		{
			$candidateId = base64_decode($candidateId);
		}

		$newId = 0;
		$value = '';
		$intArr = range(1, 25);

		for($i=0; $i <= 25; $i++)
		{
			$value = (($i + 1) * 99999) + $i.' '.$i.'<br>';
			if($candidateId <= $value)
			{

				break;
			}
		}



		$alphabetArr = range('A','Z');


		$alphabet = $alphabetArr[$i];

		$j = $i - 1;
		if($j < 0)
			$j = 0;
		$newId = $candidateId -  ($i * 99999) + $j;
		return 'LT-A'.$alphabet.str_pad($newId, 5, 0, STR_PAD_LEFT);
	}

	public function sendUnlockEmail($subject, $candidateId, $creatorId, $candidateName, $body)
	{
		$userData = $this->userRepo->get($creatorId);
		if(!empty($userData))
		{
			$to = $userData['email'];

			$txt = '<html><body>'.$body.'</body></html>';

			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: ".$this->adminEmail;

			mail($to,$subject,$txt,$headers);			
		}
	}

	public function undeleteRequest($candidateId)
	{
		$user = \Session::get('user');
		$userName = $user['name'];
		$userType = $user['role']['type'];

		$candidateData = Candidate::find($candidateId);
		if(!empty($candidateData))
		{
			$linktrixId = $this->getLintrixId($candidateData->id);

			$time = date('Y-m-d H:i:s', (time() + 28800));
			$to  = $this->adminEmail;
			$subject = 'Request to Undelete Candidate';
			$txt = '<html><body>Hello, User '.$userName.' requested to undelete
					Candidate '.$linktrixId.':'.$candidateData['first_name'].' '.$candidateData['last_name'].' at '.$time.'
			</body></html>';
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: ".$this->adminEmail;			
			return true;
		}
		else
		{
			return false;
		}


		mail($to,$subject,$txt,$headers);

	}

	public function checkDuplicateCheck($candidateId, $email, $consultantId)
	{
		$candidateRec = $this->checkEmailDuplicate($candidateId, $email);
		if(!empty($candidateRec))
		{
			if(!empty($consultantId))
			{
				$role = $this->getUserRole($consultantId);

				$isOwner = $this->isOwner($candidateRec->id, $role);

				if($isOwner)
				{
					return array('code' => 6); // already owner external cosultant	
				}
			}


			if(empty($candidateRec->deleted))
			{
				$role = $this->getUserRole();
				$isOwner = $this->isOwner($candidateRec->id, $role);

				// If owner, just gave error of existing email
				if($isOwner)
				{
					return array('code' => 0); // already owner current user
				}
				else
				{
					$candidateId = base64_encode($candidateRec->id);
					$candidateData =  $this->get($candidateId);
					return array('code' => 10, 'id' => base64_encode($candidateRec->id));
				}
			}
			else
			{
				return array('code' => 3, 'candidate_id' => base64_encode($candidateRec->id));
			}

		}
		else
		{
			return array('code' => 2);
		}
	}

	public function addUpdateCandidate($params)
	{
		$emailDuplicate = false;
		$nameDuplicate = false;
		$phoneDuplicate = false;
		$cvDuplicate = false;

		$notify = false;

		$raceReop = new RaceRepo();
		$tagReop = new TagRepo();

		$user = \Session::get('user');
		$currentUserId = $user['id'];

		// add Race
		$raceReop->addRace($params['race']);

		// add tags
		$tagReop->addTags(explode(',', $params['tags']));
		$candidateId = base64_decode($params['candidate_id']);
		if(!empty($candidateId))
		{
			// update candidate
			$ret = $this->updateCandidate($candidateId, $params);
			$this->addCompanies($candidateId, $params['company_names'], $params['basic_salary'], $params['from_dates'], $params['to_dates'], $params['positions']);			
			return $ret;
		}
		else
		{
			$candidateRec = $this->checkEmailDuplicate(0, $params['email']);
			if(!empty($candidateRec))
			{
				return 0;
				$role = $this->getUserRole();
				$isOwner = $this->isOwner($candidateRec->id, $role);

				// If owner, just gave error of existing email
				if($isOwner)
				{
					return 0;
				}
				else
				{
					//Duplicate email hit
					$emailDuplicate = true;
					$oldName = $candidateRec->first_name.' '.$candidateRec->last_name;
					$newName = $params['first_name'].' '.$params['last_name'];
					if($oldName != $newName)
					{
						$notify = true;
						$candidateRec->old_first_name = $candidateRec->first_name;
						$candidateRec->old_last_name = $candidateRec->last_name;						
						$candidateRec->first_name = $params['first_name'];
						$candidateRec->last_name = $params['last_name'];
					}
					else
					{
						$nameDuplicate = true;						
					}

					if($params['phone'] != $candidateRec->phone)
					{
						$notify = true;
						$candidateRec->old_phone = $candidateRec->phone;
						$candidateRec->phone = $params['phone'];
					}
					else
					{
						$phoneDuplicate = true;												
					}

					if(!empty($params['cv_path']))
					{
						$oldFileSize = filesize(\Utility::getRoot('cv').$candidateRec->cv_path);
						$newFileSize = filesize(\Utility::getRoot('cv').$params['cv_path']);						
						if($oldFileSize != $newFileSize)
						{
							$cvDuplicate = true;
							$notify = true;
							$candidateRec->old_cv_path = $candidateRec->cv_path;
							$candidateRec->phone = $params['phone'];							
						}
						else
						{
							$cvDuplicate = true;							
						}
					}

					$currentUsername = $user['name'];
					$currentUserEmail = $user['email'];					
					$userData = $this->userRepo->get($candidateRec['creator_id']);
					$creatorName = $userData['name'];					
					$creatorEmail = $userData['email'];
					$candidateLinktrixId = $this->getLintrixId($candidateRec->id);
					// If everything is duplicate, share ownership
					if($emailDuplicate && $nameDuplicate && $phoneDuplicate && $cvDuplicate)
					{
						$this->addOwner($candidateRec->id, array($currentUserId));
						
						$subject =  'Ownership Shared - '.$candidateLinktrixId;
						$message = 'Candidate '.$candidateLinktrixId.' ownership is shared with '.$currentUsername;
						$this->duplicateEmail($candidateLinktrixId, $subject, $creatorEmail, $creatorName, $message);
						$message = 'Candidate '.$candidateLinktrixId.' ownership is shared with you';
						$this->duplicateEmail($candidateLinktrixId, $subject, $currentUserEmail, $currentUsername, $message);

						return 'duplicate';
					}

					$candidateRec->update();
					if($notify)
					{
						$subject =  'Duplicated Hit Encountred - '.$candidateLinktrixId;
						$message = 'Candidate '.$candidateLinktrixId.' information updated';
						$this->duplicateEmail($candidateLinktrixId, $subject, $creatorEmail, $creatorName, $message);
						$subject =  'Duplicated Hit Encountred - '.$candidateLinktrixId;
						$message = 'Candidate '.$candidateLinktrixId.' information updated';						
						$this->duplicateEmail($candidateLinktrixId, $subject, $currentUserEmail, $currentUsername, $message);

						return 'duplicate_hit';
					}

				}
			}
			else
			{
				// add candidate
				$candidateId = $this->addCandidate($params);				
			}

		}

		$this->addCompanies($candidateId, $params['company_names'], $params['basic_salary'], $params['from_dates'], $params['to_dates'], $params['positions']);


		return base64_encode($candidateId);
	}

	public function duplicateEmail($candidateId, $subject, $to, $receiverName, $message)
	{
		$txt = '<html><body>Hello, '.$receiverName.'<br>
				'.$message.'
		</body></html>';
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= "From: ".$this->adminEmail;

		mail($to,$subject,$txt,$headers);			
	}

	public function cvUpload($cv)
	{
		$realFileName = $cv->getClientOriginalName();		
		$destinationPath = \Utility::getRoot('cv');
		$extension = $cv->getClientOriginalExtension();
		$fileName = time().'.'.$extension;
		$url = \Utility::getUrl('app/cv').$fileName;
		$cv->move($destinationPath, $fileName);
		return array('file_name' => $fileName, 'url' => $url, 'real_file_name' => $realFileName);
	}

	public function csvUpload($csv)
	{
		$realFileName = $csv->getClientOriginalName();
		$destinationPath = \Utility::getRoot('csv');
		$extension = $csv->getClientOriginalExtension();
		$fileName = time().'.'.$extension;
		$url = \Utility::getUrl('app/csv').$fileName;
		$csv->move($destinationPath, $fileName);
		return array('file_name' => $fileName, 'url' => $url, 'real_file_name' => $realFileName);
	}

	public function importCsv($csvPath)
	{
		$user = \Session::get('user');
		$currentUserId = $user['id'];

		$path = \Utility::getRoot('csv') . $csvPath;
		if(file_exists($path))
		{
			$row = 0;
			$arrResult  = array();
			$handle     = fopen($path, "r");
			if(empty($handle) === false) {
			    while(($data = fgetcsv($handle, 1000, ",")) !== FALSE){
			    	
			        if($row == 0)
			        {
			        	$row++;
			        	continue;
			        }


			        $rec = $this->checkEmailDuplicate('', $data[2]);
			        if(!$rec)
			        {
				        $param = array();
				        if(isset($data[0]))
					        $param['first_name'] = $data[0];
				        if(isset($data[1]))
					        $param['last_name'] = $data[1];
				        if(isset($data[2]))
					        $param['email'] = $data[2];
				        if(isset($data[3]))
					        $param['company'] = $data[3];
				        if(isset($data[4]))
					        $param['job_title'] = $data[4];
				        if(isset($data[5]))
					        $param['category'] = $data[5];

				        if(!empty($param['first_name']))
				        {
					        $candidateId = $this->addCandidate($param);
					        $this->addCompany($candidateId, $param['company'], '', '', '', $param['job_title']);
				        }			        	
			        }
			        else
			        {
			        	if($currentUserId != $rec->creator_id)
			        	{
							$access = $this->checkPrimaryAccess($currentUserId, $rec->id, 'email');
							if(!$access)
							{
								$this->savePrimarySharing($currentUserId, $rec->id, 'email', 'user');
							}
			        	}
			        }




			        $row++;
			    }
			    fclose($handle);
			}
			return true;
		}
		else
		{
			return fale;
		}
	}

	public function addCandidate($params)
	{
		$createdAt = date('Y-m-d H:i:s');
		$user = \Session::get('user');
		$creatorId = $user['id'];
		$newCandidate = new Candidate();
		if(!empty($params['consultant_id']))
		{
			$newCandidate->creator_id = $params['consultant_id'];
		}
		else			
			$newCandidate->creator_id = $creatorId;

		$newCandidate->first_name = $params['first_name'];
		$newCandidate->last_name = $params['last_name'];
		if(isset($params['address']))
			$newCandidate->address = $params['address'];
		if(!empty($params['postal_code']))
			$newCandidate->postal_code = $params['postal_code'];
		else
			$newCandidate->postal_code = NULL;

		if(isset($params['phone']))
			$newCandidate->phone = $params['phone'];
		else
			$newCandidate->phone = '';

		if(!empty($params['date_of_birth']))
			$newCandidate->date_of_birth = date('Y-m-d', strtotime($params['date_of_birth']));
		if(isset($params['email']))
			$newCandidate->email = $params['email'];
		if(isset($params['nric']))
			$newCandidate->nric = $params['nric'];
		if(isset($params['citizen']))
			$newCandidate->citizen = $params['citizen'];
		if(isset($params['gender']))
		{
			if(!empty($params['gender']))
				$newCandidate->gender = $params['gender'];
			if(!empty($params['marital_status']))
				$newCandidate->marital_status = $params['marital_status'];
		}
		if(isset($params['nationality']))
			$newCandidate->nationality = $params['nationality'];
		if(!empty($params['notice_period_number']))
			$newCandidate->notice_period_number = $params['notice_period_number'];
		else
			$newCandidate->notice_period_number = NULL;		
	
		if(isset($params['period_type']))
			$newCandidate->period_type = $params['period_type'];
		if(isset($params['race']))
			$newCandidate->race = $params['race'];
		if(isset($params['religion']))
			$newCandidate->religion = $params['religion'];
		if(isset($params['tags']))
			$newCandidate->tags = $params['tags'];
		if(isset($params['home_number']))
			$newCandidate->home_number = $params['home_number'];		
		if(isset($params['cv_path']))
		{
			$cvUpdatedAt = date('Y-m-d H:i:s');
			$newCandidate->cv_updated_at = $cvUpdatedAt;
			$newCandidate->cv_path = $params['cv_path'];
		}

		if(isset($params['highest_qualification']))
			$newCandidate->highest_qualification = $params['highest_qualification'];		
		if(isset($params['remarks']))
			$newCandidate->remarks = $params['remarks'];
		$newCandidate->created_at = $createdAt;

		$newCandidate->save();

		// $this->addOwner($newCandidate->id, array($creatorId));
		return $newCandidate->id;
	}

	public function updateCandidate($candidateId, $params)
	{
		$newCandidate = Candidate::find($candidateId);
		$user = \Session::get('user');
		$creatorId = $user['id'];

		if (!empty($newCandidate)) {
			$candidateexists = $this->checkEmailDuplicate($candidateId, $params['email']);
			if(!$candidateexists)
			{

				if(!empty($params['consultant_id']))
				{			
					$newCandidate->creator_id = $params['consultant_id'];
				}

				$oldRec = $newCandidate->toArray();
				$newCandidate->first_name = $params['first_name'];
				$newCandidate->last_name = $params['last_name'];
				$newCandidate->address = $params['address'];
				if(!empty($params['postal_code']))
					$newCandidate->postal_code = $params['postal_code'];
				else
					$newCandidate->postal_code = NULL;				
				$newCandidate->phone = $params['phone'];
				if(!empty($params['date_of_birth']))
					$newCandidate->date_of_birth = date('Y-m-d', strtotime($params['date_of_birth']));
				$newCandidate->email = $params['email'];
				$newCandidate->nric = $params['nric'];
				$newCandidate->citizen = $params['citizen'];
				if(!empty($params['gender']))
					$newCandidate->gender = $params['gender'];
				if(!empty($params['marital_status']))
					$newCandidate->marital_status = $params['marital_status'];
				$newCandidate->nationality = $params['nationality'];
				if(!empty($params['notice_period_number']))
					$newCandidate->notice_period_number = $params['notice_period_number'];
				else
					$newCandidate->notice_period_number = NULL;

				$newCandidate->period_type = $params['period_type'];
				$newCandidate->race = $params['race'];
				$newCandidate->religion = $params['religion'];
				$newCandidate->tags = $params['tags'];
				$newCandidate->home_number = $params['home_number'];


				if($newCandidate->cv_path != $params['cv_path'])
					$newCandidate->cv_updated_at = date('Y-m-d H:i:s');

				$newCandidate->cv_path = $params['cv_path'];	
				$newCandidate->highest_qualification = $params['highest_qualification'];						
				$newCandidate->remarks = $params['remarks'];
				$newCandidate->update();
				$newCandidate = $newCandidate->toArray();

				$oldRec['cv_updated_at'] = $newCandidate['cv_updated_at'];
				$oldRec['cv_path'] = $newCandidate['cv_path'];				
				if($oldRec == $newCandidate)
				{

				}
				else
				{

					$newCandidate = Candidate::find($candidateId);
					$newCandidate->updated_at = date('Y-m-d H:i:s');
					$newCandidate->update();
				}


				return true;
			}
			else
			{
				return 0;
			}
		} else {
			return false;
		}
	}

	public function deleteCompanies($candidateId)
	{
		CandidateCompany::where('candidate_id', $candidateId)->delete();
	}

	public function addCompanies($candidateId, $companyNames, $basicSalary, $fromDates, $toDates, $positions)
	{
		$this->deleteCompanies($candidateId);

		foreach ($companyNames as $key => $companyName) {
			$this->addCompany($candidateId ,$companyName, $basicSalary[$key], $fromDates[$key], $toDates[$key], $positions[$key]);
		}
	}

	public function addCompany($candidateId, $companyName, $basicSalary, $fromDate, $toDate, $position)
	{
		if(empty($companyName))
		{
			$fromDate = '';
			$toDate = '';
			$position = '';
			$basicSalary = '';
		}

		$newComapny = new CandidateCompany();
		$newComapny->candidate_id = $candidateId;
		$newComapny->company_name = $companyName;
		$newComapny->basic_salary = $basicSalary;
		if(!empty($fromDate))
			$newComapny->from_date = date('Y-m-d', strtotime($fromDate));
		if(!empty($toDate))
			$newComapny->to_date = date('Y-m-d', strtotime($toDate));
		$newComapny->position = $position;
		$newComapny->save();			
	}

	public function getCandidateCompanies($candidateId)
	{
		$companies = CandidateCompany::where('candidate_id', $candidateId)->get()->toArray();
		if(!empty($companies))
		{
			foreach ($companies as $key => &$company) {
				if(empty($company['company_name']))
				{
					$company['from_date'] = '';
					$company['to_date'] = '';
				}
			}
		}

		return $companies;
	}

	public function exportCandidates($searchTerm)
	{
		$exportData = array();
		$candidates = $this->getCandidates(0, $searchTerm, 'basic_salary', 'asc');
		// echo "<pre>";
		// print_r($candidates);
		// die();
		if(!empty($candidates['data']))
		{
			// heading
			$exportData[] = array('Id', 'First Name', 'Last Name', 'Address', 'Postal Code', 'Phone', 'Date Of Birth', 'Email', 'Home Number', 'NRIC',
								  'Citizen', 'Gender', 'Marital Status', 'Nationality', 'Notice Period', 'Highest Qualification', 'Race', 'Religion','Remarks', 'Tags',
								  'Company Name', 'Basic Salary', 'From', 'To', 'Position',
								  'Company Name', 'Basic Salary', 'From', 'To', 'Position',
								  'Company Name', 'Basic Salary', 'From', 'To', 'Position','Created At', 'Updated At'
								  );

			foreach ($candidates['data']['data'] as $key => $candidate) {
				// if($key == 0)
				// {
				// 	echo "<pre>";
				// 	print_r($candidate);
				// }
				// else
				// {
				// 	continue;
				// }

				$exportElement = array();
				$exportElement = $candidate;
				$exportElement['period_type'] = $exportElement['notice_period_number'] + $exportElement['period_type'];
				unset($exportElement['creator_id']);
				unset($exportElement['cv_path']);
				unset($exportElement['cv_url']);
				unset($exportElement['notice_period_number']);
				unset($exportElement['owner']);
				unset($exportElement['cv_updated_at']);
				// unset($exportElement['home_number']);
				unset($exportElement['old_first_name']);
				unset($exportElement['old_last_name']);
				unset($exportElement['old_phone']);
				unset($exportElement['old_cv_path']);
				unset($exportElement['owner_image']);
				$exportElement['id'] = $exportElement['linktrix_id'];
				unset($exportElement['linktrix_id']);
				unset($exportElement['candidate_sharing']);
				unset($exportElement['basic_salary']);
				unset($exportElement['deleted']);
				unset($exportElement['candidate_sharing']);
				unset($exportElement['phone_access']);
				unset($exportElement['cv_access']);
				unset($exportElement['email_access']);

				if($exportElement['date_of_birth'] == '0000-00-00')
					$exportElement['date_of_birth'] = '';


				if(empty($exportElement['is_owner']))
				{
					// mask contact details // restricted
					$exportElement['email'] = '';
					$exportElement['phone'] = '';
					$exportElement['home_number'] = '';					
				}


				// Companies
				if(!empty($exportElement['companies']))
				{
					foreach ($exportElement['companies'] as $key => $company) {
						$inc = ++$key;
						
						$exportElement['company_name'.$inc] = $company['company_name'];
						$exportElement['basic_salary'.$inc] = $company['basic_salary'];
						if($company['from_date'] != '0000-00-00')
							$exportElement['from_date'.$inc] = $company['from_date'];
						else
							$exportElement['from_date'.$inc] = '';

						if($company['to_date'] != '0000-00-00')
							$exportElement['to_date'.$inc] = $company['to_date'];						
						else
							$exportElement['to_date'.$inc] = '';

						$exportElement['position'.$inc] = $company['position'];
					}
				}

				$remCompanies = 3 - count($exportElement['companies']);

				if($remCompanies > 0)
				{
					for($i = 1; $i <= 3; $i++)
					{
						if(!isset($exportElement['company_name'.$i]))
						{
							$exportElement['company_name'.$i] = '';
							$exportElement['basic_salary'.$i] = '';
							$exportElement['from_date'.$i] = '';
							$exportElement['to_date'.$i] = '';						
							$exportElement['position'.$i] = '';														
						}
					}					
				}

				$createdAt = $exportElement['created_at'];
				$updatedAt = $exportElement['updated_at'];
				unset($exportElement['is_owner']);
				unset($exportElement['companies']);
				unset($exportElement['created_at']);
				unset($exportElement['updated_at']);
				unset($exportElement['company_name']);
				unset($exportElement['position']);

				$exportElement['created_at'] = $createdAt;
				$exportElement['updated_at'] = $updatedAt;
				$exportData[] = $exportElement;
			}

			$config = new ExporterConfig();
			$exporter = new Exporter($config);
			$fileName = 'Export-'.date('Y-m-d').'Time'.date('H:i').'.csv';

			header('Content-Type: application/csv');
			header('Content-Disposition: attachment; filename=Export-'.date('Y-m-d H:i').'.csv');
			header('Pragma: no-cache');

			$exporter->export('php://output', $exportData);
		}




		return array('file' => $fileName);
	}

	public function checkEmailDuplicate($id, $email)
	{
		if(empty($id))
			$candidate = Candidate::where('email', $email)->first();
		else
			$candidate = Candidate::where('email', $email)->where('id', '!=', $id)->first();

		if(empty($candidate))
			return false;
		else
			return $candidate;
	}

	public function undeleteCandidate($candidateId)
	{
		$candidate = Candidate::find($candidateId);
		if(!empty($candidate))
		{
			$candidate->deleted = 0;
			$candidate->update();
			return true;
		}
		else
		{
			return false;
		}
	}

	public function deleteCandidate($candidateId)
	{
		$user = \Session::get('user');
		$userName = $user['name'];
		$userType = $user['role']['type'];

		// Delete Candidate
		$candidateData = Candidate::find($candidateId);


		if($userType != 'admin')
		{
			// Send notification email to a user
			$linktrixId = $this->getLintrixId($candidateData->id);

			$time = date('Y-m-d H:i:s', (time() + 28800));
			$to  = $this->adminEmail;
			$subject = 'Candidate Deleted';
			$txt = '<html><body>Hello, User '.$userName.' deleted
					Candidate '.$linktrixId.':'.$candidateData['first_name'].' '.$candidateData['last_name'].' at '.$time.'
			</body></html>';
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			$headers .= "From: ".$this->adminEmail;

			mail($to,$subject,$txt,$headers);	
			
			$candidateData->deleted = 1;
			$candidateData->update();
			return true;
		}
		else
		{
			if(!empty($candidateData))
			{

				Candidate::where('id', $candidateId)->delete();

				//Delete owners
				$this->deleteOwner($candidateId);

				// Delete companies
				$this->deleteCompanies($candidateId);

				return true;			
			}
			else
			{
				return false;	
			}
		}


	}



	public function getCandidates($limit, $search, $orderby, $sortOrder)
	{
    	$data = array();
    	$searchBool = false;

    	$searchName = $search['search_name'];
    	$searchCreatorId = $search['search_consultant_id'];
    	$searchJobTitle = $search['search_job_title'];
    	$searchTags = $search['search_tags'];
    	$searchMode = $search['search_mode'];
		$user = \Session::get('user');
		$userName = $user['name'];
		$userType = $user['role']['type'];


    	if(!empty($searchName) || !empty($searchJobTitle) || !empty($searchTags) || !empty($searchCreatorId))
    	{
    		$searchBool = true;
    		$searchNamePart = '';
    		$searchTagsPart = '';
    		$searchJobTitlePart = '';
    		$searchCreatorIdPart = '';
    		if(!empty($searchTags))
    		{
    			$searchTags = explode(',' , $searchTags);
	    		$tagsLength = count($searchTags) - 1;

    			foreach ($searchTags as $key => $searchTag) {
    				$key++;
    				if($key <= $tagsLength)
    					$orOperator = ' OR ';
    				else
    					$orOperator = ' ';

    				$searchTag = '%'.$searchTag.'%';
    				$searchTagsPart .= ' c.tags LIKE "'.$searchTag.'" '.$orOperator;
    			}
    		}


    		if(!empty($searchName))
    		{
    			$searchNamePart = ' (c.first_name LIKE "'.$searchName.'" OR c.last_name LIKE "'.$searchName.'") ';
    		}

    		if(!empty($searchCreatorId))
    		{
    			$searchCreatorIdPart = ' c.creator_id = '.$searchCreatorId.' ';
    		}

    		if(!empty($searchJobTitle))
    		{
    			if(!empty($searchNamePart))
    				$searchNamePart = ' '.$searchMode.' ('. $searchNamePart.')';
    			if(!empty($searchTagsPart))
    				$searchTagsPart = ' '.$searchMode.' ('. $searchTagsPart.')';
    			if(!empty($searchCreatorId))
    				$searchTagsPart = ' '.$searchMode.' ('. $searchCreatorId.')';


    			$searchJobTitleArr = explode(',' , $searchJobTitle);
	    		$searchJobTitleArrLength = count($searchJobTitleArr) - 1;

    			foreach ($searchJobTitleArr as $key => $searchJobTitleItem) {
    				$key++;
    				if($key <= $searchJobTitleArrLength)
    					$orOperator = ' OR ';
    				else
    					$orOperator = ' ';

    				$searchJobTitleItem = '%'.$searchJobTitleItem.'%';
    				$searchJobTitlePart .= ' cc.position LIKE "'.$searchJobTitleItem.'" '.$orOperator;
    			}


				if($userType == 'admin')
					$deletedPart = '';
				else
					$deletedPart = ' AND c.deleted = 0 ';


    			$query = 'select c.id from candidates as c, candidate_companies as cc where c.id = cc.candidate_id
    			 AND ( '.$searchJobTitlePart.') '.$searchNamePart.' '.$searchTagsPart. $searchTagsPart .$deletedPart.'   group by c.id';
    		}
    		else
    		{
    			if(!empty($searchNamePart) && !empty($searchTagsPart))
    				$searchTagsPart = ' '.$searchMode.' '.$searchTagsPart;

    			if(!empty($searchCreatorIdPart))
    			{
	    			if(!empty($searchNamePart) || !empty($searchTagsPart))
	    				$searchCreatorIdPart = ' '.$searchMode.' '.$searchCreatorIdPart;
    			}


				if($userType == 'admin')
					$deletedPart = '';
				else
					$deletedPart = ' AND c.deleted = 0 ';

				$searchCriteria = trim($searchNamePart.' '.$searchTagsPart.$searchCreatorIdPart.$deletedPart);
				if(!empty($searchCriteria))
					$searchCriteria = ' where '. $searchCriteria;
    			$query = 'select c.id from candidates as c '.$searchCriteria.' group by c.id';
    			
    		}

			$candidates = \DB::select($query);

    	}
		else
		{
			if($userType == 'admin')
				$candidates = Candidate::where('id', '>', '0')->orderBy('id', 'desc');
			else
				$candidates = Candidate::where('deleted', '=', '0')->orderBy('id', 'desc');
		}
		if(!empty($candidates))
		{
			if(!$searchBool)
			{
		    	if(!empty($limit)){
			    	$candidates = $candidates->paginate($limit);
		    	}
				else {
					$candidates = $candidates->get();
				}				
			}


			foreach ($candidates as $candidate) {
	            $candidateData = $this->get(base64_encode($candidate->id));

	            // Hide data if owner is not accessing
	            if(!$candidateData['is_owner'])
	            {
	            	if($candidateData['email_access'])
		            	$candidateData['email'] = $candidateData['email'];
	            	else
		            	$candidateData['email'] = 'Restricted'; // restricted

	            	$candidateData['phone'] = 'Restricted';	            	
	            }

	            $data['data'][] = $candidateData;
	        }

	        if(!empty($limit)){
		       	$data['data'] = \Utility::paginator($data, $candidates);
	        } else {
		       	$data['data'] = $data;
	        }
		}

		if($searchBool != '' && $orderby != '' && !empty($data['data']['data']))
		{
			if($orderby == 'basic_salary')
			{
				if($sortOrder == 'desc')
					$sortOrder = SORT_DESC;
				else
					$sortOrder = SORT_ASC;

				$this->array_sort_by_column($data['data']['data'], 'basic_salary', $sortOrder);
			}
		}

       	return $data;
	}

	public function array_sort_by_column(&$arr, $col, $dir = SORT_ASC) {
	    $sort_col = array();
	    foreach ($arr as $key=> $row) {
	        $sort_col[$key] = $row[$col];
	    }

	    array_multisort($sort_col, $dir, $arr);
	}

	public function get($id, $elequent = false)
	{
		date_default_timezone_set('Asia/Singapore');		

		$id = \Utility::decrypt($id);

		if(!empty($this->consultantId))
		{
			$currentUserId = $this->consultantId;
		}
		else
		{
			$user = \Session::get('user');
			$currentUserId = $user['id'];
		}

		$candidateShareExists = $this->candidateShareExists($currentUserId, $id);		

		$candidateData = Candidate::find($id);
		if (!empty($candidateData)) {

			if($elequent) {
				return $candidateData;				
			} else {
				$candidateData = $candidateData->toArray();

				$candidateData['companies'] = $this->getCandidateCompanies($candidateData['id']);
				$candidateData['id'] = \Utility::encrypt($candidateData['id']);
				if(!empty($candidateData['cv_path']))
					$candidateData['cv_url'] = \Utility::getUrl('app/cv').$candidateData['cv_path'];
				else
					$candidateData['cv_url'] = '';

				if(!empty($this->consultantId)){
					$role = $this->getUserRole($this->consultantId);
				}
				else{
					$role = $this->getUserRole();
				}

				$candidateData['is_owner'] = $this->isOwner($id, $role);
				$candidateData['candidate_sharing'] = $this->getCandidateShares($id, $candidateData['is_owner']);

				$candidateData['remarks'] = nl2br($candidateData['remarks']);

				if(!$candidateData['is_owner']){
					$candidateData['phone_access'] = $this->checkPrimaryAccess($currentUserId, $id, 'phone');
					$candidateData['cv_access'] = $this->checkPrimaryAccess($currentUserId, $id, 'cv');
					$candidateData['email_access'] = $this->checkPrimaryAccess($currentUserId, $id, 'email');					
				}
				else{
					$candidateData['phone_access'] = 1;
					$candidateData['cv_access'] = 1;					
					$candidateData['email_access'] = 1;
				}

				if(empty($candidateData['cv_path']))
					$candidateData['cv_path'] = '';
				$candidateData['linktrix_id'] = $this->getLintrixId($candidateData['id']);
				$candidateData['company_name'] = '';
				$candidateData['position'] = '';
				$candidateData['basic_salary'] = '';

				if(!empty($candidateData['creator_id']))
				{
					$userData = $this->userRepo->get($candidateData['creator_id']);
					$candidateData['owner'] = ucfirst($userData['name']);
					$candidateData['owner_image'] = $userData['url'];
				}
				else
				{
					$candidateData['owner'] = "";					
					$candidateData['owner_image'] = '';
				}

				if(!empty($candidateData['companies']))
				{
					foreach ($candidateData['companies'] as $key => $company) {
						if(!empty($company['company_name']))
						{
							$candidateData['company_name'] = $company['company_name'];
							$candidateData['position'] = $company['position'];
							$candidateData['basic_salary'] = $company['basic_salary'];							
						}
						break;
					}
				}

				
				if(!empty($candidateData['created_at']))
				{
					$candidateData['created_at'] = date('Y-m-d H:i:s', strtotime($candidateData['created_at']) + 28800);
				}


				if(!empty($candidateData['updated_at']) && strpos($candidateData['updated_at'], '00:00:00')  === false)
				{
					$candidateData['updated_at'] = date('Y-m-d H:i:s', strtotime($candidateData['updated_at']) + 28800);
				}
				else
				{
					$candidateData['updated_at'] = '';					
				}

				if(!empty($candidateData['cv_updated_at']))
				{
					$candidateData['cv_updated_at'] = date('Y-m-d H:i:s', strtotime($candidateData['cv_updated_at']) + 28800);
				}

				return $candidateData;
			}	
		}
		else {
			return false;
		}
	}

	public function isOwner($candidateId, $role)
	{
		$roleRepo = new RoleRepo();
		$userIds = array();
		if(!empty($role))
		{
			// Allow if admin is accessing
			if($role['type'] == 'admin')
			{
				return true;
			}
			else
			{
				// check if creator is viewing
				$candidateData = Candidate::find($candidateId);
				if(!empty($candidateData))
				{
					// Check admin
					$creatorData = $this->userRepo->get($candidateData->creator_id);
					if(!empty($creatorData))
					{
						$creatorRoleData = $roleRepo->get($creatorData['role_id']);
						if(!empty($creatorRoleData['type']))
						{
							if($creatorRoleData['type'] == 'admin' || $creatorRoleData['type'] == 'assistant')	
							{
								return true;
							}
						}
					}

					// Check ownerships
					// check supervisor

					if($role['type'] == 'supervisor')
					{
						$userIds = $this->userRepo->getSupervisorConsultantsId($role['id']);
					}

					$userIds[] = $role['id'];

					// if any user is creator
					if(in_array($candidateData->creator_id, $userIds))
					{
						return true;
					}
					else
					{
						// check if any of this user have ownership
						$userCount = UserCandidate::whereIn('user_id', $userIds)->where('candidate_id', $candidateId)->count();
						if($userCount > 0)
						{
							return true;
						}
						else
						{
							return false;
						}
					}

				}
				else
				{
					return false;
				}
			}
		}
		else
		{
			return false;
		}
	}

	public function savePhoneShare($candidateId, $phone, $userId)
	{

	}

	public function getUserRole($userId = 0)
	{
		$resp = array();
		if(empty($userId))
		{
			$user = \Session::get('user');
			$resp = $user['role'];
			$resp['role_id'] = $user['role']['id'];
			$resp['id'] = $user['id'];					
		}
		else
		{
			$userData = $this->userRepo->get($userId);
			if(!empty($userData['role_id']))
			{
				$resp = $this->userRepo->roleRepo->get($userData['role_id']);
				$resp['role_id'] = $userData['role_id'];
				$resp['id'] = $userId;
			}
		}

		return $resp;
	}

}