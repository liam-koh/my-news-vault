// Input.test.tsx
import React, { useRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '.';
import userEvent from '@testing-library/user-event';

/** 
 * input 입력 검증 
 * input 리턴하여 추가 검증 가능
 * */
const test_getTypedInputElem = async (placeholder: string, value: string | number) => {
  const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement;
  await userEvent.type(input, value.toString());
  return input;
};

describe('Input 컴포넌트', () => {
  const TEST_PLACEHOLDER = '테스트 입력';
  const TEST_CLASS = 'custom-class';
  const TEST_VALUE = 'Hello';
  const TEST_ONCHANGE = vi.fn();

  it('기본 렌더링: placeholder와 type="text"가 적용된다', () => {
    render(<Input placeholder={TEST_PLACEHOLDER} />);
    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('type')).toBe('text');
    // 기본 클래스명 중 일부 확인
    expect(input.className).toContain('flex h-10 w-full');
    expect(input.className).toContain('rounded-md');
  });

  it('className prop을 넘기면 기존 클래스 뒤에 추가된다', () => {
    render(<Input placeholder={TEST_PLACEHOLDER} className={TEST_CLASS} />);
    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER);
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass(TEST_CLASS);
  });

  it('type prop을 "email"로 지정하면 type="email"이 반영된다', () => {
    render(<Input placeholder={TEST_PLACEHOLDER} type="email" />);
    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER);
    expect(input.getAttribute('type')).toBe('email');
  });

  it('value와 onChange 핸들러가 정상 동작한다', () => {
    render(
      <Input placeholder={TEST_PLACEHOLDER} value={TEST_VALUE} onChange={TEST_ONCHANGE} />,
    );
    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER) as HTMLInputElement;
    expect(input.value).toBe(TEST_VALUE);
    fireEvent.change(input, { target: { value: 'World' } });
    expect(TEST_ONCHANGE).toHaveBeenCalled();
  });

  it('disabled prop이 true이면 disabled 상태가 된다', () => {
    render(<Input placeholder={TEST_PLACEHOLDER} disabled />);
    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER) as HTMLInputElement;
    expect(input).toBeDisabled();
    // disabled 시 opacity-50 클래스가 포함돼 있는지 확인
    expect(input.className).toContain('disabled:opacity-50');
  });

  it('ref 전달이 올바르게 동작한다', () => {
    const RefTest = () => {
      const ref = useRef<HTMLInputElement>(null);
      return <Input placeholder={TEST_PLACEHOLDER} ref={ref} data-testid="ref-input" />;
    };
    render(<RefTest />);
    const input = screen.getByTestId('ref-input') as HTMLInputElement;
    // useRef를 통해 ref가 설정되면 focus()가 동작해야 함
    input.focus();
    expect(document.activeElement).toBe(input);
  });
});
