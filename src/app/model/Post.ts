import { Companies } from "./Companies";
import { Position } from "./Position";

export class Post {
    id: number = 0;
    companyId!: number;
    positionId!:number;
    isAvailble!:boolean;
    city!:string;
    salary!:number;
    date!:Date;
    isConfirmed!:boolean;
    // Company
    // Position
    jobTitle!:string;
    jobDescription!:string;
   
//    public string JobTitle { get; set; } = string.Empty;
//    public string JobDescription { get; set; } = string.Empty;
    requests?:Request[];
     maxCadidated!:number 
}
