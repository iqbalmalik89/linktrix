<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Repo\CandidateRepo as CandidateRepo;

class CandidateController extends BaseController
{
	public $repo;
    function __construct(CandidateRepo $CandidateRepo) {
       $this->repo = $CandidateRepo;
    }

 	public function addupdateCandidate()
 	{
		$params = \Request::all();

		if(!empty($params['first_name']) && !empty($params['last_name']) && $params['email'])
		{

			$resp = $this->repo->addUpdateCandidate($params);

			if($resp === 0)
			{
				return response()->json(array('status' => 'error', 'candidate_id' => '', 'message' => 'Candidate already exists with this email.'));
			}
			else if($resp === 'duplicate')
			{
				return response()->json(array('status' => 'success', 'candidate_id' => $resp, 'message' => 'Candidate ownership shared with you.'));
			}
			else if($resp === 'duplicate_hit')
			{
				return response()->json(array('status' => 'success', 'candidate_id' => $resp, 'message' => 'Duplicate hit. Origional consultant has been notified.'));
			}			
			else if($resp)
			{
				return response()->json(array('status' => 'success', 'candidate_id' => $resp, 'message' => 'Candidate added successfully.'));
			}
			else
			{
				return response()->json(array('status' => 'error', 'message' => 'Candidate not added successfully'));
			}			
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'Please enter mandatory fields'));
		} 		
 	}

 	public function changeCreator()
 	{
		$candidateId = base64_decode(\Request::input('candidate_id'));
		$creatorId = \Request::input('creator_id');

		$data = $this->repo->changeCreator($candidateId, $creatorId);

		if($data)
		{
			return response()->json(array('status' => 'success'));
		}
		else
		{
			return response()->json(array('status' => 'error'));
		}

 	}

 	public function getJobTitle()
 	{

		$data = $this->repo->getJobTitle();

		if($data)
		{
			return response()->json(array('job_titles' => $data));
		}
		else
		{
			return response()->json(array('data' => array()));
		}

 	}

 	public function undeleteCandidate()
 	{
		$candidateId = base64_decode(\Request::input('candidate_id'));

		$data = $this->repo->undeleteCandidate($candidateId);

		if($data)
		{
			return response()->json(array('status' => 'success'));
		}
		else
		{
			return response()->json(array('status' => 'error'));
		}

 	}

 	public function unlockCandidate()
 	{
		$candidate_id = \Request::input('candidate_id');

		$data = $this->repo->unlockCandidate($candidate_id);
		if($data)
		{
			return response()->json($data);
		}
		else
		{
			return response()->json(array('data' => array()));
		}
 	}

 	public function getCandidateOwner()
 	{
		$candidate_id = base64_decode(\Request::input('candidate_id'));
		$role_id = \Request::input('role_id');

		$data = $this->repo->getCandidateOwner($candidate_id, $role_id);
		if($data)
		{
			return response()->json(array('data' => $data));
		}
		else
		{
			return response()->json(array('data' => array()));
		}
 	}

 	public function savePrimarySharing()
 	{
 		$candidateId = base64_decode(\Request::input('candidate_id'));
 		$dataType = \Request::input('data_type');

		$user = \Session::get('user'); 			
		$userId = $user['id'];
		$data = $this->repo->savePrimarySharing($userId, $candidateId, $dataType);
		if($data)
		{
			return response()->json(array('status' => 'success'));
		}
		else
		{
			return response()->json(array('status' => 'error'));
		}
 	}

 	public function secInfoShare()
 	{
 		$candidateId = base64_decode(\Request::input('candidate_id'));
 		$sharingId = \Request::input('sharing_id');

 		if(!empty($consultantId))
 			$userId = $consultantId;
 		else
 		{
			$user = \Session::get('user'); 			
 			$userId = $user['id'];
 		}

 		if(!empty($candidateId))
 		{
			$data = $this->repo->addSharingAccess($userId, $sharingId);

			return response()->json(array('status' => 'success'));
 		}
 		else
 		{
			return response()->json(array('status' => 'error')); 			
 		}
 	}

 	public function saveShare()
 	{
 		$candidateId = base64_decode(\Request::input('candidate_id'));
 		$phone = \Request::input('phone'); 		
 		$cvPath = \Request::input('cv_path'); 		 		
 		$type = \Request::input('type');
 		$consultantId = \Request::input('consultant_id');

 		if($type == 'phone')
 			$value = $phone;
 		else
 			$value = $cvPath;
 		if(!empty($consultantId))
 			$userId = $consultantId;
 		else
 		{
			$user = \Session::get('user'); 			
 			$userId = $user['id'];
 		}

 		if(!empty($candidateId))
 		{
			$data = $this->repo->addCandidateShare($userId, $candidateId, $value, $type);

			return response()->json(array('status' => 'success'));
 		}
 		else
 		{
			return response()->json(array('status' => 'errir')); 			
 		}
 	}

 	public function addCandidateOwner()
 	{
 		$candidateId = base64_decode(\Request::input('candidate_id'));
 		$admin = \Request::input('admin');
 		$supervisor = \Request::input('supervisor');
 		$consultant = \Request::input('consultant');
 		$assistant = \Request::input('assistant');

		$data = $this->repo->addCandidateOwner($candidateId, $admin, $supervisor, $consultant, $assistant);

		if($data)
		{
			return response()->json(array('status' => 'success'));
		}
		else
		{
			return response()->json(array('status' => 'errir'));
		}

 	}

	public function getCandidate()
	{
		$candidate_id = \Request::input('candidate_id');
		$accessCheck = \Request::input('access_check');

		$data = $this->repo->get($candidate_id);

		if($accessCheck == 'yes')
		{
//			if(!$data['is_owner'] &&  empty($data['candidate_sharing']))
			if(!$data['is_owner'])
			{
				if(!empty($data['email']))
					$data['email'] = 'Restricted';
				else
					$data['email'] = '';

				if(!empty($data['home_number']))
					$data['home_number'] = 'Restricted';
				else
					$data['home_number'] = '';
	
				if(!empty($data['phone']))
				{
					if($data['phone_access'])	
						$data['phone'] = $data['phone'];
					else
						$data['phone'] = \Utility::mask($data['phone']);
				}
				else
					$data['phone'] = '';

				if(!empty($data['cv_url']))
				{
					if($data['cv_access'])	
						$data['cv_url'] = $data['cv_url'];
					else
						$data['cv_url'] = '';
				}
				else
					$data['cv_url'] = '';
			}
		}

		if($data)
		{
			return response()->json(array('data' => $data));
		}
		else
		{
			return response()->json(array('data' => array()));
		}

	}

	public function undeleteRequest()
	{
		$candidateId = base64_decode(\Request::input('candidate_id'));
    	$resp = $this->repo->undeleteRequest($candidateId);

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
	
	public function importCsv()
	{
		$csvPath = \Request::input('csv_path');
		$resp = false;
		if(!empty($csvPath))
		{
	    	$resp = $this->repo->importCsv($csvPath);			
		}

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

    public function checkDuplicateCheck()
    {
    	$email = \Request::get('email');
    	$encodedCandidateId = \Request::get('candidate_id');
    	$candidateId = base64_decode($encodedCandidateId);
    	$resp = $this->repo->checkDuplicateCheck($candidateId, $email);
    	
    	if($resp['code'] === 0)
    	{
			$data = array('status' => 'error', 'message' => 'A candidate already exists with this email.');
    	}
		else if($resp['code'] === 2)
		{
			$data = array('status' => 'success');
		}
		else if($resp['code'] === 3)
		{
			$data = array('status' => 'deleted', 'candidate_id' => $resp['candidate_id']);
		}		
		else
		{
			// unset($resp['phone']);
			// unset($resp['old_phone']);			
			// unset($resp['home_number']);			
			// unset($resp['cv_path']);			
			// unset($resp['old_cv_path']);			
			// unset($resp['cv_url']);			

			$data = array('status' => 'duplicate', 'message' => 'Do you want to share the information?', 'data' => $resp);
		}

		return response()->json($data);		
    }

    public function csvUpload()
    {
    	if (\Request::hasFile('csv') && \Request::file('csv')->isValid())
    	{
	    	$csv = \Request::file('csv');
	    	$resp = $this->repo->csvUpload($csv);
    	}

		if($resp)
		{
			$data = array('status' => 'success', 'file_name' => $resp['file_name'],'real_file_name' => $resp['real_file_name'], 'url' => $resp['url']);
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		
    }

    public function cvUpload()
    {
    	if (\Request::hasFile('cv') && \Request::file('cv')->isValid())
    	{
	    	$cv = \Request::file('cv');
	    	$resp = $this->repo->cvUpload($cv);
    	}

		if($resp)
		{
			$data = array('status' => 'success', 'file_name' => $resp['file_name'], 'real_file_name' => $resp['real_file_name'], 'url' => $resp['url']);
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		
    }

    public function cvDownload()
    {
    	$cvPath = \Utility::getRoot('cv').\Request::input('cv_path');
    	if(file_exists($cvPath))
    	{    		
	   		return response()->download($cvPath);
    	}
	   	else
	   		echo 'File not found';
    }

    public function exportDownload()
    {

		// $searchTerm = \Request::input('search_term');
		// if(!empty($searchTerm))
		// {
		// 	$searchTerm = '%'.$searchTerm.'%';
		// }

		$search = array();
		$search['search_name'] = \Request::input('search_name');
		$search['search_job_title'] = \Request::input('search_job_title');
		$search['search_tags'] = \Request::input('tags_field');
		$search['search_mode'] = \Request::input('search_mode');


		if(!empty($search['search_name']) || !empty($search['search_job_title']) || !empty($search['search_tags']))
		{
			$searchMode = $search['search_mode'];
			unset($search['search_mode']);
			foreach ($search as $key => &$singleSearch) {
				if(!empty($singleSearch) && $key !== 'search_tags')
					$singleSearch = '%'.$singleSearch.'%'; 
			}
			$search['search_mode'] = $searchMode;
			$limit = 0;
		}



		$resp = $this->repo->exportCandidates($search);
		
    	// $cvPath = \Utility::getRoot('export').\Request::input('file');
    	// if(file_exists($cvPath))
	   	// 	return response()->download($cvPath);
	   	// else
	   	// 	echo 'File not found';
    }
    

    public function exportCandidates()
    {
		$searchTerm = \Request::input('search_term');
		if(!empty($searchTerm))
		{
			$searchTerm = '%'.$searchTerm.'%';
		}

		$resp = $this->repo->exportCandidates($searchTerm);

		if($resp)
		{
			return response()->json($resp);
		}
		else
		{
			return response()->json(array('data' => array()));
		}		
    }

    public function deleteCandidate()
    {
		$candidateId = base64_decode(\Request::input('candidate_id'));

		$resp = $this->repo->deleteCandidate($candidateId);

		if($resp)
		{
			return response()->json(array('status' => 'success'));
		}
		else
		{
			return response()->json(array('status' => 'error'));
		}		
    }

	public function getCandidates()
	{
		$limit = \Request::input('limit');
		$search = array();
		$search['search_name'] = \Request::input('search_name');
		$search['search_mode'] = \Request::input('search_mode');		
		$search['search_job_title'] = \Request::input('search_job_title');
		$search['search_tags'] = \Request::input('search_tags');

		$sortOrder = \Request::input('sort_order');				
		$orderBy = \Request::input('order_by');		
		if(empty($orderBy))
			$orderBy = 'basic_salary';
		if(empty($sortOrder))
			$orderBy = 'asc';


		if(!empty($search['search_name']) || !empty($search['search_job_title']) || !empty($search['search_tags']))
		{
			$searchMode = $search['search_mode'];
			unset($search['search_mode']);
			foreach ($search as $key => &$singleSearch) {
				if(!empty($singleSearch) && $key !== 'search_tags')
					$singleSearch = '%'.$singleSearch.'%'; 
			}
			$search['search_mode'] = $searchMode;
			$limit = 0;
		}


		$resp = $this->repo->getCandidates($limit, $search, $orderBy, $sortOrder);
		if(isset($resp['data']))
		{
			return response()->json($resp);
		}
		else
		{
			return response()->json(array('data' => array()));
		}
	}
}
