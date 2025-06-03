import ScrapIcon from '@/assets/news-scrap-icon.svg';
import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  isScrapped: boolean;
  toggle?: boolean;
  className?: string;
  alt?: string;
}

/**
 * 뉴스 스크랩상태 아이콘
 * @param isScrapped - 스크랩 상태 여부, false일경우 아무것도 보이지 않음
 * @param toggle - toggle 상태 여부, true일 경우 아이콘 항상 보인 채 색상만 변화
 * @param alt - 아이콘 alt 속성
 * @param className - custom className
 */
export default function NewsScrapIcon({ isScrapped, toggle, alt, className }: IProps) {
  if (!isScrapped && !toggle) return null;

  return (
    <ScrapIcon
      aria-label={alt}
      className={cn(
        'w-[2rem] h-[2rem]',
        toggle && isScrapped ? 'fill-pink-500' : 'fill-gray-400',
        className,
      )}
    />
  );
}
