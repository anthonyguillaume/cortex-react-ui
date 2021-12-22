import React from 'react';
import CSSTransition from './CSSTransition';
import FadeTransition from './Fade';

export default {
    component: CSSTransition,
    title: 'CSSTransition',
    argTypes: { trigger: { control: { type: 'boolean' } } }
};

const Template = args => (
    <FadeTransition {...args}>
        <div>coucou</div>
    </FadeTransition>
);

export const Fade = Template.bind({});
Fade.args = { trigger: false };
