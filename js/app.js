$(document).ready(function (){
	function generateSuccess(template){
		return '<li>' +
			'<a href="javascript:;" class="preview" id="preview" data-id="' + template.id + '">Email ' +
				template.id + ': ' + template.name +
			'</a>' +
			'<span style="margin-left:3em"><button type="button" class="btn btn-danger btn-sm delete" data-id="' + template.id + '">Delete</button></span><br>' +
		'</li>';
	}

	//select data
	axios.get('http://localhost/mail-backend/public/document', {
			'headers':{
				'Content-Type': 'application/json'
			}
		})
		.then(function (response) {
			$.each(response.data, function(k, v){
				$('#maillist').append(generateSuccess(v));
			});
		})
		.catch(function (error) {
			console.log(error);
		});

	$('.preview').show();
	$('.content').hide();

	$('#inbox').on('click', function (e){
		e.preventDefault();

		$('.preview').show();
		$('.content').hide();

		$("input[id='id']").attr('type','hidden').prop('disabled',true).val('');
		$("input[id='name']").val('');
		$("textarea[id='description']").val('');
		$("select[id='category_id']").val('');
		$("input[id='status']").val('');
		$('.form').show();
	})

	//select data berdasarkan id
	$(document).on('click', '#preview', function (e){
		e.preventDefault();

		$('.preview').hide();

		axios.get('http://localhost/mail-backend/public/detail?id=' + $(this).data('id'), {
				'headers':{
					'Content-Type': 'application/json'
				}
			})
			.then(function (response) {
				// $('.content').html(response.data.description).show();
				$("input[id='id']").removeAttr('hidden').prop('disabled',false).val(response.data.id);
				$("input[id='name']").val(response.data.name);
				$("textarea[id='description']").val(response.data.description);
				$("select[id='category_id']").val(response.data.category_id);
				$("input[id='status']").val(response.data.status);
				$('#form').show();
				console.log(response.data);
			})
			.catch(function (error) {
				// console.log(error);
			});

		// axios.get('template/content.html')
		// 	.then(function (response) {
		// 		$('.content').html(response.data).show();
		// 		console.log(response.data);
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});

		// tidak bisa menggunakan ajax jquery untuk kasus seperti di atas
		// $.ajax({
		// 	method: "get",
		// 	url: "template/content.html",
		// 	async: "false",
		// 	success: function( result ) {
		// 		$('.content').html(result).show();
		// 		console.log(result);
		// 	}
		// });
	})


	//menampilkan form untuk create data
	$('#compose').on('click', function(e){
		e.preventDefault();

		$('.preview').hide();
		$('.content').hide();
		$('#form').show();
	})

	//insert data
	$(document).on('submit', '.form', function(e){
		e.preventDefault();

		var id = $('#id').val();
		var name = $('#name').val();
		var description = $('#description').val();
		var status = $('#status').val();
		var category_id = $('#category_id').val();

		axios.post('http://localhost/mail-backend/public/document-store', 
			{
				'headers':{
					'Content-Type': 'application/json'
				},
				id: id,
				name: name,
				description: description,
				status: status,
				category_id: category_id
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		$('form').hide();
		document.location.reload(true);
		$('.preview').show();
	})

	//delete data
	$(document).on('click', '.delete', function(e){
		e.preventDefault();

		axios.delete('http://localhost/mail-backend/public/document-delete?id=' + $(this).data('id'),
			{
				'headers':{
					'Content-Type': 'application/json'
				},
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		document.location.reload(true);
		$('.preview').show();
	})
})