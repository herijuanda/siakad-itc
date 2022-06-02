module.exports = function(app) {
    const upload = require('../../helpers/upload');    

    const profil = require('../../controllers/lecturer/dasbor');
    app.get('/instruktur/dasbor', profil.index);

    const jadwal = require('../../controllers/lecturer/jadwal-mengajar');
    app.get('/instruktur/jadwal-mengajar', jadwal.index);

    // KELAS MENGAJAR
    const daftar_nilai_kelas = require('../../controllers/lecturer/kelas-mengajar/daftar-nilai/kelas');
    app.get('/instruktur/kelas-mengajar/daftar-nilai/kelas', daftar_nilai_kelas.index);
    app.post('/instruktur/kelas-mengajar/daftar-nilai/kelas', daftar_nilai_kelas.data);

    const daftar_nilai_siswa = require('../../controllers/lecturer/kelas-mengajar/daftar-nilai/siswa');
    app.get('/instruktur/kelas-mengajar/daftar-nilai/kelas/siswa', daftar_nilai_siswa.index);
    app.post('/instruktur/kelas-mengajar/daftar-nilai/kelas/siswa', daftar_nilai_siswa.data);
    app.post('/instruktur/kelas-mengajar/daftar-nilai/kelas/siswa/update-nilai', daftar_nilai_siswa.update_nilai);

    const modul_pelatihan = require('../../controllers/lecturer/kelas-mengajar/modul-pelatihan');
    app.get('/instruktur/kelas-mengajar/modul-pelatihan', modul_pelatihan.index);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan', modul_pelatihan.data);

    const modul_pelatihan_modul = require('../../controllers/lecturer/kelas-mengajar/modul-pelatihan/modul');
    app.get('/instruktur/kelas-mengajar/modul-pelatihan/modul', modul_pelatihan_modul.index);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul', modul_pelatihan_modul.data);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul/form', modul_pelatihan_modul.form);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul/process', upload('modules').single("file"), modul_pelatihan_modul.process);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/modul/delete', modul_pelatihan_modul.delete);

    const modul_pelatihan_kuis = require('../../controllers/lecturer/kelas-mengajar/modul-pelatihan/kuis');
    app.get('/instruktur/kelas-mengajar/modul-pelatihan/kuis', modul_pelatihan_kuis.index);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis', modul_pelatihan_kuis.data);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis/form', modul_pelatihan_kuis.form);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis/process', upload('modules').single("file"), modul_pelatihan_kuis.process);
    app.post('/instruktur/kelas-mengajar/modul-pelatihan/kuis/delete', modul_pelatihan_kuis.delete);
    
};