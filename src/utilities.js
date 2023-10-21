
// const Cost = [0.26, 0.32, 0.37];
// const Levels = [400, 600, 999999];
// calculateBill({cost: Cost, levels:Levels},2000,0,0)

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