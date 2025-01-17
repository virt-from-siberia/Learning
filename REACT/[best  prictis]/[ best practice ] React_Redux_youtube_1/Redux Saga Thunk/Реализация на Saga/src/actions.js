export const PUT_DATA = "PUT_DATA";
export const LOAD_DATA = "LOAD_DATA";

//иньекция данных в state
export const putData = (dataFromServer) => {
    return {
        type: PUT_DATA,
        payload: dataFromServer,
    };
};

export const loadData = () => {
    return {
        type: LOAD_DATA,
    };
};
