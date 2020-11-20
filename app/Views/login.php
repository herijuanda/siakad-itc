<?= $this->extend('layout/template_guest', $data['title']) ?>

<?= $this->section('content') ?>
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4" center>
                <div class="card card-user">
                    <div class="card-image">
                    <img src="<?php echo site_url('Images/logo.jpg'); ?>" 
                            alt="...">
                    </div>
                    <div class="card-body">
                        <form id="login" method="get" action="">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" name="email" id="email" class="form-control" placeholder="Email">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" name="password" id="password" class="form-control"
                                        placeholder="Password">
                                </div>
                            </div>
                            <input type="button" name="btnLogin" id="btnLogin" class="btn btn-info btn-fill "
                                value="LOGIN">
                            <div class="clearfix"></div>
                            <label><a href="#">Forgot password?</a></label>
                    </div>
                    <hr>
                    <div class="button-container mr-auto ml-auto">
                        <button href="https://www.facebook.com/KampusITCAceh/" class="btn btn-simple btn-link btn-icon">
                            <i class="fa fa-facebook-square"></i>
                        </button>
                        <button href="https://www.youtube.com/channel/UCeKfhfKp-2UmoVrPk6wMozA/about" class="btn btn-simple btn-link btn-icon">
                            <i class="fa fa-youtube"></i>
                        </button>
                        <button href="https://www.instagram.com/kampusitc_aceh/" class="btn btn-simple btn-link btn-icon">
                            <i class="fa fa-instagram"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?= $this->endSection() ?>