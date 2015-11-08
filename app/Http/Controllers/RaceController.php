<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Repo\RaceRepo as RaceRepo;

class RaceController extends BaseController
{
	public $repo;
    function __construct(RaceRepo $raceRepo) {
       $this->repo = $raceRepo;
    }

 	public function all()
 	{
    	$resp = $this->repo->all();

		if($resp)
		{
			$data = array('status' => 'success', 'data' => $resp);
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		 		
 	}


 	public function save()
 	{
 		$race = \Request::get('race');
    	$resp = $this->repo->addRace($race);

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

 	public function update()
 	{
 		$race = \Request::get('race');
 		$raceId = \Request::get('race_id'); 		
    	$resp = $this->repo->update($raceId, $race);

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

 	public function delete($raceId)
 	{
    	$resp = $this->repo->delete($raceId);

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

 	public function get($raceId)
 	{
    	$resp = $this->repo->get($raceId);

		if($resp)
		{
			$data = array('status' => 'success', 'data' => $resp);
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		 		
 	}

 	



}
