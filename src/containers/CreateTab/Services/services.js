import React from 'react';
import axios from '../../../axios-orders';
import InputEditBox from '../../../components/InputEditBox/InputEditBox';
import InputButton from '../../../components/Buttons/InputButton/InputButton';

// Check for empty inputs in DOM
export const returnEmptyInputsQuantity = function(inputs) {
    const emptyInputs = [];

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            emptyInputs.push(input);
        }
    });

    return emptyInputs.length;
};

// highlight empty inputs
export const markEmptyInputs = function(inputs) {
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.boxShadow = '0 0 8px #ffcc00';
        } else {
            input.style.boxShadow = 'none';
        }
    });
};

// return inputGroups JSX array
export const returnInputGroupsJSX = function(
    allQuestionsOrder,
    formObject,
    onInputChangeHandler,
    addSubInputHandler,
    onInputDeleteHandler
) {
    if (allQuestionsOrder.length !== 0) {
        return allQuestionsOrder.map(questionId => {
            return (
                <InputEditBox
                    key={questionId}
                    id={questionId}
                    value={formObject[questionId].question}
                    type={formObject[questionId].inputType}
                    parentType={formObject[questionId].parentType}
                    condition={formObject[questionId].condition}
                    conditionValue={formObject[questionId].conditionValue}
                    level={formObject[questionId].level}
                    parent={formObject[questionId].parentId}
                    onInputChange={onInputChangeHandler}
                    onSubInputAddition={addSubInputHandler}
                    onInputDeletion={onInputDeleteHandler}
                />
            );
        });
    } else {
        return null;
    }
};

export const returnWelcomeMessage = loadSampleData => {
    return (
        <div className="CreateTab__welcome-wrapper">
            <div className="CreateTab__welcome-message">
                <h1>hello</h1>
                <InputButton className="InputButton__add-input" onButtonClick={loadSampleData}>
                    Load Sample Data
                </InputButton>
            </div>
        </div>
    );
};

export const getSampleDataFromFirebase = () => {
    let formObject, allQuestionsOrder, rootQuestionsOrder;
    axios
        .get('/data.json')
        .then(response => {
            formObject = response.data[Object.keys(response.data)[0]].formObject;
            allQuestionsOrder = response.data[Object.keys(response.data)[0]].allQuestionsOrder;
            rootQuestionsOrder = response.data[Object.keys(response.data)[0]].rootQuestionsOrder;
        })
        .catch(error => {
            console.log(error);
        });

    return [formObject, allQuestionsOrder, rootQuestionsOrder];
};
