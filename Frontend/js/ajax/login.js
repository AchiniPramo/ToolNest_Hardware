$(document).ready(function () {
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        $.ajax({
            url: 'http://localhost:8080/api/v1/auth/authenticate',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({email, password}),
            success: function (data) {
                if (data.code === 200) {
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('role', data.data.role);

                    if (data.data.role === 'ADMIN') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    $('#errorMessage').text(data.message || 'Login failed');
                }
            },
            error: function () {
                $('#errorMessage').text('An error occurred. Please try again.');
            }
        });
    });
});
