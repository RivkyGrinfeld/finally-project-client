export interface CandidateView {

    custId: string
    fullName: string
    cvUrl?:string 
    fileName?:string
    testScore: number
    matchScore: number
    aiScore: number
    finalScore: number

    confirmed: boolean

}

