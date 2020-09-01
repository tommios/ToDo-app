import {
    TODOS_CREATE,
    TODOS_GET_ALL,
    TODOS_GET_ONE,
    TODOS_UPDATE,
    TODOS_FILTER,
    TODOS_DELETE_ONE,
    TODOS_DELETE_ALL,
} from "./types";

export const todoCreate = (data) => ({
    type: TODOS_CREATE,
    request: {
        method: "POST",
        url: "/todos",
        data,
    },
});

// export const _todoGetAll = (query = {}) => ({
//   type: TODOS_GET_ALL,
//   request: {
//     method: "GET",
//     url: `/todos?${qString.stringify(query, {arrayFormat: 'bracket'})}`,
//   },
// });

export const todoGetAll = (params = {}) => {
    // const queryString =
    /**
     * 1) получить все ключи объекта (Object.keys)
     * 2) отфильтровать этот массив что бы ключиу ключей было значение
     * 3) преобразовать полученный массив в строку
     */
    return {
        type: TODOS_GET_ALL,
        request: {
            method: "GET",
            url: `/todos`,
            params,
        },
    };
};

export const todoGetOne = (id) => ({
    type: TODOS_GET_ONE,
    request: {
        method: "GET",
        url: `/todos/${id}`,
    },
});

export const todoUpdate = (id, data) => ({
    type: TODOS_UPDATE,
    request: {
        method: "PATCH",
        url: `/todos/${id}`,
        data: {...data},
    },
});

// export const todoFilter = (flag) => ({
//   type: TODOS_FILTER,
//   request: {
//     method: "GET",
//     url: `/todos/filter?completed=${flag}`,
//   },
// });

export const todoDeleteOne = (id) => ({
    type: TODOS_DELETE_ONE,
    request: {
        method: "DELETE",
        url: `/todos/${id}`,
    },
    id: id
});

export const todoDeleteAll = () => ({
    type: TODOS_DELETE_ALL,
    request: {
        method: "DELETE",
        url: "/todos",
    },
});
