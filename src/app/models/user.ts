export class User {
    toJSON: any;
    constructor(
        public uid: string,
        public name: string,
        public email: string,
        public password: string,
      ) {}
}