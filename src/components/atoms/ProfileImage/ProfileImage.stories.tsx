// ProfileImage.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import ProfileImage from '.';

export default {
  title: 'Atoms/ProfileImage',
  component: ProfileImage,
  argTypes: {
    src: {
      description: '이미지 URL',
      control: { type: 'text' },
      defaultValue: 'https://via.placeholder.com/150',
    },
    alt: {
      description: '이미지 대체 텍스트',
      control: { type: 'text' },
      defaultValue: '프로필 이미지',
    },
    size: {
      description: '이미지 가로/세로 크기(px 단위)',
      control: { type: 'number' },
      defaultValue: 48,
    },
    className: {
      description: '추가적으로 적용할 CSS 클래스',
      control: { type: 'text' },
      defaultValue: '',
    },
    loading: {
      description: '이미지 로딩 전략(lazy, eager 등)',
      control: { type: 'select', options: ['auto', 'lazy', 'eager'] },
      defaultValue: 'auto',
    },
    'data-testid': {
      description: '테스트용 data-testid 속성',
      control: { type: 'text' },
      defaultValue: '',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
프로필 등 용도로 쓰이는 소형 원형 이미지 컴포넌트입니다.

- **src**: 이미지 URL을 지정합니다.
- **alt**: 접근성 및 테스트용 이미지 대체 텍스트를 지정합니다.
- **size**: 가로/세로 크기를 px 단위로 지정하면 \`style\` 속성에 자동 반영됩니다.
- **className**: Tailwind 혹은 추가 CSS 클래스를 붙일 수 있습니다.
- **loading**: \`<img>\` 태그의 \`loading\` 속성을 지정할 수 있습니다.
- **data-testid**: 테스트 라이브러리용으로 \`data-testid\` 속성을 전달할 수 있습니다.
        `,
      },
    },
  },
} as Meta<typeof ProfileImage>;

type StoryProps = React.ComponentProps<typeof ProfileImage>;

const Template: Story<StoryProps> = (args) => {
  const sizeStyle = args.size ? { width: `${args.size}px`, height: `${args.size}px` } : {};
  return (
    <div style={{ padding: '2rem', background: '#f0f0f0', display: 'inline-block' }}>
      <ProfileImage {...args} style={sizeStyle} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  src: 'https://via.placeholder.com/150',
  alt: '프로필 이미지',
  size: 48,
  className: '',
  loading: 'auto',
  'data-testid': '',
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  src: 'https://via.placeholder.com/150',
  alt: '프로필 이미지',
  size: 64,
  className: 'border-2 border-blue-400 shadow-lg',
  loading: 'lazy',
  'data-testid': '',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  src: 'https://via.placeholder.com/150',
  alt: '작은 프로필',
  size: 32,
  className: '',
  loading: 'auto',
  'data-testid': '',
};

export const WithTestIdAndLazyLoading = Template.bind({});
WithTestIdAndLazyLoading.args = {
  src: 'https://via.placeholder.com/150',
  alt: '테스트 이미지',
  size: 80,
  className: '',
  loading: 'lazy',
  'data-testid': 'profile-image-test',
};
