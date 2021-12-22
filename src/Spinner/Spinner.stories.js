import React from 'react';
import Spinner from './Spinner';

export default {
    component: Spinner,
    title: 'Spinner',
    argTypes: { className: { control: { type: 'text' } } }
};

const Template = args => (
    <div>
        <Spinner {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = { variant: 'indeterminate' };
