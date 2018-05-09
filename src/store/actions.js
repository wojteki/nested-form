import axios from '../axios-orders';

export const SET_EMPTY_INPUTS_INFO = 'SET_EMPTY_INPUTS_INFO';
export const ADD_INPUT_HANDLER = 'ADD_INPUT_HANDLER';
export const ADD_SUB_INPUT_HANDLER = 'ADD_SUB_INPUT_HANDLER';
export const DELETE_INPUT = 'DELETE_INPUT';
export const DATA_CHANGE = 'DATA_CHANGE';
export const LOAD_SAMPLE_DATA = 'LOAD_SAMPLE_DATA';
export const UPDATE_TREE = 'UPDATE_TREE';

export const setEmptyInputs = (inputsStateBoolean, numberOfEmptyInputs) => {
    return {
        type: SET_EMPTY_INPUTS_INFO,
        areInputsFilled: inputsStateBoolean,
        emptyInputs: numberOfEmptyInputs
    };
};

export const addInput = questionId => {
    return {
        type: ADD_INPUT_HANDLER,
        questionId: questionId
    };
};

export const addSubInput = (questionId, parentId, parentLevel, parentType) => {
    return {
        type: ADD_SUB_INPUT_HANDLER,
        questionId: questionId,
        parentId: parentId,
        parentLevel: parentLevel,
        parentType: parentType
    };
};

export const deleteInput = (childId, parentId) => {
    return {
        type: DELETE_INPUT,
        childId: childId,
        parentId: parentId
    };
};

export const dataChange = (event, questionId, inputType) => {
    return {
        type: DATA_CHANGE,
        event: event,
        questionId: questionId,
        inputType: inputType
    };
};

export const loadSampleData = (formObject, allQuestionsOrder, rootQuestionsOrder) => {
    return {
        type: LOAD_SAMPLE_DATA,
        formObject: formObject,
        allQuestionsOrder: allQuestionsOrder,
        rootQuestionsOrder: rootQuestionsOrder
    };
};

export const loadSampleDataAsync = () => {
    return dispatch => {
        let formObject, allQuestionsOrder, rootQuestionsOrder;
        axios
            .get('/data.json')
            .then(response => {
                formObject = response.data[Object.keys(response.data)[0]].formObject;
                allQuestionsOrder = response.data[Object.keys(response.data)[0]].allQuestionsOrder;
                rootQuestionsOrder =
                    response.data[Object.keys(response.data)[0]].rootQuestionsOrder;
                console.log(formObject);
                console.log(allQuestionsOrder);
                console.log(rootQuestionsOrder);
                dispatch(loadSampleData(formObject, allQuestionsOrder, rootQuestionsOrder));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const populateTree = () => {
    return {
        type: UPDATE_TREE
    };
};
