//use vuelidate
Vue.use(window.vuelidate.default)
const { required } = window.validators

new Vue({
  el: '#app',
  data() {
    return {
      index: 0,
      pengawasanData: {
        nrp_pengawas: '',
        nama_pengawas: '',
        waktu_pengawasan: '',
        lokasi_kerja: '',
        nama_pekerja: '',
        perusahaan: '',
        uraian_aktivitas: '',
        pekerjaan: null
      },
    }
  },
  validations: {
    
  },
  mounted() {
    
  },
  methods: {
    submit() {
      const self = this;

      const url = '/assets/js/437.json';
    
      let getResult = {};
      const xhrGet = new XMLHttpRequest();
      xhrGet.open('GET', url, true);
      xhrGet.setRequestHeader('Content-Type', 'application/json');
      xhrGet.onreadystatechange = function () {
        if (xhrGet.readyState === 4) {
          if (xhrGet.status === 200) {
            self.pengawasanData = JSON.parse(xhrGet.responseText).data[self.index]
          } else {
            self.isSubmitFailed = true
            console.error('Failed to get JSON Blob');
          }
        }
      };

      xhrGet.send();
    },
  }
});