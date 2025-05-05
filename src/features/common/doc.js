/**
 * @template T
 * @typedef {Object} PagingResponse
 * @property {number} totalElements - 전체 항목 수
 * @property {number} totalPages - 전체 페이지 수
 * @property {number} number - 현재 페이지 번호
 * @property {number} size - 페이지 크기 (한 페이지 당 항목 수)
 * @property {number} numberOfElements - 현재 페이지의 항목 수
 * @property {boolean} isFirst - 첫 페이지 여부
 * @property {boolean} isLast - 마지막 페이지 여부
 * @property {boolean} hasNext - 다음 페이지 존재 여부
 * @property {boolean} hasPrevious - 이전 페이지 존재 여부
 * @property {T[]} data - 데이터 배열
 */
