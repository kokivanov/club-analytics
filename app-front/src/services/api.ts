import axios, { AxiosError } from "axios";
import { UserEntity } from "./entities/user.entity";
import jwtDecode from "jwt-decode";
import { PaginizedClubInfoEntity } from "./entities/clubsList.entity";
import { ClubStatsEntity } from "./entities/clubStats.entity";

export const NOT_LOGGED_IN = "NOT_LOGGED_IN"
export const INVALID_CREDENTAILS = "INVALID_CREDENTAILS"
export const SERVER_ERROR = "SERVER_ERROR"

type Tokens = {
    token: string,
    rt_token: string
} 

type TokenPayload = {
    exp : number
    iat : number
    sub : number
}

export class APIWrapper {
    is_loggen_in: boolean;
    private token?: string;
    private rt_token?: string;
    private me? : UserEntity;
    username?: string;
    
    constructor (private base_url : string) {
        this.is_loggen_in = false


        const storage_t = localStorage.getItem('token')
        const storage_rt = localStorage.getItem('token_rt')

        if (storage_t && storage_rt)
            this.validateTokens({token: storage_t, rt_token: storage_rt}).then((r) => {
                this.getMe().then((e) => {
                    this.me = e
                })
            }).catch((e) => {
                if (e instanceof Error) {
                    if (e.message !== NOT_LOGGED_IN) throw e
                } throw e
            })

        
        
    }

    async validateTokens(tokens?: Tokens) {
        try {
            const _tokens = tokens? tokens : {token: this.token, rt_token: this.rt_token}

            if ((_tokens.token &&   (_tokens.token !== null    || _tokens.token !== undefined || _tokens.token !== '')) 
            && (_tokens.rt_token && (_tokens.rt_token !== null || _tokens.rt_token !== ''     || _tokens.rt_token !== undefined))) {
                const decoded_token = jwtDecode<TokenPayload>(_tokens.token)
                if (_tokens.rt_token && Date.now() > decoded_token.exp * 1000) {
                    const decoded_rt = jwtDecode<TokenPayload>(_tokens.rt_token)
                    if (Date.now() > decoded_rt.exp * 1000) {
                        throw new Error(NOT_LOGGED_IN)
                    } else {
                        await this.refresh(_tokens.rt_token)
                    }
                } else {

                    this.token = _tokens.token
                    this.rt_token = _tokens.rt_token
                    this.is_loggen_in = true
                    this.me = (await axios({
                        method: 'get',
                        url: this.base_url + '/users/me',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            Authorization: 'Bearer ' + this.token
                        }
                    })).data as UserEntity
                }
            }
            else {
                throw new Error(NOT_LOGGED_IN)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.code === '403' || e.code === '401') throw new Error(INVALID_CREDENTAILS)
                else if (e.code === '500' || e.code === '504') throw new Error(SERVER_ERROR)
                throw e
            }
            throw e
        }

    }
    
    async getMe() {
        try{
            this.validateTokens()

            return (await axios({
                method: 'get',
                url: this.base_url + '/users/me',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: 'Bearer ' + this.token
                }
            })).data as UserEntity
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.code === '403' || e.code === '401') throw new Error(INVALID_CREDENTAILS)
                else if (e.code === '500' || e.code === '504') throw new Error(SERVER_ERROR)
                throw e
            }
            throw e
        }
    }

    async login(email: string, password: string) {
        try{
            const tokens = (await axios({
                method: 'post',
                url: this.base_url + '/auth/login',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    
                },
                data: { email, password }
            })).data as Tokens

            if (tokens.token && tokens.rt_token) {
                this.is_loggen_in = true
                this.token = tokens.token
                this.rt_token = tokens.rt_token
            }

            this.me = (await axios({
                method: 'get',
                url: this.base_url + '/users/me',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization' : 'Bearer ' + this.token
                }
            })).data as UserEntity

            this.username = this.me.username

            localStorage.setItem('token', tokens.token)
            localStorage.setItem('token_rt', tokens.rt_token)

            return this.me
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.code === '403' || e.code === '401') throw new Error(INVALID_CREDENTAILS)
                else if (e.code === '500' || e.code === '504') throw new Error(SERVER_ERROR)
                throw e
            }
            throw e
        }
    }

    async register(email: string, password: string, username : string, ) {
        try{
            await axios({
                method: 'post',
                url: this.base_url + '/auth/regsiter',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                data: { email, password, username }
            })

            return await this.login(email, password)
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.code === '403' || e.code === '401') throw new Error(INVALID_CREDENTAILS)
                else if (e.code === '500' || e.code === '504') throw new Error(SERVER_ERROR)
                throw e
            }
            throw e
        }
    }

    private async refresh(token_rt: string) {
        try{
            const tokens = (await axios({
                method: 'post',
                url: this.base_url + '/auth/refresh',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization' : 'Bearer ' + token_rt
                },
            }) as Tokens)

            if (tokens.token !== '' && tokens.rt_token) {
                this.is_loggen_in = true
                this.token = tokens.token
                this.rt_token = tokens.rt_token
            }
            
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.code === '403' || e.code === '401') throw new Error(INVALID_CREDENTAILS)
                else if (e.code === '500' || e.code === '504') throw new Error(SERVER_ERROR)
                throw e
            }
            throw e
        }
    }

    logout() {
        this.is_loggen_in = false
        this.me = undefined
        this.token = undefined
        this.rt_token = undefined
        localStorage.clear()
    }

    async getClubs() {
        await this.validateTokens()

        return (await axios({
            method: 'get',
            url: this.base_url + '/clubs/all',
            params: {
                page: 1,
                per_page: 10
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + this.token
            }
        })).data as PaginizedClubInfoEntity
    }

    async getClub(club_id: string) {
        await this.validateTokens()

        return (await axios({
            method: 'get',
            url: this.base_url + '/clubs/' + club_id,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + this.token
            }
        })).data as ClubStatsEntity
    }
}