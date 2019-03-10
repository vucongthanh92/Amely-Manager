$(document).ready(function () {
    $('#table').DataTable( {
        "columnDefs": [
            { "orderable": false, "targets": 0 }
          ]
          });
})