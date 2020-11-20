<?php namespace App\Controllers;

use App\Models\UserModel;

class Login extends BaseController
{
	public function index()
	{
		$model = new UserModel();
		$user = $model->findAll();
		$data = [
			'title' => 'SIAKAD ITC',
			'user' => $user
		];

		return view('login', $data);
	}

	//--------------------------------------------------------------------

}