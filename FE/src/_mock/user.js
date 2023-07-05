import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(10)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: sample(['Ms Hoa', 'Mr Thuận', 'Mr Hoàng', 'Ms Lính', 'Mark Le']),
  company: sample([
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
    '01/01/1999',
  ]),
  isVerified: sample([
    '0984798360',
    '0984798361',
    '0984798362',
    '0984798363',
    '0984798364',
    '0984798365',
    '0984798366',
  ]),
  status: sample(['active']),
  role: sample(['Nam', 'Nữ']),
  diaChi: sample(['Hà Nội', 'Đà Nẵng', 'TPHCM']),
  khoaHoc: sample(['TOEIC-350', 'TOEIC-450', 'TOEIC-450', 'TOEIC-550']),
}));

export default users;
