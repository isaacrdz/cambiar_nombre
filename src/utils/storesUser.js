export const getMultiStoresIds = (arr) => {
    let result = [];
    arr.map(item => result.push(item._id))
    return result;
  }

export  const getMultiStoresNames = (arr) => {
    let result = [];
    arr.map(item => result.push(item.make.name + ' ' + item.name))
    return result;
  }

export  const getMultiStoresTwilioNumber = (arr) => {
    let result = [];
    arr.map(item => result.push(item.twilioNumber))
    return result;
  }

export  const getMultiStoresFbPage = (arr) => {
    let result = [];
    arr.map(item => result.push(item.fbPage))
    return result;
  }


export  const getMultiStoresMakesIds = (arr) => {
    let result = [];
    arr.map(item => result.push(item.make._id))
    return result;
  }

export  const getMultiStoresMakesNames = (arr) => {
    let result = [];
    arr.map(item => result.push(item.make.name))
    return result;
  }