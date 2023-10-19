export const calculateBill = (config = {
    cost: [],
    levels: []
}, kwh, lvl =  0, invoice = 0) => {
    const {levels, cost} = config;
    if(kwh === 0) return invoice;
    if(kwh - levels[lvl] >= 0){
        invoice += levels[lvl] * cost[lvl];
        kwh -= levels[lvl];
        if(levels.length > lvl+1){
            lvl++;
        }
    }
    else{
        invoice += kwh * cost[lvl];
        kwh = 0;
    }

    return calculateBill(config, kwh, lvl, invoice);
}