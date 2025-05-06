/**
 * @typedef {Object} Credit
 * @property {number} id - 크레딧 ID
 * @property {number} amount - 크레딧 양
 * @property {string} expiredAt - 크레딧 만료 시간 (ISO 8601 문자열)
 *
 * @typedef {Object} VolunteerHistory
 * @property {number} id - 활동 ID
 * @property {string} startDateTime - 시작 시간 (ISO 8601 문자열)
 * @property {string} endDateTime - 종료 시간 (ISO 8601 문자열)
 * @property {number} minute - 활동 시간 (분 단위)
 * @property {Credit} credit - 크레딧 정보
 */
export const Types = {};
