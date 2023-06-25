import { Type } from "class-transformer"

class weeklyStats {
    'Понеділок': number
    'Вівторок': number
    'Середа': number
    'Четвер': number
    "П'ятниця": number
    'Субота': number
    'Неділя': number
    
    constructor(o : Partial<weeklyStats>) {
        Object.assign(this, o)
    }
}

class ageStats {
    '12-17' : number
    '18-24' : number
    '25-31' : number
    '32-37' : number
    '38-45' : number
    '46-55' : number
    '56-70' : number
    '70+' : number

    constructor(o : Partial<ageStats>) {
        Object.assign(this, o)
    }
}

export class ClubStatsEntity {
    name: string
    @Type(() => weeklyStats)
    weekStats: weeklyStats
    @Type(() => ageStats)
    byAge: ageStats
    trainingTimeMean: number
    trainingAmountMean: number
    timeMean: number
    withTutor: number

    constructor(o : Partial<ClubStatsEntity>) {
        Object.assign(this, o)
    }
}