export interface ICustomer {
    name: String;
    username: String;
    email: String;
    karma: Number;
    handles: {
        github: String;
        codechef: String;
        codeforces: String;
    };
    scores: {
        github: Number;
        codechef: Number;
        codeforces: Number;
    };
}
