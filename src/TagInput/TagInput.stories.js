import React from 'react';
import TagInput from './TagInput';

export default {
    component: TagInput,
    title: 'TagInput',
    argTypes: {
        className: { control: { type: 'text' } },
        onChange: { action: 'onChange' }
    }
};

const Template = args => {
    const [tags, setTags] = React.useState(args.tags);

    return (
        <div>
            <TagInput
                {...args}
                onChange={newTags => setTags(newTags)}
                tags={tags}
            />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    tags: [
        {
            id: '1',
            label: 'toto'
        },
        {
            id: '2',
            label: 'titi'
        }
    ],
    suggestions: [
        {
            id: 'toto',
            label: 'toto'
        },
        {
            id: 'titi',
            label: 'titi',
            group: true,
            suggestions: [
                {
                    id: 'titi1',
                    label: 'titi 1'
                },
                {
                    id: 'titi2',
                    label: 'titi 2'
                }
            ]
        },
        {
            id: 'tata',
            label: 'tata'
        }
    ]
};
