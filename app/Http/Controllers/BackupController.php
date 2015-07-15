<?php namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Repo\BackupRepo as BackupRepo;

class BackupController extends BaseController
{
	public $repo;
    function __construct(BackupRepo $backupRepo) {
       $this->repo = $backupRepo;
    }

	public function getBackups()
	{
		$limit = \Request::input('limit');

		$resp = $this->repo->getBackups($limit);

		if($resp)
		{
			return response()->json($resp);
		}
		else
		{
			return response()->json(array('data' => array()));
		}
	}


    public function createSQLDump()
    {
		$resp = $this->repo->createSQLDump();
		if($resp)
		{
			return response()->json(array('status' => 'success', 'message' => 'Backup created successfuly.'));
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'There is some error to create the backup'));
		}			
    }

    public function backupDownload()
    {
    	$backupPath = \Utility::getRoot('backup').\Request::input('file');
    	if(file_exists($backupPath))
		{
	   		return response()->download($backupPath);			
		}
	   	else
	   		echo 'File not found';
    }

    public function changeStatus()
    {
		$id = \Request::input('id');
		$status = \Request::input('status');
		if($status)
			$msg = 'Backup removed from archived';
		else	
			$msg = 'Backup marked as archived.';

		$resp = $this->repo->changeStatus($id, $status);
		if($resp)
		{
			return response()->json(array('status' => 'success', 'message' => $msg));
		}
		else
		{
			return response()->json(array('status' => 'error', 'message' => 'There is some error to change the backup status'));
		}
    }

}
