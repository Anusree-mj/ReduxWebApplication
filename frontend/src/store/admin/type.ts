export interface AdminItem {
    id:string;
    email: string;
    name: string;    
}
export interface UsersItem {
    _id: string;
    email: string;
    name: string;
    image: string;
    isBlocked: boolean
}