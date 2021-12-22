import React from 'react';
import DatePicker from './DatePicker';

export default {
    component: DatePicker,
    title: 'DatePicker',
    argTypes: { className: { control: { type: 'text' } } }
};

const Template = args => (
    <div>
        <button type="button">Open DatePicker</button>
        <DatePicker {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {};
