// NewsScrapIcon.stories.tsx
import React from 'react';
import { Meta, Story } from '@storybook/react';
import NewsScrapIcon from '.';

export default {
  title: 'Atoms/NewsScrapIcon',
  component: NewsScrapIcon,
  argTypes: {
    isScrapped: {
      description: '스크랩 상태 여부. `true`면 아이콘이 보인다.',
      control: { type: 'boolean' },
      defaultValue: true,
    },
    toggle: {
      description: '토글 모드 여부. `true`면 아이콘이 항상 보이고 색상만 변경된다.',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    alt: {
      description: '인라인 SVG에 부여할 aria-label. 화면 리더 및 테스트용 텍스트.',
      control: { type: 'text' },
      defaultValue: '뉴스 스크랩 아이콘',
    },
    className: {
      description: '추가로 적용할 CSS 클래스.',
      control: { type: 'text' },
      defaultValue: '',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
뉴스 스크랩 상태 아이콘 컴포넌트입니다.

- **isScrapped**: 스크랩 상태 여부. \`false\`인 경우 \`toggle\`이 \`false\`라면 아무것도 렌더링하지 않습니다.
- **toggle**: 토글 모드 여부. \`true\`이면 아이콘이 항상 보이며, \`isScrapped\`값에 따라 색상(\`fill-pink-500\` 또는 \`fill-gray-400\`)만 변경됩니다.
- **alt**: SVG에 \`aria-label\`로 전달되는 문자열입니다. (접근성 및 테스트 용도)
- **className**: 추가로 적용할 Tailwind 또는 사용자 정의 CSS 클래스입니다.
        `,
      },
    },
  },
} as Meta<typeof NewsScrapIcon>;

/**
 * 기본 상태: isScrapped=false, toggle=false → 렌더링되지 않음(빈 화면)
 */
const Template: Story<React.ComponentProps<typeof NewsScrapIcon>> = (args) => (
  <div style={{ padding: '2rem', background: '#f9f9f9' }}>
    <NewsScrapIcon {...args} />
  </div>
);

export const Hidden = Template.bind({});
Hidden.args = {
  isScrapped: false,
  toggle: false,
  alt: '뉴스 스크랩 아이콘',
};

/**
 * 스크랩 상태만 활성화(isScrapped=true, toggle=false) → 그레이 아이콘
 */
export const ScrappedGray = Template.bind({});
ScrappedGray.args = {
  isScrapped: true,
  toggle: false,
  alt: '뉴스 스크랩 아이콘',
};

/**
 * 토글 모드만 활성화(isScrapped=false, toggle=true) → 그레이 아이콘
 */
export const ToggleGray = Template.bind({});
ToggleGray.args = {
  isScrapped: false,
  toggle: true,
  alt: '뉴스 스크랩 아이콘',
};

/**
 * 스크랩 & 토글 둘 다 활성화(isScrapped=true, toggle=true) → 핑크 아이콘
 */
export const ScrappedPink = Template.bind({});
ScrappedPink.args = {
  isScrapped: true,
  toggle: true,
  alt: '뉴스 스크랩 아이콘',
};

/**
 * 추가 className 적용 예시(예: 그림자와 테두리 추가)
 */
export const CustomClass = Template.bind({});
CustomClass.args = {
  isScrapped: true,
  toggle: true,
  alt: '뉴스 스크랩 아이콘',
  className: 'shadow-lg border border-gray-200',
};
