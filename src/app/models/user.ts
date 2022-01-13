export class User {
    public id: number;
    public nick: string;
    public name: string;
    public lastName: string;
    public email: string;
    public description: string;
    public password: string;
    public dateBirth: Date;
    public avatar: Blob;
    public role: string;
    public dateJoined: Date;
    public status: Boolean;

    constructor(id: number, nick: string, name: string, lastName: string, email: string, description: string, password: string, dateBirth: Date, avatar: Blob, role: string, dateJoined: Date, status: Boolean) {
        this.id = id;
        this.nick = nick;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.password = password;
        this.dateBirth = dateBirth;
        this.avatar = avatar;
        this.role = role;
        this.dateJoined = dateJoined;
        this.status = status;
    }

    /* GETTERs */
    getId(): number {
        return this.id;
    }

    getNick(): string  {
        return this.nick;
    }

    getName(): string  {
        return this.name;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getDescription(): string {
        return this.description;
    }

    getPassword(): string {
        return this.password;
    }

    getDateBirth(): Date {
        return this.dateBirth;
    }

    getAvatar(): Blob {
        return this.avatar;
    }

    getRole(): string {
        return this.role;
    }

    getDateJoined(): Date {
        return this.dateJoined;
    }

    getStatus(): Boolean {
        return this.status;
    }

    /* SETTERs */
    setId(id: number): void {
        this.id = id;
    }

    setNick(nick: string): void {
        this.nick = nick;
    }

    setName(name: string): void {
        this.name = name;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setDateBirth(dateBirth: Date): void {
        this.dateBirth = dateBirth;
    }

    setAvatar(avatar: Blob): void {
        this.avatar = avatar;
    }

    setRole(role: string): void {
        this.role = role;
    }

    setDateJoined(dateJoined: Date): void {
        this.dateJoined = dateJoined;
    }

    setStatus(status: Boolean): void {
        this.status = status;
    }

    /* METHODs */
}