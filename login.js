// 1. collect the data

/******************** REGISTER PART *********************/

/******************** 1. way to collet the data *********************/

// function Register() {

//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const username = document.getElementById('username').value;
//     const mobile = document.getElementById('mobile').value;
//     const description = document.getElementById('description').value;

// }

/**************** 2. way to collet the data *********************/

function getInputValue(id) {

    let value = document.getElementById(id).value;
    return value;
}

async function Register() {

    const name = getInputValue('name');
    const email = getInputValue('email');
    const password = getInputValue('password');
    const username = getInputValue('username');
    const mobile = getInputValue('mobile');
    const description = getInputValue('description');

    let user_data = new User(name, email, password, username, mobile, description);

    console.log('user_data:', user_data);

    /*** Sending the data to Masai Api Server ***/

    // Post request in FETCH

    try {

        const register_url = `https://masai-api-mocker.herokuapp.com/auth/register`;

        let res = await fetch(register_url, {

            method: 'POST',

            body: JSON.stringify(user_data),

            headers: {
                'Content-Type': 'application/json',
            },
        });

        let data = await res.json();

        console.log('data:', data);

    } catch {
        alert("Please fill all the details");
    }

}

function User(n, e, p, u, m, d) {

    this.name = n;
    this.email = e;
    this.password = p;
    this.username = u;
    this.mobile = m;
    this.description = d;
}

/******************** Login Part *********************/

async function Login() {

    let login_data = {

        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value,
    }

    try {

        const login_url = `https://masai-api-mocker.herokuapp.com/auth/login`;

        let res = await fetch(login_url, {

            method: 'POST',

            body: JSON.stringify(login_data),

            headers: {
                'Content-Type': 'application/json',
            },
        });

        let data = await res.json();
        console.log('data:', data);

        document.location.href = "index.html";

    } catch {
        alert("Please Check Your Username & Password");
    }

    // get token 

    let token = data.token;
    getProfile(login_data.username, token);
}

/******************** Get Information *********************/

async function getProfile(username, token) {

    let api = `https://masai-api-mocker.herokuapp.com/user/${username}`;

    let res = await fetch(api, {

        headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
        },
    });

    let data = await res.json();
    console.log('data:', data);

}