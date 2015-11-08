<?php namespace App\Repo;
use App\Models\Race as Race;

class RaceRepo
{

	public function addRace($race)
	{
		if(!empty($race)) {
			$raceExists = $this->raceExists(0, $race);
			if (!$raceExists) {
				$newRace = new Race;
				$newRace->race = $race;
				$newRace->save();
				return true;
			} else {
				return false;
			}
		}
	}

	public function all()
	{
		$races = Race::all();
		if(!empty($races))
			return $races;
		else
			return false;
	}

	public function get($raceId)
	{
		$race = Race::find($raceId);
		if(!empty($race))
		{
			return $race->toArray();
		}
		else
		{
			return false;
		}
	}
	public function delete($raceId)
	{
		Race::find($raceId)->delete();
		return true;
	}

	public function update($id, $race)
	{
		$raceExists =  $this->raceExists($id, $race);
		if($raceExists)
			return false;
		else
		{
			$raceData = Race::find($id);
			$raceData->race = $race;
			$raceData->update();
			return true;
		}
	}

	public function raceExists($id, $race)
	{
		if(empty($id))
		{
			return Race::where('race', $race)->count();
		}
		else
		{
			return Race::where('race', $race)->where('id', '!=', $id)->count();
		}
	}




}