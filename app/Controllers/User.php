<?php namespace App\Controllers;

use App\Models\UserModel;

class User extends BaseController
{
	// public function __construct()
    // {
	// 	parent::__construct();
	// 	$this->load->model("LoginModel");
	// 	if($this->user_model->isNotLogin()) redirect(site_url('login'));
	// }
	public function index()
	{
		$model = new UserModel();
		//$username = 'bxt1';
		$user = $model->findAll();
		$data = [
			'title' => 'Edit Profile',
			'user' => $user
		];

		return view('user', $data);
	}

	//--------------------------------------------------------------------

}