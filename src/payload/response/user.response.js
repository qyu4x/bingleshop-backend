class UserResponse {
    id;
    username;
    email;
    full_name;


    constructor(id, username, email, full_name) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.full_name = full_name;
    }
}

module.exports = {
    UserResponse
}