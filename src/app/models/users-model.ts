export class UsersModel {
    public Id : number = 0
    public FullName : string = "";
    public Email : string = "";
    public Password : string = "";
    public RoleId : number = 0;
    public CreateDate : string = new Date().toISOString()
}
