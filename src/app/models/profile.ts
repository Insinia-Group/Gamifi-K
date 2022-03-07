export class tempUser {
    public id: number;
    public nick: string;
    public name: string;
    public lastName: string;

    constructor(id: number, nick: string, name: string, lastName: string) {
        this.id = id;
        this.nick = nick;
        this.name = name;
        this.lastName = lastName;
    }

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
}

export class tempProfile extends tempUser {
    public email: string;
    public description: string;
    public dateBirth: Date;
    public avatar: Blob;
    public role: string;
    public dateJoined: Date;
    public status: Boolean;

    constructor(id: number, nick: string, name: string, lastName: string, email: string, description: string, dateBirth: Date, avatar: Blob, role: string, dateJoined: Date, status: Boolean) {
        super(id, nick, name, lastName);
        this.email = email;
        this.description = description;
        this.dateBirth = dateBirth;
        this.avatar = avatar;
        this.role = role;
        this.dateJoined = dateJoined;
        this.status = status;
    }

    getEmail(): string {
        return this.email;
    }

    getDescription(): string {
        return this.description;
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

    setEmail(email: string): void {
        this.email = email;
    }

    setDescription(description: string): void {
        this.description = description;
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
}