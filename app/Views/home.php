<?= $this->extend('layout/template_guest', $data['title']) ?>

<?= $this->section('content') ?>
<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4" center>
                <div class="card card-user">
                    <div class="card-image">
                        <img src="/assets/img/logo.jpg" alt="...">
                    </div>
                    <div class="card-body">
                        <form id="login" method="post" action="<?= site_url('home/login') ?>">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" name="user" id="user" class="form-control" placeholder="ID Pengguna">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="password" name="password" id="password" class="form-control"
                                        placeholder="Kata Sandi">
                                </div>
                            </div>
                            <input type="button" name="btnLogin" id="btnLogin" class="btn btn-login " value="MASUK">
                        </form>
                        <div class="clearfix"></div>
                        <label><a class="a-red" href="###">Lupa
                                kata sandi?</a></label>
                    </div>
                    <hr>
                    <div class="button-container mr-auto ml-auto">
                        <a href="https://www.facebook.com/KampusITCAceh/" target="_blank">
                            <button class="btn btn-simple btn-link btn-icon">
                                <i class="fa fa-facebook-square"></i>
                            </button>
                        </a>
                        <a href="https://www.youtube.com/channel/UCeKfhfKp-2UmoVrPk6wMozA/about" target="_blank">
                            <button class="btn btn-simple btn-link btn-icon">
                                <i class="fa fa-youtube"></i>
                            </button>
                        </a>
                        <a href="https://www.instagram.com/kampusitc_aceh/" target="_blank">
                            <button class="btn btn-simple btn-link btn-icon">
                                <i class="fa fa-instagram"></i>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?= $this->endSection() ?>