//use vuelidate
Vue.use(window.vuelidate.default)
const { required } = window.validators

new Vue({
  el: '#app',
  data() {
    return {
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

      isSubmitLoading: false,
      isSubmitSuccess: false,
      isSubmitFailed: false,

      pekerjaanList: [
        {
          'id': 1,
          'desc': 'Preventive Maintenance (Receiving, Maintenance, QA, Production, Pre-Delivery, Warehouse)',
          'questions': one
        },
        {
          'id': 2,
          'desc': 'Remove & Install (R&l) (Maintenance, Production, Pre-delivery)',
          'questions': two
        },
        {
          'id': 3,
          'desc': 'Troubleshooting & Repair ( Minor & Major Repair )',
          'questions': three
        },
        {
          'id': 4,
          'desc': 'Loading & Unloading',
          'questions': four
        },
        {
          'id': 5,
          'desc': 'Moving & Parking',
          'questions': five
        },
        {
          'id': 6,
          'desc': 'Fabrication',
          'questions': six
        },
      ]
    }
  },
  validations: {
    pengawasanData: {
      nrp_pengawas: {
        required,
      },
      nama_pengawas: {
        required,
      },
      waktu_pengawasan: {
        required,
      },
      lokasi_kerja: {
        required,
      },
      nama_pekerja: {
        required,
      },
      perusahaan: {
        required,
      },
      uraian_aktivitas: {
        required,
      },
      pekerjaan: {
        required,
      },
    }
  },
  mounted() {
    
  },
  methods: {
    getUserCount() {
      
    },

    handlePekerjaanChange(e) {
      this.pengawasanData.pekerjaan = null
      const selected = this.pekerjaanList.filter(obj => obj.id == e.target.value)
      const clone = selected[0]
      this.pengawasanData.pekerjaan = clone;

      // Cleansing radio button & remarks input
      this.pengawasanData.pekerjaan.questions.map((obj) => {
        obj.answer.map((s) => {
          s.selected = false
        })
        obj.remarks = ''
      })
    },

    radioButtonAnswerChanged(questionIndex, answerIndex) {
      // Cleansing radio button input
      this.pengawasanData.pekerjaan.questions[questionIndex].answer.map((obj) => {
        obj.selected = false
      })
      // Assigning new value
      this.pengawasanData.pekerjaan.questions[questionIndex].answer[answerIndex].selected = true;
    },

    submit() {
      const self = this;

      self.isSubmitLoading = true;

      const url = `https://jsonblob.com/api/jsonBlob/1211538974752759808`;
    
      let getResult = {};
      const xhrGet = new XMLHttpRequest();
      xhrGet.open('GET', url, true);
      xhrGet.setRequestHeader('Content-Type', 'application/json');
      xhrGet.onreadystatechange = function () {
        if (xhrGet.readyState === 4) {
          if (xhrGet.status === 200) {


            console.log('JSON Blob get successfully');
            getResult = JSON.parse(xhrGet.responseText)

            // Append new data to the server
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                self.isSubmitLoading = false;

                if (xhr.status === 200) {
                  self.isSubmitSuccess = true
                  
                  console.log('JSON Blob updated successfully:', xhr.responseText);
                } else {
                  self.isSubmitFailed = true
                  console.error('Failed to update JSON Blob:', xhr.status, xhr.statusText);
                }
              }
            };
            
            getResult.data.push(self.pengawasanData)
            const jsonData = JSON.stringify(getResult);
            xhr.send(jsonData);


          } else {
            self.isSubmitFailed = true
            console.error('Failed to get JSON Blob');
          }
        }
      };

      xhrGet.send();
    },

    printPdf() {

    }
  }
});