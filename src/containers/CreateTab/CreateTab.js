import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';

import FlipMove from 'react-flip-move';
import {
    setEmptyInputs,
    addInput,
    addSubInput,
    deleteInput,
    dataChange,
    loadSampleDataAsync,
    populateTree,
    consoleTree,
    consoleState
} from '../../store/actions';

import { enterAnimation, leaveAnimation } from './AnimationsSettings/animationsSettings';

import {
    returnEmptyInputsQuantity,
    markEmptyInputs,
    returnInputGroupsJSX,
    returnWelcomeMessage
} from './services/services';

import InputButton from '../../components/Buttons/InputButton/InputButton';

import './CreateTab.css';

class CreateTab extends Component {
    componentDidMount() {
        setTimeout(this.areInputsFilled, 0);
    }

    addInputHandler = () => {
        this.props.onInputAddition(`question_${uuidV4().slice(0, 8)}`);
        setTimeout(this.areInputsFilled, 0);
    };

    addSubInputHandler = (parentId, parentLevel, parentType) => {
        this.props.onSubInputAddition(
            `question_${uuidV4().slice(0, 8)}`,
            parentId,
            parentLevel,
            parentType
        );
        setTimeout(this.areInputsFilled, 0);
    };

    onInputDeleteHandler = (childId, parentId) => {
        this.props.onInputDeletion(childId, parentId);
        setTimeout(this.areInputsFilled, 500); // wait with checking until inputEditBox is removed
    };

    onInputChangeHandler = (event, questionId, inputType) => {
        this.props.onDataChange(event, questionId, inputType);
        setTimeout(this.areInputsFilled, 0);
    };

    loadSampleData = () => {
        this.props.onSampleDataLoad();
        setTimeout(this.props.populateTreeOnSampleDataLoad, 500);
        setTimeout(this.areInputsFilled, 1000);
    };

    consoleTreeFromReducer = () => {
        this.props.onTreeConsoleLog();
    };

    consoleStateFromReducer = () => {
        this.props.onStateConsoleLog();
    };

    areInputsFilled = () => {
        const inputs = document.querySelectorAll('input'),
            emptyInputs = returnEmptyInputsQuantity(inputs);
        markEmptyInputs(inputs);
        this.props.onEmptyInputs(emptyInputs === 0 && inputs.length > 0, emptyInputs);
    };

    render() {
        let inputGroups = null;
        if (this.props.allQuestionsOrder) {
            inputGroups = returnInputGroupsJSX(
                this.props.allQuestionsOrder,
                this.props.formObject,
                this.onInputChangeHandler,
                this.addSubInputHandler,
                this.onInputDeleteHandler
            );
        }

        return (
            <div className="CreateTab">
                <div className="CreateTab__inputs-wrapper">
                    <FlipMove
                        duration={350}
                        easing="ease-out"
                        enterAnimation={enterAnimation}
                        leaveAnimation={leaveAnimation}
                    >
                        {inputGroups || returnWelcomeMessage(this.loadSampleData)}
                    </FlipMove>
                </div>
                <div className="CreateTab__button-wrapper">
                    <InputButton
                        className="InputButton__add-input"
                        onButtonClick={this.addInputHandler}
                    >
                        Add Input
                    </InputButton>
                    {/* to be removed */}
                    <InputButton
                        className="InputButton__add-input"
                        onButtonClick={this.consoleTreeFromReducer}
                    >
                        Console log tree
                    </InputButton>
                    <InputButton
                        className="InputButton__add-input"
                        onButtonClick={this.consoleStateFromReducer}
                    >
                        Console log state
                    </InputButton>
                    {/* ONLY FOR TESTING */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allQuestionsOrder: state.allQuestionsOrder,
        formObject: state.formObject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEmptyInputs: (inputsStateBoolean, numberOfEmptyInputs) =>
            dispatch(setEmptyInputs(inputsStateBoolean, numberOfEmptyInputs)),
        onInputAddition: questionId => dispatch(addInput(questionId)),
        onSubInputAddition: (questionId, parentId, parentLevel, parentType) =>
            dispatch(addSubInput(questionId, parentId, parentLevel, parentType)),
        onInputDeletion: (childId, parentId) => dispatch(deleteInput(childId, parentId)),
        onDataChange: (event, questionId, inputType) =>
            dispatch(dataChange(event, questionId, inputType)),
        onSampleDataLoad: (formObject, allQuestionsOrder, rootQuestionsOrder) =>
            dispatch(loadSampleDataAsync()),
        populateTreeOnSampleDataLoad: () => dispatch(populateTree()),
        onTreeConsoleLog: () => dispatch(consoleTree()),
        onStateConsoleLog: () => dispatch(consoleState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);
