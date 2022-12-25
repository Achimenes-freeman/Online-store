export default function formatTotalCount(totalPrice:number | undefined):number | string {
    let res: string | number;
    if(totalPrice) {
        res = totalPrice;
        if(totalPrice >= 1000) {
            res = `${Math.round(totalPrice / 100) / 10}K`
        }
        if(totalPrice >= 1000000) {
            res = `${Math.round(totalPrice / 10000) / 100}M`;
        }
    } else res = 0;

    return res;
}