<?php namespace App\Repo;
use App\Models\Backup as Backup;
use Phelium\Component\MySQLBackup;
//use Ifsnop\Mysqldump as IMysqldump;

class BackupRepo
{

	public function getBackups($limit)
	{
    	$data = array();
		$backups = Backup::where('status' , '1');
		if(!empty($backups))
		{
	    	$backups = $backups->orderBy('date_created', 'desc');

	    	if(!empty($limit)){
		    	$backups = $backups->paginate($limit);
	    	}
			else {
				$users = $backups->get();
			}

			foreach ($backups as $backup) {
	            $data['data'][] = $this->get($backup->id);
	        }

	        if(!empty($limit)){
		       	$data = \Utility::paginator($data, $backups);
	        }
		}
       	return $data ;		
	}

	public function get($id)
	{
		$userRepo = new UserRepo(new RoleRepo);
		$backup = Backup::find($id);
		if(!empty($backup))
		{
			$user = $userRepo->get($backup->created_by);
			if(!empty($user))
			{
				$backup->created_by_name = $user['name'];
			}
			else
			{
				$backup->created_by_name = '';				
			}

			return $backup;
		}
		else
		{
			return false;
		}
	}

	public function createSQLDump()
	{
		$dateCreated = date('Y-m-d H:i:s');
		$userData = \Session::get('user');
		$createdBy = $userData['id'];
		$backupFile = 'Backup-'.time();
		// try {
		//     $dump = new IMysqldump\Mysqldump(env('DB_DATABASE'), env('DB_USERNAME'), env('DB_PASSWORD'));
		//     $dump->start(\Utility::getRoot('backup').$backupFile);
		// } catch (\Exception $e) {
		//     echo 'mysqldump-php error: ' . $e->getMessage();
		// 	return false;
		// }

		$Dump = new MySQLBackup('localhost', env('DB_USERNAME'), env('DB_PASSWORD'), env('DB_DATABASE'));		

		$Dump->addTables(array());
		$Dump->setFilename(\Utility::getRoot('backup').$backupFile);
		$Dump->setDelete(false);
		$Dump->setDownload(false);
		$Dump->dump();


		$id = $this->insert($backupFile, $createdBy, $dateCreated,1);

		return true;
	}


	public function insert($path, $createdBy, $dateCreated,$status)
	{
		$backup = new Backup();
		$backup->path = $path.'.sql';
		$backup->created_by = $createdBy;
		$backup->date_created = $dateCreated;
		$backup->status = $status;		
		$backup->save();
		return $backup->id;
	}

	public function changeStatus($id, $status)
	{
		$backup = Backup::find($id);
		if(!empty($backup))
		{
			$backup->status = $status;
			$backup->update();
			return true;
		}
		else
		{
			return false;
		}
	}
}