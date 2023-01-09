import Swal from 'sweetalert2'

export const alertMessage = () =>
	Swal.fire(
		'Concluído',
		'Crimes copiados',
		'success'
	)