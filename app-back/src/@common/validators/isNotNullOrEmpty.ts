export function isNotNullorEmpty(...a: string[]){
    let res = false
    a.forEach((v) => {
        if (typeof v != 'undefined' && v && v != '') res = res || true
    })
    return res
}