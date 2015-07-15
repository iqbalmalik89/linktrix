<?php namespace App\Repo;
use App\Models\Race as Race;

class RaceRepo
{

	public function addRace($race)
	{
		if(!empty($race)) {
			$raceExists = $this->raceExists($race);
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

	public function raceExists($race)
	{
		return Race::where('race', $race)->count();
	}




}