function selectInit() {
    $("[data-js='select']").select2({
		placeholder: "Фильтр",
		allowClear: true
	});
	$("[data-js='formSelect']").select2({
		placeholder: "Высшее",
		allowClear: true
	});



	$("[data-js='formSelect']").on('select2:open', () => {
		$(".select2-dropdown").addClass("select2-dropdown--form")
	})
}
