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
			if(!$data['is_owner'])
			{
				$data['email'] = 'strict';
				$data['home_number'] = 'strict';				
				$data['phone'] = 'strict';				
				$data['cv_url'] = 'strict';
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

		$searchTerm = \Request::input('search_term');
		if(!empty($searchTerm))
		{
			$searchTerm = '%'.$searchTerm.'%';
		}

		$resp = $this->repo->exportCandidates($searchTerm);
		
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
		$searchTerm = \Request::input('search_term');		
		$sortOrder = \Request::input('sort_order');				
		$orderBy = \Request::input('order_by');		
		if(empty($orderBy))
			$orderBy = 'basic_salary';
		if(empty($sortOrder))
			$orderBy = 'asc';


		if(!empty($searchTerm))
		{
			$searchTerm = '%'.$searchTerm.'%';
			$limit = 0;
		}

		$resp = $this->repo->getCandidates($limit, $searchTerm, $orderBy, $sortOrder);
		if($resp['data'])
		{
			return response()->json($resp);
		}
		else
		{
			return response()->json(array('data' => array()));
		}
	}
}
