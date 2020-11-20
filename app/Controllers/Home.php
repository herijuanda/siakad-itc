<?php namespace App\Controllers;

use App\Models\UserModel;

class Home extends BaseController
{
	// public function __construct()
    // {
    //     parent::__construct();
    //     $this->load->model("LoginModel");
    //     $this->load->library('form_validation');
    // }
	public function index()
	{
		$data = [
			'title' => 'SIAKAD ITC',
		];
		return view('home', $data);
	}

	public function login()
    {
        // jika form login disubmit
        if($this->input->post()){
            if($this->LoginModel->doLogin() == "1") redirect(site_url('user'));
        }

        // tampilkan halaman login
        $this->load->view("home.php");
	}
	
	public function logout()
    {
        // hancurkan semua sesi
        $this->session->sess_destroy();
        redirect(site_url('home'));
    }

	//--------------------------------------------------------------------

}