// NewsScrapIcon.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NewsScrapIcon from '.';

describe('NewsScrapIcon 컴포넌트 (인라인 SVG 버전)', () => {
  const TEST_ALT = '테스트 스크랩 아이콘';

  describe('toggle모드 미사용 시', () => {
    it('스크랩 안될 시 렌더링되지 않는다', () => {
      render(<NewsScrapIcon isScrapped={false} toggle={false} alt={TEST_ALT} />);
      // aria-label을 기준으로 조회했을 때 null이어야 함
      expect(screen.queryByLabelText(TEST_ALT)).toBeNull();
    });

    it('스크랩 시 아이콘 활성화', () => {
      render(<NewsScrapIcon isScrapped={true} toggle={false} alt={TEST_ALT} />);
      const svg = screen.getByLabelText(TEST_ALT);
      const className = svg.getAttribute('class');
      expect(svg).toBeInTheDocument();
      // 태그가 <svg>인지 확인
      expect(svg.tagName.toLowerCase()).toBe('svg');

      // isScrapped=true, toggle=false → 색상은 gray
      expect(className).toContain('fill-gray-400');
      expect(className).not.toContain('fill-pink-500');
    });
  });

  describe('toggle모드 사용 시', () => {
    it('스크랩 안된 상태이면 아이콘 비활성화', () => {
      render(<NewsScrapIcon isScrapped={false} toggle={true} alt={TEST_ALT} />);
      const svg = screen.getByLabelText(TEST_ALT);
      const className = svg.getAttribute('class');
      expect(svg).toBeInTheDocument();
      expect(svg.tagName.toLowerCase()).toBe('svg');

      // toggle=true지만 isScrapped=false이므로 색상은 gray
      expect(className).toContain('fill-gray-400');
      expect(className).not.toContain('fill-pink-500');
    });

    it('스크랩 시 아이콘 활성화', () => {
      render(<NewsScrapIcon isScrapped={true} toggle={true} alt={TEST_ALT} />);
      const svg = screen.getByLabelText(TEST_ALT);
      expect(svg).toBeInTheDocument();
      expect(svg.tagName.toLowerCase()).toBe('svg');

      // 둘 다 true이므로 색상은 pink
      const className = svg.getAttribute('class');
      expect(className).toContain('fill-pink-500');
      expect(className).not.toContain('fill-gray-400');
    });
  });
  it('className prop을 넘기면 해당 값이 <svg> 클래스명에 포함된다', () => {
    const customClass = 'my-custom-class another-class';
    render(
      <NewsScrapIcon isScrapped={true} toggle={true} alt={TEST_ALT} className={customClass} />,
    );
    const svg = screen.getByLabelText(TEST_ALT);
    expect(svg).toBeInTheDocument();
    const className = svg.getAttribute('class');
    expect(className).toContain('my-custom-class');
    expect(className).toContain('another-class');
  });

  it('alt prop을 변경해서 전달하면 해당 aria-label로 조회할 수 있어야 한다', () => {
    const customAlt = '커스텀 ALT';
    render(<NewsScrapIcon isScrapped={true} toggle={true} alt={customAlt} />);
    // customAlt로만 찾아져야 하며, TEST_ALT는 없어진다
    expect(screen.getByLabelText(customAlt)).toBeInTheDocument();
    expect(screen.queryByLabelText(TEST_ALT)).toBeNull();
  });
});
