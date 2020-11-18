<?php namespace App\Controllers;

use App\Models\UserModel;

class NoSidebar extends BaseController
{
	public function index()
	{
		$model = new UserModel();
		//$username = 'bxt1';
		$user = $model->findAll();
		$data = [
			'title' => 'Edit Profile',
			'user' => $user
		];

		return view('user-no-sidebar', $data);
	}

	//--------------------------------------------------------------------

}