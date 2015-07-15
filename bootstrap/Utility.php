<?php
Use App\Models\Race as Race;
class Utility
{

    public static function getRoot($path)
    {
    	return storage_path().DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.$path.DIRECTORY_SEPARATOR;
    }

    public static function getUrl($path)
    {
    	return env('STORAGE_URL').$path.'/';
    }    

    public static function validatorFailedRep($messageRep)
    {
		$msgs = '';
		$messages = $messageRep;
		if(count($messages->all()) > 0)
		{
			foreach ($messages->all() as $message) {
			    $msgs .= $message.'<br>';
			}			
		}

		return $msgs;
    }    

    public static function getNationality()
    {
        $arr = explode(',', 'Singaporean,Afghan,Albanian,Algerian,American,Andorran,Angolan,Antiguans,Argentinean,Armenian,Australian,Austrian,Azerbaijani,Bahamian,Bahraini,Bangladeshi,Barbadian,Barbudans,Batswana,Belarusian,Belgian,Belizean,Beninese,Bhutanese,Bolivian,Bosnian,Brazilian,British,Bruneian,Bulgarian,Burkinabe,Burmese,Burundian,Cambodian,Cameroonian,Canadian,Cape Verdean,Central African,Chadian,Chilean,Chinese,Colombian,Comoran,Congolese,Costa Rican,Croatian,Cuban,Cypriot,Czech,Danish,Djibouti,Dominican,Dutch,East Timorese,Ecuadorean,Egyptian,Emirian,Equatorial Guinean,Eritrean,Estonian,Ethiopian,Fijian,Filipino,Finnish,French,Gabonese,Gambian,Georgian,German,Ghanaian,Greek,Grenadian,Guatemalan,Guinea-Bissauan,Guinean,Guyanese,Haitian,Herzegovinian,Honduran,Hungarian,Icelander,Indian,Indonesian,Iranian,Iraqi,Irish,Israeli,Italian,Ivorian,Jamaican,Japanese,Jordanian,Kazakhstani,Kenyan,Kittian and Nevisian,Kuwaiti,Kyrgyz,Laotian,Latvian,Lebanese,Liberian,Libyan,Liechtensteiner,Lithuanian,Luxembourger,Macedonian,Malagasy,Malawian,Malaysian,Maldivan,Malian,Maltese,Marshallese,Mauritanian,Mauritian,Mexican,Micronesian,Moldovan,Monacan,Mongolian,Moroccan,Mosotho,Motswana,Mozambican,Namibian,Nauruan,Nepalese,Netherlander,New Zealander,Ni-Vanuatu,Nicaraguan,Nigerian,Nigerien,North Korean,Northern Irish,Norwegian,Omani,Pakistani,Palauan,Panamanian,Papua New Guinean,Paraguayan,Peruvian,Polish,Portuguese,Qatari,Romanian,Russian,Rwandan,Saint Lucian,Salvadoran,Samoan,San Marinese,Sao Tomean,Saudi,Scottish,Senegalese,Serbian,Seychellois,Sierra Leonean,Slovakian,Slovenian,Solomon Islander,Somali,South African,South Korean,Spanish,Sri Lankan,Sudanese,Surinamer,Swazi,Swedish,Swiss,Syrian,Taiwanese,Tajik,Tanzanian,Thai,Togolese,Tongan,Trinidadian or Tobagonian,Tunisian,Turkish,Tuvaluan,Ugandan,Ukrainian,Uruguayan,Uzbekistani,Venezuelan,Vietnamese,Welsh,Yemenite,Zambian,Zimbabwean');
        return $arr;
    }

    public static function getReligions()
    {
        $arr = explode(',', 'African Traditional & Diasporic,Agnostic,Atheist,Baha\'i,Buddhism,Cao Dai,Chinese traditional religion,Christianity,Hinduism,Islam,Jainism,Juche,Judaism,Neo-Paganism,Nonreligious,Rastafarianism,Secular,Shinto,Sikhism,Spiritism,Tenrikyo,Unitarian-Universalism,Zoroastrianism,primal-indigenous,Other');
        return $arr;
    }

    public static function getRace()
    {
        $races = array();
        $dbRaces = Race::get();
        if(!empty($dbRaces))
        {
            foreach ($dbRaces as $key => $raceRec) {
                $races[]  =$raceRec->race;
            }
        }
        
        $races[] = 'Other';
        return $races;
    }

    public static function paginator($data, $paginate)
    {
        $data['pagination'] = array();
        
        // calculate next record
        if ($paginate->currentPage() < $paginate->lastPage()){
            $next = $paginate->currentPage()+1;
        } else {
            $next = null;
        }

        // calculate previous record
        if ($paginate->currentPage() > 1) {
            $previous = $paginate->currentPage()-1;
        } else {
            $previous = 1;
        }

        $data['pagination']['next']  = $next;
        $data['pagination']['previous'] = $previous;
        $data['pagination']['current']  = $paginate->currentPage();
        $data['pagination']['first']  = 1;
        $data['pagination']['last']  = $paginate->lastPage();
//        $data['pagination']['to']   = $paginate->getTo();
 //       $data['pagination']['from']  = $paginate->getFrom();
        $data['pagination']['total']  = $paginate->total();

        // return data and 200 response
        return $data;
    }

    public static function encrypt( $text )
    {
        // add end of text delimiter
        return base64_encode($text);
    }

    public static function decrypt($text)
    {
        return base64_decode($text);
    }
}
