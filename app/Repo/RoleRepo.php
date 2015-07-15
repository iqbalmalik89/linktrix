<?php namespace App\Repo;
use App\Models\Role as Role;
class RoleRepo
{
	public function get($id)
	{
		$role = Role::find($id);
		if(!empty($role))
		{
			return $role->toArray();
		}
		else
		{
			return false;
		}
	}

}