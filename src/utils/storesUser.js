import _ from 'lodash';


export const getMultiRolesIds = (arr) => {
  let result = [];
  arr.map(item => result.push(item._id))
  return result;
}

export const getMultiRolesNames = (arr) => {
  let result = [];
  arr.map(item => result.push(item.name))
  return result;
}

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

export const getGroupsIds = (arr) => {
  let result = [];
  arr.map(item => result.push(item._id))
  return result;
}
 
export const getMultiMakesIds = (arr) => {
  let result = [];
  arr.map(item => result.push(item._id))
  return result;
}

export  const getMultiStoresMakesIds = (arr) => {
    let result = [];
    arr.map(item => result.push(item.make._id))

    if(result.includes("5f88806abcf8300017beec5a")){
      result.push("5d713995b721c3bb38c1f5d3");
      result.push("5f88804dbcf8300017beec56");
      result.push("5f888058bcf8300017beec57");
      result.push("5f887fe6bcf8300017beec52");
    }
    return result;
  }

export  const getMultiStoresMakesNames = (arr) => {
    let result = [];
    arr.map(item => result.push(item.make.name))
    return result;
  }


export  const getMakesUser = (arr) => {
  let result = [];
  arr.map(item => result.push(item.make))
  
  return _.uniqBy(result, '_id');
}

export const getStoresByMake = (stores, makeId) => {

  let result = [];
  stores.map(item => {
    if(item.make && item.make._id === makeId){
      result.push(item)
    }
    return false;
  })

  return result;
}

export const getStoresByMakeIds = (stores, makeId) => {

  let result = [];
  stores.map(item => {
    if(item.make && item.make._id === makeId){
      result.push(item._id)
    }
    return false;
  })

  if(result.length <= 0){
    result = "60f5890cf852df12c8d10591"
  }

  return result;
}

export const getStoresByMakeNames = (stores, makeId) => {

  let result = [];
  stores.map(item => {
    if(item.make && item.make._id === makeId){
      result.push(item.make.name + ' ' + item.name)
    }
    return false;
  })

  return result;
}

export const getUserStoresByMake = (stores, makeId) => {

    let result = [];
    stores.map(item => {
      if(item.make && item.make._id === makeId){
        result.push(item._id)
      }
      return false;
    })

    return result;
}

export const getMakesChrysler = (make) => {

  if(make === "5f88806abcf8300017beec5a"){
    return [
      "5f88806abcf8300017beec5a",
      "5d713995b721c3bb38c1f5d3",
      "5f88804dbcf8300017beec56",
      "5f888058bcf8300017beec57",
      "5f887fe6bcf8300017beec52",
    ]
  }else{
    return [make]
  }
  
}