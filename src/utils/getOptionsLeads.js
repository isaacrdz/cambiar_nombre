import { isAdmin, isGeneralManager, isRockstar, isSuper, isUser } from "./Authroles";
import { getMultiStoresIds } from "./storesUser";

export const getOptions = ({user, page, search, query}) => {
    let options = {
        limit: 10
    };

    if(search){

        if(search.value !== 'all'){
            if(search.type === 'unassigned'){
                options.agent = { exists: false }
            }else{
                options[search.type] = search.value;
            }
        }
    }
    if(page) options.page = page;
    if(query) {
        options.unshift = [
            {
              or: [
                { name: { regex: query, options: 'i' } },
                { email: { regex: query, options: 'i' } },
                { phone: { regex: query, options: 'i' } },
                { rating: { regex: query, options: 'i' } },
                { make_name: { regex: query, options: 'i' } },
                { store_name: { regex: query, options: 'i' } },
                { source_name: { regex: query, options: 'i' } },
                { company_name: { regex: query, options: 'i' } }
              ]
            }
          ]
    }


    if (isAdmin(user.tier._id) || isGeneralManager(user.tier._id)) {
    if (user.stores) {
        options.store = { in: getMultiStoresIds(user.stores) };
    }

    if (
        !isRockstar(user.tier._id) &&
        !isSuper(user.tier._id) &&
        user.carType !== 'ambos'
    ) {
        options.carType = user.carType;
    }
    }

    if( isUser(user.tier._id) ) options.agent = user._id;
    if( isSuper(user.tier._id) ) options.store = { in: getMultiStoresIds(user.group.stores) };

    options.type = 'digital'

    return options;
}
  