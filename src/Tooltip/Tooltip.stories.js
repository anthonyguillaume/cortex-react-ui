import React from 'react';
import Tooltip from './Tooltip';

export default {
    component: Tooltip,
    title: 'Tooltip',
    argTypes: { className: { control: { type: 'text' } } }
};

const Template = args => (
    <div>
        <div style={{ margin: '50px 50px 0 0' }}>
            <Tooltip {...args}>
                <button id="btn-tooltip-1" type="button">Show tooltip</button>
            </Tooltip>
        </div>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    anchorEl: 'btn-tooltip-1',
    title: 'coucou'
};
