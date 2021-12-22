import React from 'react';
import Popper, { PopoverPlacement } from './Popper';

export default {
    component: Popper,
    title: 'Popper',
    argTypes: {
        className: { control: { type: 'text' } },
        open: { control: { type: 'boolean' } },
        placement: {
            options: Object.values(PopoverPlacement),
            control: { type: 'select' }
        }
    }
};

const Template = args => (
    <div style={{ margin: '50px 50px 0 0' }}>
        <button id="btn-popper-1" type="button">Popper</button>
        <Popper {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    open: true,
    placement: PopoverPlacement.RightCenter,
    anchorEl: 'btn-popper-1',
    children: (<span>Coucou</span>)
};
