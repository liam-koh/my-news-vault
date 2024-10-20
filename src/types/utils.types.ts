/** 특정 배열 항목의 타입 출출 */
export type UArrayItem<T extends any[]> = T extends (infer U)[] ? U : never;
