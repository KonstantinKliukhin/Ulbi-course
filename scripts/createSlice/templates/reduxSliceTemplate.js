const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => {
    const typeName = `${firstCharUpperCase(sliceName)}Schema`;

    return `import type { PayloadAction } from '@reduxjs/toolkit';
import { ${typeName} } from '../constants/${sliceName}Schema';
import { buildSlice } from '@/shared/libs';
const initialState: ${typeName} = {
    
};

export const ${sliceName}Slice = buildSlice({
    name: '${sliceName}',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { ${sliceName}Actions, ${sliceName}Reducer, use${sliceName}Actions } = ${sliceName}Slice;
`;
};
