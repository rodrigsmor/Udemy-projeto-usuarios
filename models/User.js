class User {
    constructor(name, gender, birth, country, email, password, photo, admin) {
        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get birth() {
        return this._birth;
    }

    get country() {
        return this._country;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get photo() {
        return this._photo;
    }

    set photo(value) {
        return this._photo = value;
    }

    get admin() {
        return this._admin
    }

    get register() {
        return this._register;
    }

    loadFromJSON(json) {
        for(let name in json) {
            switch(name) {
                case '_register': 
                    this[name] = new Date(json[name]);
                break;

                default: 
                    this[name] = json[name];
                break;
            }
        }
    }

    
    static getUsersStorage() {
        let users = new Array();
        
        if(localStorage.getItem('users@hcode')) {
            users = JSON.parse(localStorage.getItem('users@hcode'));
        }
        
        return users;
    }
    
    getNewID() {
        let usersID = parseInt(localStorage.getItem('usersID@hcode'));

        if(!usersID > 0) usersID = 0;

        usersID++;

        localStorage.setItem('usersID@hcode', usersID);

        return usersID;
    }

    save() {
        let users = User.getUsersStorage();
    
        if(this.id > 0) {
            users.map(user => {
                if(user._id == this.id) {
                    Object.assign(user, this);
                }
                    
                return user;
            });
        } else {
            this._id = this.getNewID()

            users.push(this);
        }

        localStorage.setItem('users@hcode', JSON.stringify(users));
    }

    remove() {
        let users = User.getUsersStorage();

        users.forEach((userData, index) => {
            if(this._id == userData._id) {
                users.splice(index, 1);
            }
        });

        localStorage.setItem('users@hcode', JSON.stringify(users));
    }
}