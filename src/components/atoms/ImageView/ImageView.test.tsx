// ImageView.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageView from '.';

describe('ImageView 컴포넌트', () => {
  const TEST_SRC = 'https://example.com/test.jpg';
  const TEST_ALT = '테스트 이미지';
  const TEST_CLASS = 'custom-class';

  it('렌더링 직후에는 로딩 오버레이가 보이고, 이미지는 로드되지 않았으므로 오버레이가 표시된다', () => {
    render(<ImageView src={TEST_SRC} alt={TEST_ALT} className={TEST_CLASS} />);

    // <img> 태그가 존재해야 하고…
    const img = screen.getByRole('img', { name: TEST_ALT });
    expect(img).toBeInTheDocument();

    // 로딩 오버레이(div.bg-gray-100.z-10)가 렌더링되어야 한다
    const loadingOverlay = screen.getByTestId('loading-overlay');
    expect(loadingOverlay).toBeInTheDocument();
    expect(loadingOverlay).toHaveClass('absolute top-0 left-0 w-full h-full bg-gray-100 z-10');

    // 에러 오버레이는 아직 없어야 한다
    expect(screen.queryByTestId('error-overlay')).toBeNull();
  });

  it('이미지 로드 성공 시 로딩 오버레이가 사라진다', () => {
    render(<ImageView src={TEST_SRC} alt={TEST_ALT} />);

    const img = screen.getByRole('img', { name: TEST_ALT });
    // 우선 로딩 오버레이가 보여야 함
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();

    // onLoad 이벤트를 트리거
    fireEvent.load(img);

    // 로딩 오버레이가 사라져야 한다
    expect(screen.queryByTestId('loading-overlay')).toBeNull();

    // 여전히 <img>는 DOM에 남아 있어야 한다
    expect(screen.getByRole('img', { name: TEST_ALT })).toBeInTheDocument();
    // 에러 오버레이는 보이지 않아야 한다
    expect(screen.queryByTestId('error-overlay')).toBeNull();
  });

  it('이미지 로드 실패 시 에러 오버레이가 렌더링된다', () => {
    render(<ImageView src={TEST_SRC} alt={TEST_ALT} className={TEST_CLASS} />);

    const img = screen.getByRole('img', { name: TEST_ALT });
    // 아직 로딩 오버레이 존재
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();

    // onError 이벤트를 트리거
    fireEvent.error(img);

    // 에러 오버레이(div.bg-gray-100.z-20)가 렌더링되어야 함
    const errorOverlay = screen.getByTestId('error-overlay');
    expect(errorOverlay).toBeInTheDocument();
    expect(errorOverlay).toHaveClass(
      'absolute bottom-0 left-0 w-full h-full bg-gray-100 z-20',
    );

    // 로딩 오버레이는 사라져도 된다 (onError 이후에도 isLoaded=false 상태라면 로딩 뷰는 기본적으로 제거되지만, 컴포넌트에서는 onError만 체크하므로 로딩 뷰가 남아 있다면 그 또한 OK)
    // 이 컴포넌트 구현 기준으로는 로딩앤 에러가 중첩될 수 있으므로, 로딩 오버레이는 확인하지 않음

    // <img>는 여전히 DOM에 남아 있어야 한다
    expect(screen.getByRole('img', { name: TEST_ALT })).toBeInTheDocument();
  });

  it('추가적인 HTML 속성(data-testid, loading 등)이 <img>에 그대로 전달된다', () => {
    render(
      <ImageView src={TEST_SRC} alt={TEST_ALT} loading="lazy" data-testid="imageview-test" />,
    );

    // data-testid를 통해 <img>를 직접 조회
    const imgByTestId = screen.getByTestId('imageview-test');
    expect(imgByTestId).toHaveAttribute('src', TEST_SRC);
    expect(imgByTestId).toHaveAttribute('alt', TEST_ALT);
    expect(imgByTestId).toHaveAttribute('loading', 'lazy');
  });
});
