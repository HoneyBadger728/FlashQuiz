import { createSlice } from '@reduxjs/toolkit';
import { addQuiz } from '../quizzes/quizzesSlice';

const initialState = {
  topics: {}
};

const topicsSlice = createSlice({
    name: 'topics',
    initialState,   
    reducers: {
        addTopic: (state, action) => {
            const { id, name, icon } = action.payload;
            state.topics[id] = { id, name, icon, quizIds: [] };
        },
        addQuizToTopic: (state, action) => {
            const { topicId, quizId } = action.payload;
            if (state.topics[topicId]) {
                state.topics[topicId].quizIds.push(quizId);
            }
        }
    },
    extraReducers: {
        [addQuiz]: (state, action) => {
            const { id, topicId } = action.payload;
            if (state.topics[topicId]) {
                state.topics[topicId].quizIds.push(id);
            }
        }
    }
});


export const selectTopics = (state) => state.topics.topics;

export default topicsSlice.reducer;
export const { addTopic, addQuizToTopic } = topicsSlice.actions;