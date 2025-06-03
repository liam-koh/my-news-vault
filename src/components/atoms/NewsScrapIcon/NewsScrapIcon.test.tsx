// NewsScrapIcon.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NewsScrapIcon from '.';

// 아이콘 활성화(핑크) 여부를 확인하는 헬퍼
const test_expectNewsScrapIconStatus = (status: boolean) => {
  const svg = screen.getByLabelText('테스트 스크랩 아이콘');
  const classAttr = svg.getAttribute('class');
  expect(svg).toBeInTheDocument();
  expect(svg.tagName.toLowerCase()).toBe('svg');

  if (status) {
    // status가 true면 핑크
    expect(classAttr).toContain('fill-pink-500');
    expect(classAttr).not.toContain('fill-gray-400');
  } else {
    // status가 false면 그레이
    expect(classAttr).toContain('fill-gray-400');
    expect(classAttr).not.toContain('fill-pink-500');
  }
};

describe('NewsScrapIcon 컴포넌트 (인라인 SVG 버전)', () => {
  const TEST_ALT = '테스트 스크랩 아이콘';

  describe('toggle 모드 미사용 시', () => {
    it('스크랩 안될 시 렌더링되지 않는다', () => {
      render(<NewsScrapIcon isScrapped={false} toggle={false} alt={TEST_ALT} />);
      expect(screen.queryByLabelText(TEST_ALT)).toBeNull();
    });

    it('스크랩 시 아이콘은 그레이 상태여야 한다', () => {
      render(<NewsScrapIcon isScrapped={true} toggle={false} alt={TEST_ALT} />);
      // toggle=false & isScrapped=true → fill-gray-400
      test_expectNewsScrapIconStatus(false);
    });
  });

  describe('toggle 모드 사용 시', () => {
    it('스크랩 안된 상태이면 아이콘은 그레이 상태여야 한다', () => {
      render(<NewsScrapIcon isScrapped={false} toggle={true} alt={TEST_ALT} />);
      // toggle=true & isScrapped=false → fill-gray-400
      test_expectNewsScrapIconStatus(false);
    });

    it('스크랩 시 아이콘은 핑크 상태여야 한다', () => {
      render(<NewsScrapIcon isScrapped={true} toggle={true} alt={TEST_ALT} />);
      // toggle=true & isScrapped=true → fill-pink-500
      test_expectNewsScrapIconStatus(true);
    });
  });

  it('className prop을 넘기면 해당 값이 <svg> 클래스명에 포함된다', () => {
    const customClass = 'my-custom-class another-class';
    render(
      <NewsScrapIcon isScrapped={true} toggle={true} alt={TEST_ALT} className={customClass} />,
    );
    const svg = screen.getByLabelText(TEST_ALT);
    expect(svg).toBeInTheDocument();
    const classAttr = svg.getAttribute('class');
    expect(classAttr).toContain('my-custom-class');
    expect(classAttr).toContain('another-class');
  });

  it('alt prop을 변경해서 전달하면 해당 aria-label로 조회할 수 있어야 한다', () => {
    const customAlt = '커스텀 ALT';
    render(<NewsScrapIcon isScrapped={true} toggle={true} alt={customAlt} />);
    expect(screen.getByLabelText(customAlt)).toBeInTheDocument();
    expect(screen.queryByLabelText(TEST_ALT)).toBeNull();
  });
});
