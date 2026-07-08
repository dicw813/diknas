// URL Web App Google Apps Script terbaru Anda
const scriptURL = 'https://google.com';

function kirimFormulirKeSheets() {
    // 1. Ambil data dari elemen input HTML berdasarkan ID masing-masing
    const nama = document.getElementById('nama').value.trim();
    const nisn = document.getElementById('nisn').value.trim();
    const gender = document.getElementById('gender').value;
    const jalur = document.getElementById('jalur').value;
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const setuju = document.getElementById('setuju').checked;
    const submitBtn = document.getElementById('submit-btn');

    // 2. Validasi Isian Kosong
    if (!nama || !nisn || !whatsapp) {
        alert('❌ Mohon lengkapi semua kolom data yang tersedia!');
        return;
    }

    // 3. Validasi Panjang Angka NISN (Wajib 10 Digit)
    if (nisn.length !== 10) {
        alert('❌ NISN harus berjumlah tepat 10 digit angka!');
        return;
    }

    // 4. Validasi Centang Kotak Persetujuan
    if (!setuju) {
        alert('❌ Anda harus mencentang persetujuan kebenaran data untuk melanjutkan.');
        return;
    }

    // 5. Ubah Tombol Menjadi Status Memuat (Loading State)
    submitBtn.disabled = true;
    submitBtn.innerText = '⏳ Sedang Mengirim Data...';

    // 6. Menyusun Objek Data dalam Format JSON
    const dataPendaftar = {
        nama: nama,
        nisn: nisn,
        gender: gender,
        jalur: jalur,
        whatsapp: whatsapp
    };

    // 7. Mengirimkan Data ke Google Sheets Melalui Fetch API
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Mode khusus untuk menghindari kendala kebijakan CORS Google
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPendaftar)
    })
    .then(() => {
        // Notifikasi sukses ketika pengiriman data selesai tanpa kendala jaringan
        alert('🎉 Selamat! Data pendaftaran awal PPDB Anda berhasil tersimpan di sistem.');
        document.getElementById('ppdb-form').reset(); // Mengosongkan kembali seluruh isi form
    })
    .catch(error => {
        console.error('Error pengiriman formulir:', error.message);
        alert('❌ Gagal mengirim data. Silakan periksa koneksi internet Anda atau muat ulang halaman.');
    })
    .finally(() => {
        // 8. Mengembalikan Tombol ke Status Normal Setelah Selesai Proses
        submitBtn.disabled = false;
        submitBtn.innerText = 'Kirim Formulir Sekarang';
    });
}
