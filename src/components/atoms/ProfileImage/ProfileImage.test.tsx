// ProfileImage.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProfileImage from '.';

describe('ProfileImage 컴포넌트', () => {
  const TEST_SRC = 'https://example.com/avatar.png';
  const TEST_ALT = '사용자 프로필';

  it('기본 이미지 렌더링 테스트', () => {
    render(<ProfileImage src={TEST_SRC} alt={TEST_ALT} />);
    const img = screen.getByRole('img', { name: TEST_ALT });
    expect(img).toBeInTheDocument();
  });

  it('size prop을 넘기면 img 태그에 style 속성으로 width/height가 반영된다', () => {
    render(
      <ProfileImage
        src={TEST_SRC}
        alt={TEST_ALT}
        size={48}
        style={{ width: '48px', height: '48px' }}
      />,
    );
    const img = screen.getByRole('img', { name: TEST_ALT });
    const style = img.getAttribute('style') || '';
    expect(style).toContain('width: 48px');
    expect(style).toContain('height: 48px');
  });

  it('추가적인 img HTML 속성(예: data-testid, loading)을 그대로 전달한다', () => {
    render(
      <ProfileImage src={TEST_SRC} alt={TEST_ALT} loading="lazy" data-testid="profile-img" />,
    );
    const imgByTestId = screen.getByTestId('profile-img');
    expect(imgByTestId).toHaveAttribute('loading', 'lazy');
    expect(imgByTestId).toHaveAttribute('src', TEST_SRC);
    expect(imgByTestId).toHaveAttribute('alt', TEST_ALT);
  });
});
