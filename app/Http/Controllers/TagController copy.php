<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Repo\TagRepo as TagRepo;

class TagController extends BaseController
{
	public $repo;
    function __construct(TagRepo $tagRepo) {
       $this->repo = $tagRepo;
    }

 	public function getTags()
 	{
    	$resp = $this->repo->getTags();

		if($resp)
		{
			$data = array('status' => 'success', 'tags' => $resp);
		}
		else
		{
			$data = array('status' => 'error');
		}
		return response()->json($data);		 		
 	}
}
