<?php namespace App\Repo;
use App\Models\Tag as Tag;

class TagRepo
{

	public function getTags()
	{
		$tags = [];
		$dbTags = Tag::get()->toArray();
		if(!empty($dbTags))
		{
			foreach ($dbTags as $key => $tag) {
				$tags[] = $tag['tag'];
			}
		}

		return $tags;
	}

	public function addTags($tags)
	{
		if(!empty($tags)) {
			foreach ($tags as $key => $tag) {
				$tagExists = $this->tagExists($tag);
				if (!$tagExists) {
					$newTag = new Tag;
					$newTag->tag = $tag;
					$newTag->save();
				} else {

				}
			}	
		} else {
			return false;
		}

	}

	public function tagExists($tag)
	{
		return Tag::where('tag', $tag)->count();
	}
	
}